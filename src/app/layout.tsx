
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
import { RelatedTools } from "@/components/related-tools";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "AI Plagiarism Checker | Free & Accurate | ALL2ools.com",
  description:
    "Check plagiarism instantly with our advanced AI plagiarism checker. Detect copied, paraphrased, and AI-generated content with sentence-by-sentence analysis and rewrite suggestions.",
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
    "copy content checker",
    "plagiarism checker online",
    "free plagiarism detector",
    "plagiarism remover tool",
    "rewrite plagiarized content",
    "grammar and plagiarism checker",
    "academic plagiarism tool",
    "ai content originality analysis"
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "ALL2ools.com",
    "url": "https://all2ools.com",
    "logo": "https://all2ools.com/logo.png",
    "description": "AI-powered plagiarism checker with sentence-level analysis, rewrite suggestions, and originality scoring.",
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "support@all2ools.com",
      "contactType": "customer support"
    }
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
      </head>
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
                  <RelatedTools />
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
