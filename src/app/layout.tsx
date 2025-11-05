import type { Metadata } from "next";
import "./globals.css";
import { Inter, Space_Grotesk } from "next/font/google";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppHeader } from "@/components/app-header";
import { AppSidebar } from "@/components/app-sidebar";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "Free Plagiarism Checker - Plagiarism Detective",
  description:
    "Ensure originality with our free plagiarism checker. Compare text, check documents, and get detailed similarity reports. Ideal for students, writers, and educators.",
  keywords: [
    "plagiarism checker",
    "similarity checker",
    "free plagiarism tool",
    "text similarity",
    "online plagiarism check",
    "duplicate content finder",
    "check for plagiarism",
    "originality checker",
    "content originality",
    "academic integrity",
    "writing tool",
    "SEO content tool"
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-body antialiased",
          inter.variable,
          spaceGrotesk.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider>
            <div className="flex min-h-screen w-full flex-col">
              <AppHeader />
              <div className="flex flex-1">
                <AppSidebar />
                <main className="flex w-full flex-1 flex-col overflow-y-auto">
                  {children}
                </main>
              </div>
            </div>
          </SidebarProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
