import { redirect } from 'next/navigation';

export default function NotesRedirect({ searchParams }: { searchParams?: { page?: string, search?: string } }) {
  const page = searchParams?.page ?? '1';
  const search = searchParams?.search ?? '';
  redirect(`/notes/filter/all?page=${page}&search=${search}`);
}