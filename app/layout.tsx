import type { Metadata } from "next";
import "./globals.css";
import ThemeToggle from "@/components/theme-toggle";

export const metadata: Metadata = {
  title: "Lead Workspace | CRM & Outreach",
  description: "Your business, your pipeline. A configurable lead management and outreach workspace.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{__html:"try{document.documentElement.dataset.theme=localStorage.getItem('lead-theme')==='light'?'light':'dark'}catch{}"}}/></head>
      <body className="antialiased">{children}<ThemeToggle/></body>
    </html>
  );
}
