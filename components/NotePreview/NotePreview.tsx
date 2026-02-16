'use client';
import { useRouter } from 'next/navigation';
import Modal from '@/components/Modal/Modal';
import css from './NotePreview.module.css';
import { Note } from '@/types/note';

interface NotePreviewProps {
  note: Note;
}

export default function NotePreview({ note }: NotePreviewProps) {
  const router = useRouter();
  const handleClose = () => router.back();

  return (
    <Modal onClose={handleClose}>
      <div className={css.container}>
        <div className={css.item}>
          <div className={css.header}>
            <h2>{note.title}</h2>
            <button className={css.backBtn} onClick={handleClose}>
              Close
            </button>
          </div>
          <div className={css.content}>{note.content}</div>
          <div className={css.date}>{new Date(note.createdAt).toLocaleDateString()}</div>
          <div className={css.tag}>{note.tag}</div>
        </div>
      </div>
    </Modal>
  );
}