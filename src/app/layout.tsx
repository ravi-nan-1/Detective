import type { Metadata } from "next";
import "./globals.css";
import { Inter, Space_Grotesk } from "next/font/google";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppHeader } from "@/components/app-header";
import { AppSidebar } from "@/components/app-sidebar";
import { AppFooter } from "@/components/app-footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "AI Plagiarism Checker | Free & Accurate | ALL2ools.com",
  description:
    "Check for plagiarism with our free AI-powered tool. Get instant, accurate results for text, documents, and websites. Perfect for students, writers, and educators.",
  keywords: [
    "plagiarism checker",
    "ai plagiarism checker",
    "free plagiarism checker",
    "similarity checker",
    "check for plagiarism",
    "originality checker",
    "content originality",
    "academic integrity",
    "writing tool",
    "seo content tool",
    "plagiarism detector",
    "duplicate content checker",
    "copy content checker"
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
                  <AppFooter />
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
