import type { ReactNode } from "react";
import css from './LayoutNotes.module.css';

export default function NotesLayout({ 
  children, 
  sidebar,
  modal 
}: { 
  children: ReactNode; 
  sidebar: ReactNode;
  modal: ReactNode;
}) {
  return (
    <>
      <div className={css.container}>
        <aside className={css.sidebar}>
          {sidebar}
        </aside>
        <main className={css.notesWrapper}>
          {children}
        </main>
      </div>
      {modal} 
    </>
  );
}