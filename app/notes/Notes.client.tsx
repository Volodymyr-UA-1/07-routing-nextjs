
'use client';
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import { usePathname } from "next/navigation";
import { fetchNotes, FetchNotesResponse } from "@/lib/api";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import EmptyState from "@/components/EmptyState/EmptyState";
import css from "./Notes.module.css";

const perPage = 12;
const VALID_TAGS = ["Todo", "Work", "Personal", "Meeting", "Shopping"];

export default function NotesClient({ currentPage: initialPage }: { currentPage: number }) {
  const pathname = usePathname();
  
  // 1. Стейти, яких не вистачало
  const [page, setPage] = useState(initialPage);
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 500);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 2. Логіка витягування тегу, щоб уникнути ID нотатки в запиті
  const segments = pathname.split('/');
  const filterIndex = segments.indexOf('filter');
  const tagFromUrl = filterIndex !== -1 ? segments[filterIndex + 1] : undefined;
  const tag = VALID_TAGS.includes(tagFromUrl || "") ? tagFromUrl : undefined;

  // 3. Запит до API
  const { data, isLoading, isError, isFetching } = useQuery<FetchNotesResponse>({
    queryKey: ["notes", tag, page, debouncedSearch],
    queryFn: () => fetchNotes({ tag, page, perPage, search: debouncedSearch }),
    placeholderData: (previousData) => previousData, // Запобігає зникненню фону
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
            setPage(1); // Скидаємо на 1 сторінку при пошуку
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

      {/* Показуємо порожній стан тільки якщо реально немає нотаток і запит успішний */}
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