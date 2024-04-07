import type { Metadata } from "next";
import { Inter } from "next/font/google";

import AuthProvider from "@/lib/auth/Provider";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Parkour Techs",
  description: "Laboris ipsum magna ad mollit duis. Laboris ullamco aliquip anim do id ea qui. Aliqua ipsum eu nulla adipisicing laborum.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <AuthProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>{children}</ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
