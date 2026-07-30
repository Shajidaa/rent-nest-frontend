

import Link from "next/link"
import { 
  Menu, 
 
  Search, 
  Heart, 
  
  KeyRound, 
  PlusCircle, 
  Building2, 
  Home
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger, 
  SheetClose 
} from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { IUser } from "@/lib/type"


export default   function Navbar({...user}:IUser) {

  

  const navLinks = [
    { name: "Explore", href: "/explore", icon: Search },
    { name: "Properties", href: "/properties", icon: Building2 },
    { name: "Saved", href: "/saved", icon: Heart },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
        
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

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((link) => {
            const Icon = link.icon
            return (
              <Link
                key={link.name}
                href={link.href}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary hover:bg-muted/50 rounded-lg"
              >
                <Icon className="h-4 w-4" />
                <span>{link.name}</span>
              </Link>
            )
          })}
        </nav>

        {/* Desktop Right Actions */}
        <div className="hidden md:flex items-center gap-3">
          {/* List Property CTA */}
          <Button variant="outline" size="sm" asChild className="gap-2 border-primary/20 hover:bg-primary/5">
            <Link href="/list-property">
              <PlusCircle className="h-4 w-4 text-primary" />
              <span>List Property</span>
            </Link>
          </Button>

          {/* Conditional Auth State */}
          {user?.data ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10 border">
                    <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                    <AvatarFallback>NR</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user?.data?.profile?.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">alex@example.com</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard">Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/bookings">My Bookings</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/settings">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  className="text-red-600 focus:text-red-600 cursor-pointer"
              
                >
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/login">Sign In</Link>
              </Button>
              <Button size="sm" asChild className="shadow-sm">
                <Link href="/register">Get Started</Link>
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Menu Trigger (Sheet) */}
        <div className="flex md:hidden items-center gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
  
            className="text-xs h-8 px-2 border border-dashed"
          >
            {user ? "Switch Out" : "Switch In"}
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="h-10 w-10">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-75 sm:w-87.5 flex flex-col justify-between">
              <div className="flex flex-col gap-6 py-4">
                
                {/* Mobile Header Logo */}
                <Link href="/" className="flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    <KeyRound className="h-4 w-4" />
                  </div>
                  <span className="text-lg font-bold">
                    Nest<span className="text-primary">Rent</span>
                  </span>
                </Link>

                {/* Mobile User Profile snippet if logged in */}
                {user && (
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 border">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>NR</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col overflow-hidden">
                      <span className="text-sm font-medium truncate">{user?.data?.profile?.name}</span>
                      <span className="text-xs text-muted-foreground truncate">{user?.data?.profile?.email}</span>
                    </div>
                  </div>
                )}

                {/* Mobile Nav Links */}
                <nav className="flex flex-col gap-1">
                  {navLinks.map((link) => {
                    const Icon = link.icon
                    return (
                      <SheetClose asChild key={link.name}>
                        <Link
                          href={link.href}
                          className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg hover:bg-muted transition-colors"
                        >
                          <Icon className="h-4 w-4 text-primary" />
                          <span>{link.name}</span>
                        </Link>
                      </SheetClose>
                    )
                  })}
                  
                  <SheetClose asChild>
                    <Link
                      href="/list-property"
                      className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg hover:bg-muted transition-colors text-primary"
                    >
                      <PlusCircle className="h-4 w-4" />
                      <span>List Your Property</span>
                    </Link>
                  </SheetClose>
                </nav>
              </div>

              {/* Mobile Footer Auth Actions */}
              <div className="flex flex-col gap-2 pt-4 border-t">
                {user ? (
                  <>
                    <SheetClose asChild>
                      <Button variant="outline" asChild className="w-full justify-start">
                        <Link href="/dashboard">Dashboard</Link>
                      </Button>
                    </SheetClose>
                    <Button 
                      variant="destructive" 
                      className="w-full justify-start"
                
                    >
                      Log out
                    </Button>
                  </>
                ) : (
                  <div className="grid grid-cols-2 gap-2">
                    <SheetClose asChild>
                      <Button variant="outline" asChild className="w-full">
                        <Link href="/login">Sign In</Link>
                      </Button>
                    </SheetClose>
                    <SheetClose asChild>
                      <Button asChild className="w-full">
                        <Link href="/register">Sign Up</Link>
                      </Button>
                    </SheetClose>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>

      </div>
    </header>
  )
}