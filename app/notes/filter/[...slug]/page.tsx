import { use } from "react";
import NotesClient from "./Notes.client";

export default function Page({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = use(params);
  // Визначаємо початкову сторінку з query-параметрів або slug, якщо потрібно
  const currentPage = 1; 

  return <NotesClient currentPage={currentPage} />;
}