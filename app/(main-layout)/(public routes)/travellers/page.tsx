import { fetchAuthors } from '@/lib/api/serverApi';
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';
import TravellersClient from './travellers.client';
import css from '@/components/TravellersList/TravellersList.module.css';

export default async function TravellersPage() {
  const perPage = 12;
  const page = 1;
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey: ['users', perPage],
    queryFn: () => fetchAuthors(page, perPage),
    initialPageParam: 1,
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <h1 className={css.title}>Мандрівники</h1>
      <TravellersClient />
    </HydrationBoundary>
  );
}
