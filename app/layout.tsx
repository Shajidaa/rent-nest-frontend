import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});



export const metadata: Metadata = {
  title: "RENT NEST ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased","font-sans", inter.variable ) }>
      <body  suppressHydrationWarning={true}>
        <Toaster richColors position="top-right" />
      <TooltipProvider>   {children}</TooltipProvider>
        </body>
    </html>
  );
}
