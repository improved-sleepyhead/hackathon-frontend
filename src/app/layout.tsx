import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";

import "./global.css";
import { TanstackQueryProvider } from "@/providers/query-provider";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Projetto",
  description: "The project tracking app",
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "/icon-light.svg",
        href: "/icon-light.svg",
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/icon-dark.svg",
        href: "/icon-dark.svg",
      },
    ]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressContentEditableWarning>
      <body
        className={cn(inter.className, "antialiased min-h-screen")}
      >
        <TanstackQueryProvider>
            <Toaster position="bottom-center"/>
            {children}
        </TanstackQueryProvider>
      </body>
    </html>
  );
}
