'use client';
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import { fetchNotes, FetchNotesResponse } from "@/lib/api";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import EmptyState from "@/components/EmptyState/EmptyState";
import css from "./Notes.client.module.css";

const perPage = 12;
const VALID_TAGS = ["Todo", "Work", "Personal", "Meeting", "Shopping"];

interface NotesClientProps {
  initialTag: string; // Отримуємо тег як проп
}

export default function NotesClient({ initialTag }: NotesClientProps) {
  // 1. Використовуємо тег виключно з пропсів, а не з usePathname
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 500);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Визначаємо, чи є тег валідним для запиту до API
  const activeTag = VALID_TAGS.includes(initialTag) ? initialTag : "";

  // 2. Запит до API з використанням отриманого тега
  const { data, isLoading, isError, isFetching } = useQuery<FetchNotesResponse>({
    queryKey: ["notes", initialTag, page, debouncedSearch], // initialTag у ключі
    queryFn: () => fetchNotes({ 
      tag: activeTag, 
      page, 
      perPage, 
      search: debouncedSearch 
    }),
    placeholderData: (previousData) => previousData,
    staleTime: 1000 * 60, 
  });

  const handlePageChange = (newPage: number) => {
    if (!data) return;
    if (newPage >= 1 && newPage <= data.totalPages) setPage(newPage);
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <input
          className={css.searchInput}
          placeholder="Search notes..."
          type="text"
          value={search}
          onChange={(e) => { 
            setSearch(e.target.value); 
            setPage(1); 
          }}
        />
        {data && data.totalPages > 1 && (
          <Pagination page={page} totalPages={data.totalPages} onPageChange={handlePageChange} />
        )}
        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </header>

      {isLoading && <p>Loading...</p>}

      {!isLoading && !isError && data && data.notes.length > 0 && (
        <>
          <NoteList notes={data.notes} />
          {isFetching && <div className={css.fetchingLoader}>Updating...</div>}
        </>
      )}

      {!isLoading && !isError && data && data.notes.length === 0 && (
        <EmptyState message={debouncedSearch ? "No notes match your search" : "No notes in this category"} />
      )}

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onCancel={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
}