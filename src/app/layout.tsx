import React from 'react';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-full flex flex-col bg-zinc-950 text-zinc-100 dark">
      {children}
    </div>
  );
}
