import { Link } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuContent,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Home, Users, MapPin, Calendar, AlertCircle, ChevronDown, UserCircle, LogOut } from "lucide-react";

export function Navbar() {
  const { user, logoutMutation } = useAuth();

  return (
    <nav className="border-b bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/">
              <a className="flex items-center">
                <span className="text-2xl font-bold text-primary">
                  Magatane Vidhansabha
                </span>
              </a>
            </Link>

            {user && (
              <NavigationMenu className="ml-10">
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <Link href="/">
                      <NavigationMenuLink className="flex items-center px-3 py-2 text-sm font-medium">
                        <Home className="w-4 h-4 mr-2" />
                        Dashboard
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuTrigger>
                      <MapPin className="w-4 h-4 mr-2" />
                      Wards
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                        <li className="row-span-3">
                          <Link href="/wards">
                            <a className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-primary/50 to-primary p-6 no-underline outline-none focus:shadow-md">
                              <div className="mt-4 mb-2 text-lg font-medium text-white">
                                Ward Management
                              </div>
                              <p className="text-sm leading-tight text-white/90">
                                View and manage all wards, their issues, and activities
                              </p>
                            </a>
                          </Link>
                        </li>
                        <li>
                          <Link href="/wards/issues">
                            <a className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                              <div className="text-sm font-medium leading-none">Ward Issues</div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                Track and manage ward-specific issues
                              </p>
                            </a>
                          </Link>
                        </li>
                        <li>
                          <Link href="/wards/events">
                            <a className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                              <div className="text-sm font-medium leading-none">Ward Events</div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                View upcoming events in each ward
                              </p>
                            </a>
                          </Link>
                        </li>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <Link href="/events">
                      <NavigationMenuLink className="flex items-center px-3 py-2 text-sm font-medium">
                        <Calendar className="w-4 h-4 mr-2" />
                        Events
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <Link href="/issues">
                      <NavigationMenuLink className="flex items-center px-3 py-2 text-sm font-medium">
                        <AlertCircle className="w-4 h-4 mr-2" />
                        Issues
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>

                  {user.role === "admin" && (
                    <NavigationMenuItem>
                      <Link href="/admin">
                        <NavigationMenuLink className="flex items-center px-3 py-2 text-sm font-medium">
                          <Users className="w-4 h-4 mr-2" />
                          Admin
                        </NavigationMenuLink>
                      </Link>
                    </NavigationMenuItem>
                  )}
                </NavigationMenuList>
              </NavigationMenu>
            )}
          </div>

          <div className="flex items-center">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2">
                    <UserCircle className="w-5 h-5" />
                    <span>{user.fullName}</span>
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link href="/profile">Profile Settings</Link>
                  </DropdownMenuItem>
                  {user.wardId && (
                    <DropdownMenuItem>
                      <Link href={`/wards/${user.wardId}`}>My Ward</Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem
                    className="text-red-600"
                    onClick={() => logoutMutation.mutate()}
                    disabled={logoutMutation.isPending}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/auth">
                <Button>Login</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}