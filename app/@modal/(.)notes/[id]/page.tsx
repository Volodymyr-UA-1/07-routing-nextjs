'use client';

import { use, useEffect, useState } from 'react';
import NotePreview from '@/components/NotePreview/NotePreview';
import { fetchNoteById } from '@/lib/api';
import { Note } from '@/types/note';

export default function NotePreviewModalPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  // Розгортаємо Promise для отримання id
  const { id } = use(params); 
  const [note, setNote] = useState<Note | null>(null);

  useEffect(() => {
    if (id) {
      fetchNoteById(id)
        .then(setNote)
        .catch(err => console.error("Failed to fetch note:", err));
    }
  }, [id]);

  if (!note) return null;

  return <NotePreview note={note} />;
}