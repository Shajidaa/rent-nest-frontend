import Link from "next/link"
import { Button } from "@/components/ui/button"

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet"
import { Home, Menu, ShieldCheck } from "lucide-react"

export default function AuthNavbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-8">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md transition-transform group-hover:scale-105">
            <Home className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-foreground">
              Nest<span className="text-primary">Rent</span>
            </span>
            <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold -mt-1">
              Properties
            </span>
          </div>
        </Link>

     

        {/* Desktop Auth Actions */}
        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost" asChild>
            <Link href="/login">Log in</Link>
          </Button>
          <Button asChild>
            <Link href="/register">Sign up</Link>
          </Button>
        </div>

        {/* Mobile Menu (Sheet Component) */}
        <div className="flex md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" aria-label="Open Menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="flex flex-col justify-between">
              <div className="flex flex-col gap-6 pt-6">
                {/* Mobile Logo */}
                  <Link href="/" className="flex items-center gap-2 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md transition-transform group-hover:scale-105">
            <Home className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-foreground">
              Nest<span className="text-primary">Rent</span>
            </span>
            <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold -mt-1">
              Properties
            </span>
          </div>
        </Link>
               
              </div>

              {/* Mobile Auth Actions */}
              <div className="flex flex-col gap-2 pb-6">
                <SheetClose asChild>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/login">Sign in</Link>
                  </Button>
                </SheetClose>
                <SheetClose asChild>
                  <Button className="w-full" asChild>
                    <Link href="/register">Sign up</Link>
                  </Button>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>

      </div>
    </header>
  )
}