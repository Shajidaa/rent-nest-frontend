"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  Menu,
  Search,
  KeyRound,
  PlusCircle,
  Building2,
  Home,
  User,
  LogOut,
  LayoutDashboard,
  Settings,
  X,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
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
import { Badge } from "@/components/ui/badge"
import { IUser } from "@/lib/type"
import { logout } from "@/service/logout"
import { toast } from "sonner"
import MyContainer from "./MyContainer"
import { cn } from "@/lib/utils"

const navLinks = [
  { name: "Explore", href: "/explore", icon: Search },
  { name: "Properties", href: "/properties", icon: Building2 },
]

const userMenuItems = [
  { label: "Dashboard", icon: LayoutDashboard, action: "dashboard" },
  { label: "Profile", icon: User, action: "profile" },
  { label: "Settings", icon: Settings, action: "settings" },
]

const roleDashboardMap: Record<string, string> = {
  TENANT: "/tenant-dashboard",
  LANDLORD: "/landlord-dashboard",
  ADMIN: "/admin-dashboard",
}

export default function Navbar({ ...user }: IUser) {
  const router = useRouter()
  const pathname = usePathname()

  const getInitials = (name?: string) =>
    name
      ? name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
      : "NR"

  const handleUserMenuAction = async (action: string) => {
    if (action === "dashboard") {
      const role = user?.data?.profile?.role
      const path = roleDashboardMap[role] ?? "/"
      router.push(path)
      return
    }
    if (action === "logout") {
      await logout()
      toast.success("Logged out successfully")
      router.push("/")
    }
  }

  const profilePhoto = user?.data?.profile?.profile?.profilePhoto
  const userName = user?.data?.profile?.name
  const userEmail = user?.data?.profile?.email
  const userRole = user?.data?.profile?.role

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <MyContainer>
        <div className="flex h-16 items-center justify-between gap-4">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm transition-transform group-hover:scale-105">
              <Home className="h-4.5 w-4.5" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-lg font-bold tracking-tight">
                Nest<span className="text-primary">Rent</span>
              </span>
              <span className="text-[9px] text-muted-foreground uppercase tracking-widest font-medium">
                Properties
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(({ name, href, icon: Icon }) => (
              <Link
                key={name}
                href={href}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                  pathname === href
                    ? "text-primary bg-primary/8"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                )}
              >
                <Icon className="h-4 w-4" />
                {name}
              </Link>
            ))}
          </nav>

          {/* Desktop Right */}
          <div className="hidden md:flex items-center gap-2 shrink-0">
            <Button
              variant="outline"
              size="sm"
              asChild
              className="gap-1.5 border-primary/30 text-primary hover:bg-primary/5 hover:text-primary"
            >
              <Link href="/list-property">
                <PlusCircle className="h-4 w-4" />
                List Property
              </Link>
            </Button>

            {user?.data ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 rounded-full ring-2 ring-transparent hover:ring-primary/30 transition-all outline-none">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={profilePhoto} alt={userName} />
                      <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                        {getInitials(userName)}
                      </AvatarFallback>
                    </Avatar>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col gap-0.5">
                      <p className="text-sm font-semibold">{userName}</p>
                      <p className="text-xs text-muted-foreground">{userEmail}</p>
                      {userRole && (
                        <Badge variant="secondary" className="mt-1 w-fit text-[10px] px-1.5 py-0">
                          {userRole}
                        </Badge>
                      )}
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {userMenuItems.map(({ label, icon: Icon, action }) => (
                    <DropdownMenuItem
                      key={action}
                      className="cursor-pointer"
                      onClick={() => handleUserMenuAction(action)}
                    >
                      <Icon className="h-4 w-4 mr-2 text-muted-foreground" />
                      {label}
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="cursor-pointer text-destructive focus:text-destructive"
                    onClick={() => handleUserMenuAction("logout")}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/login">Sign in</Link>
                </Button>
                <Button size="sm" asChild>
                  <Link href="/register">Get Started</Link>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu */}
          <div className="flex md:hidden items-center gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="h-9 w-9">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[340px] flex flex-col p-0">

                {/* Sheet Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b">
                  <Link href="/" className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                      <KeyRound className="h-4 w-4" />
                    </div>
                    <span className="font-bold text-base">
                      Nest<span className="text-primary">Rent</span>
                    </span>
                  </Link>
                  <SheetClose asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                      <X className="h-4 w-4" />
                    </Button>
                  </SheetClose>
                </div>

                <div className="flex flex-col flex-1 overflow-y-auto px-4 py-4 gap-5">

                  {/* User Profile Card */}
                  {user?.data && (
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 border">
                      <Avatar className="h-10 w-10 shrink-0">
                        <AvatarImage src={profilePhoto} alt={userName} />
                        <AvatarFallback className="bg-primary/10 text-primary text-sm font-semibold">
                          {getInitials(userName)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col min-w-0">
                        <span className="text-sm font-semibold truncate">{userName}</span>
                        <span className="text-xs text-muted-foreground truncate">{userEmail}</span>
                        {userRole && (
                          <Badge variant="secondary" className="mt-1 w-fit text-[10px] px-1.5 py-0">
                            {userRole}
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Nav Links */}
                  <nav className="flex flex-col gap-1">
                    <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider px-2 mb-1">
                      Navigation
                    </p>
                    {navLinks.map(({ name, href, icon: Icon }) => (
                      <SheetClose asChild key={name}>
                        <Link
                          href={href}
                          className={cn(
                            "flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors",
                            pathname === href
                              ? "text-primary bg-primary/8"
                              : "hover:bg-muted"
                          )}
                        >
                          <Icon className="h-4 w-4 text-primary shrink-0" />
                          {name}
                        </Link>
                      </SheetClose>
                    ))}
                    <SheetClose asChild>
                      <Link
                        href="/list-property"
                        className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg hover:bg-muted transition-colors"
                      >
                        <PlusCircle className="h-4 w-4 text-primary shrink-0" />
                        List Your Property
                      </Link>
                    </SheetClose>
                  </nav>

                  {/* Authenticated menu items */}
                  {user?.data && (
                    <nav className="flex flex-col gap-1">
                      <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider px-2 mb-1">
                        Account
                      </p>
                      {userMenuItems.map(({ label, icon: Icon, action }) => (
                        <SheetClose asChild key={action}>
                          <button
                            onClick={() => handleUserMenuAction(action)}
                            className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg hover:bg-muted transition-colors w-full text-left"
                          >
                            <Icon className="h-4 w-4 text-muted-foreground shrink-0" />
                            {label}
                          </button>
                        </SheetClose>
                      ))}
                    </nav>
                  )}
                </div>

                {/* Sheet Footer */}
                <div className="px-4 py-4 border-t">
                  {user?.data ? (
                    <SheetClose asChild>
                      <Button
                        variant="destructive"
                        className="w-full gap-2"
                        onClick={() => handleUserMenuAction("logout")}
                      >
                        <LogOut className="h-4 w-4" />
                        Log out
                      </Button>
                    </SheetClose>
                  ) : (
                    <div className="grid grid-cols-2 gap-2">
                      <SheetClose asChild>
                        <Button variant="outline" asChild className="w-full">
                          <Link href="/login">Sign in</Link>
                        </Button>
                      </SheetClose>
                      <SheetClose asChild>
                        <Button asChild className="w-full">
                          <Link href="/register">Get Started</Link>
                        </Button>
                      </SheetClose>
                    </div>
                  )}
                </div>

              </SheetContent>
            </Sheet>
          </div>

        </div>
      </MyContainer>
    </header>
  )
}
