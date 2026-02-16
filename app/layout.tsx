import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import "./globals.css"; // Переконайся, що стилі підключені

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NoteHub",
  description: "Manage your notes efficiently",
};

export default function RootLayout({
  children,
  modal // Слот для паралельного маршруту
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {/* Обгортаємо ВСЕ в провайдер, щоб уникнути помилки No QueryClient set */}
        <TanStackProvider>
            {children}
            {modal}
        </TanStackProvider>
      </body>
    </html>
  );
}