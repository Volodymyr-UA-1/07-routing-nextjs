import type { ReactNode } from "react";
import css from './LayoutNotes.module.css';

export default function NotesLayout({ 
  children, 
  sidebar 
}: { 
  children: ReactNode; 
  sidebar: ReactNode; 
}) {
  return (
    <div className={css.container}>
      <aside className={css.sidebar}>
        {sidebar} {/* Тут ваш @sidebar з тегами */}
      </aside>
      <main className={css.notesWrapper}>
        {children} {/* Тут буде все інше: форма, пошук, нотатки */}
      </main>
    </div>
  );
}