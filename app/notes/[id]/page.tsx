import { QueryClient, dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import NoteDetailsClient from './NoteDetails.client';

type NotePageProps = {
  params: { id: string }; // params приходить як об’єкт, не Promise
};

export default async function NotePage({ params }: NotePageProps) {
  const { id } = params; // отримуємо id

  const queryClient = new QueryClient();

  // Префетчимо нотатку за ID на сервері
  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <NoteDetailsClient id={id} />
    </HydrationBoundary>
  );
}