
import { fetchNotes } from "@/lib/api";
import type { Note } from "@/types/note";
import NoteList from "@/components/NoteList/NoteList"; 
import css from "./NotesPage.module.css"; 

type Props = {
  params: Promise<{ tag: string[] }>;
};

export default async function NotesPage({ params }: Props) {
  // 1. Розпаковуємо params (вимога Next.js 15)
  const { tag: tagArray } = await params; 
  const tagParam = tagArray?.[0];
  
  // 2. Логіка для "all" згідно з ТЗ (якщо all, запит іде без тегу)
  const tag = tagParam === "all" ? undefined : tagParam;

  // 3. Завантаження даних
  const data = await fetchNotes({ tag });
  const notes: Note[] = data.notes;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        {/* Використовуємо класи з NotesPage.module.css */}
        <h1>{tag ? `${tag} notes` : "All notes"}</h1>
      </header>
      
      <main>
        {notes.length > 0 ? (
          <NoteList notes={notes} />
        ) : (
          <p>No notes found for this category.</p>
        )}
      </main>
    </div>
  );
}