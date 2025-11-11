import { notFound } from "next/navigation";
import TravellerInfo from "@/components/TravellerInfo/TravellerInfo";
import MessageNoStories from "@/components/MessageNoStories/MessageNoStories";

// 👇 React Query SSR hydration
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { QueryClient } from "@tanstack/react-query";

// 👇 Клієнтський адаптивний список (перша сторінка буде догружена за його perPage)
import TravellersStoriesResponsive from "@/components/TravellersStories/TravellersStoriesResponsive";

// --- тип пропсів сторінки
export type TravellerPageProps = { params: { travellerId: string } };

// --- SSR-фетч першої порції (user + articles для page=1)
async function fetchTravellerFirstPage(travellerId: string) {
  // Ходи через свій проксі-роут, щоб не світити бекенд напряму
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL ?? ""}/api/users/${travellerId}?page=1&perPage=6`,
    { next: { revalidate: 60 } }
  );

  if (res.status === 404) notFound();
  if (!res.ok) throw new Error(`Failed to load traveller: ${res.status}`);

  const json = await res.json();
  const user = json?.data?.user ?? null;
  const firstPage = {
    page: json.page,
    perPage: json.perPage,
    hasNextPage: json.hasNextPage,
    data: json?.data?.articles ?? [],
  };

  return { user, firstPage };
}

// --- опціонально: базова мета без додаткового фетчу (можеш розширити під себе)
export const metadata = {
  title: "Профіль мандрівника | Подорожники",
  description: "Публічний профіль мандрівника та його історії подорожей.",
};

export default async function TravellerPage({ params }: TravellerPageProps) {
  const { travellerId } = params;

  // 1) SSR: тягнемо першу порцію даних
  const { user, firstPage } = await fetchTravellerFirstPage(travellerId);
  const hasStories = (firstPage.data?.length ?? 0) > 0;

  // 2) Підготовка кэша React Query для infiniteQuery
  //    ВАЖЛИВО: тут ми сідуємо під perPage=6 (desktop).
  //    Якщо у клієнта perPage=4 (tablet/mobile), у нього буде інший queryKey → піде свій fetch.
  const qc = new QueryClient();
  if (hasStories) {
    qc.setQueryData(["traveller-stories", travellerId, 6], {
      pages: [firstPage],
      pageParams: [1],
    });
  }
  const dehydrated = dehydrate(qc);

  return (
    <main>
      <section aria-label="traveller info">
        {/* Якщо інший дев робить TravellerInfo і йому достатньо id — лиши так. */}
        <TravellerInfo travellerId={travellerId} />
      </section>

      <section aria-label="traveller stories">
        <h2>Історії Мандрівника</h2>

        {hasStories ? (
          <HydrationBoundary state={dehydrated}>
            {/* Клієнтський компонент сам визначить perPage (4 / 6) і зробить infiniteQuery */}
            <TravellersStoriesResponsive travellerId={travellerId} />
          </HydrationBoundary>
        ) : (
          <MessageNoStories />
        )}
      </section>
    </main>
  );
}