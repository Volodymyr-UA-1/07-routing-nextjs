import { use } from "react";
import NotePreviewClient from "./NotePreview.client";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params); // Next.js 15 потребує розпаковки params

  return <NotePreviewClient id={id} />;
}