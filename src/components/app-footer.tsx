import Link from "next/link";
import { Logo } from "./logo";

const footerLinks = [
  {
    title: "Tools",
    links: [
      { href: "/", label: "Text vs. Text" },
      { href: "/contextual-analysis", label: "AI Contextual Analysis" },
      { href: "/file-check", label: "File vs. Text" },
      { href: "/advanced-check", label: "Advanced Check" },
      { href: "/grammar-check", label: "Grammar Check" },
      { href: "/text-summarizer", label: "Text Summarizer" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About Us" },
      { href: "/contact", label: "Contact Us" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms & Conditions" },
    ],
  },
];

export function AppFooter() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="md:col-span-1">
            <Logo />
            <p className="mt-4 text-sm text-muted-foreground">
              Advanced AI-powered plagiarism detection.
            </p>
          </div>
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-foreground">{section.title}</h3>
              <ul className="mt-4 space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} ALL2ools.com. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
