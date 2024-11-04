import type { Metadata } from 'next';
import './globals.css';
import { redHatDisplay } from './fonts/fonts';
import React from 'react';
import ReactQueryProvider from '@/app/utils/providers/react-query-provider';
import { SnackbarProvider } from '@/app/utils/providers/snackbar-provider';

export const metadata: Metadata = {
  title: 'Todo App',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${redHatDisplay.variable} antialiased`}>
        <SnackbarProvider>
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </SnackbarProvider>
      </body>
    </html>
  );
}
