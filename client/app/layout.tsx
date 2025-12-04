"use client";

import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { ClerkProvider } from "@clerk/nextjs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { trpc } from '@/utils/trpc';
import { httpBatchLink } from "@trpc/client";
import "./globals.css";
import { useState } from "react";
import SocketProvider from "@/providers/SocketProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() => (
    trpc.createClient({
      links: [
        httpBatchLink({
          url: "http://localhost:4000/trpc"
        }),
      ],
    })
  ));
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <ClerkProvider>
        <QueryClientProvider client={queryClient}>
          <html lang="en">
            <body
              className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-hidden`}
            >
              <SocketProvider>
                {children}
              </SocketProvider>
              <Toaster />
            </body>
          </html>
        </QueryClientProvider>
      </ClerkProvider>
    </trpc.Provider>
  );
}
