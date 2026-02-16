import NotesClient from "@/app/notes/Notes.client";
import css from "./NotesPage.module.css";

type Props = {
  params: Promise<{ tag: string[] }>;
  searchParams: Promise<{ page?: string }>;
};

export default async function NotesPage({ params, searchParams }: Props) {
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;

  return (
    <div className={css.app}>
      <NotesClient currentPage={currentPage} />
    </div>
  );
}