"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarSeparator,
  SidebarGroup,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import {
  ScanText,
  FileScan,
  DatabaseZap,
  History,
  Trash2,
  Sparkles,
  Info,
  Mail,
  ShieldCheck,
  FileText,
  CheckCircle,
  Minimize2,
} from "lucide-react";
import { Logo } from "./logo";
import { useHistory } from "@/hooks/use-history";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";

const menuItems = [
  {
    href: "/",
    label: "Text vs. Text",
    icon: ScanText,
  },
  {
    href: "/contextual-analysis",
    label: "AI Contextual Analysis",
    icon: DatabaseZap,
  },
  {
    href: "/file-check",
    label: "File vs. Text",
    icon: FileScan,
  },
  {
    href: "/advanced-check",
    label: "Advanced Check",
    icon: Sparkles,
  },
  {
    href: "/grammar-check",
    label: "Grammar Check",
    icon: CheckCircle,
  },
  {
    href: "/text-summarizer",
    label: "Text Summarizer",
    icon: Minimize2,
  },
];

const infoMenuItems = [
    { href: '/about', label: 'About Us', icon: Info },
    { href: '/contact', label: 'Contact Us', icon: Mail },
    { href: '/privacy', label: 'Privacy Policy', icon: ShieldCheck },
    { href: '/terms', label: 'Terms & Conditions', icon: FileText },
]

export function AppSidebar() {
  const pathname = usePathname();
  const { history, clearHistory } = useHistory();

  return (
    <Sidebar collapsible="icon" variant="sidebar">
      <SidebarHeader>
        <Logo />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Tools</SidebarGroupLabel>
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <Link href={item.href} className="w-full">
                  <SidebarMenuButton
                    isActive={pathname === item.href}
                    tooltip={item.label}
                  >
                    <item.icon />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
        <SidebarSeparator />
         <SidebarGroup className="flex-1 min-h-0">
          <SidebarGroupLabel className="flex items-center justify-between">
            <div className="flex items-center gap-2">
                <History className="size-4"/>
                <span>History</span>
            </div>
            {history.length > 0 && 
              <Button variant="ghost" size="icon" className="size-7" onClick={clearHistory}>
                <Trash2 className="size-4" />
              </Button>
            }
          </SidebarGroupLabel>
            <ScrollArea className="h-full">
                 <SidebarMenu>
                    {history.length > 0 ? (
                        history.map((item) => (
                        <SidebarMenuItem key={item.id}>
                            <SidebarMenuButton variant="outline" size="sm" className="h-auto flex-col items-start py-2 group-data-[collapsible=icon]:hidden">
                                <span className="font-semibold">{item.title}</span>
                                <span className="text-xs text-muted-foreground">{item.date}</span>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        ))
                    ) : (
                        <div className="px-2 text-sm text-muted-foreground group-data-[collapsible=icon]:hidden">
                            No history yet.
                        </div>
                    )}
                 </SidebarMenu>
            </ScrollArea>
        </SidebarGroup>

      </SidebarContent>
      <SidebarFooter>
        
      </SidebarFooter>
    </Sidebar>
  );
}
