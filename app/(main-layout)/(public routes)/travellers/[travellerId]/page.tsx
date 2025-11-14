import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import {
  HydrationBoundary,
  dehydrate,
  QueryClient,
} from '@tanstack/react-query';

import TravellerInfo from '@/components/TravellerInfo/TravellerInfo';
import MessageNoStories from '@/components/MessageNoStories/MessageNoStories';
import TravellerStoriesWrapper from '@/components/TravellersStories/TravellerStoriesWrapper';

import type { IUser, GetUserByIdResponse } from '@/types/user';
import type { PaginatedStoriesResponse } from '@/types/story';

type PageProps = { params: Promise<{ travellerId: string }> };

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';

async function fetchTravellerFirstPage(
  travellerId: string
): Promise<{ user: IUser | null; storiesPage: PaginatedStoriesResponse }> {
  const res = await fetch(
    `${APP_URL}/api/users/${travellerId}?page=1&perPage=6`,
    { next: { revalidate: 60 } }
  );

  if (res.status === 404) notFound();
  if (!res.ok) throw new Error(`Failed to load traveller: ${res.status}`);

  const json: GetUserByIdResponse = await res.json();

  const user: IUser | null = json.data.user;

  const storiesPage: PaginatedStoriesResponse = {
    page: json.page,
    perPage: json.perPage,
    totalPages: json.totalPages,
    totalItems: json.totalItems,
    hasNextPage: json.hasNextPage,
    hasPreviousPage: json.hasPreviousPage,
    data: json.data.articles,
  };

  return { user, storiesPage };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { travellerId } = await params;
  const { user } = await fetchTravellerFirstPage(travellerId);

  const name = user?.name ?? 'Traveller';
  const desc =
    user?.description ??
    'Публічний профіль мандрівника та його історії подорожей.';
  const url = `/travellers/${encodeURIComponent(travellerId)}`;
  const image =
    user?.avatarUrl ||
    'https://res.cloudinary.com/dqujodhbn/image/upload/v1763048903/podorozhnyky_logo_meta_f5harm.jpg';

  return {
    title: `${name} | Подорожники`,
    description: desc,
    openGraph: {
      title: `${name} | Подорожники`,
      description: desc,
      url,
      type: 'profile',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: `${name} profile`,
        },
      ],
    },
  };
}

export default async function TravellerPage({ params }: PageProps) {
  const { travellerId } = (await params) ?? {
    travellerId: '6881563901add19ee16fcffa',
  };

  const { user, storiesPage } = await fetchTravellerFirstPage(travellerId);
  const hasStories = storiesPage.data.length > 0;

  const qc = new QueryClient();

  if (hasStories) {
    qc.setQueryData(['traveller-stories', travellerId, storiesPage.perPage], {
      pages: [storiesPage],
      pageParams: [1],
    });
  }

  const state = dehydrate(qc);

  return (
    <main>
      <section aria-label="traveller info">
        <div data-wrapper>
          <TravellerInfo
            travellerId={travellerId}
            traveller={user ?? undefined}
          />
        </div>
      </section>

      <section aria-label="traveller stories">
        <div data-wrapper>
          <h2>Історії Мандрівника</h2>

          {hasStories ? (
            <HydrationBoundary state={state}>
              <TravellerStoriesWrapper
                travellerId={travellerId}
                initialStories={storiesPage}
                traveller={user ?? undefined} 
              />
            </HydrationBoundary>
          ) : (
            <MessageNoStories 
              text="Цей користувач ще не публікував історій"
              buttonText="Назад до історій"
              route="/stories"
            />
          )}
        </div>
      </section>
    </main>
  );
}
