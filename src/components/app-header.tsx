import { SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeToggle } from "./theme-toggle";
import { Logo } from "./logo";
import Link from "next/link";
import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";

const navLinks = [
  { href: "/", label: "Text vs. Text" },
  { href: "/contextual-analysis", label: "AI Contextual Analysis" },
  { href: "/file-check", label: "File vs. Text" },
  { href: "/advanced-check", label: "Advanced Check" },
  { href: "/grammar-check", label: "Grammar Check" },
  { href: "/text-summarizer", label: "Text Summarizer" },
];

export function AppHeader() {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="md:hidden"/>
        <Logo />
      </div>

      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6 ml-6">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="ml-auto flex items-center gap-2">
        <Button asChild variant="outline">
          <a href="https://www.all2ools.com/" target="_blank" rel="noopener noreferrer">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to ALL2ools
          </a>
        </Button>
        <ThemeToggle />
      </div>
    </header>
  );
}
