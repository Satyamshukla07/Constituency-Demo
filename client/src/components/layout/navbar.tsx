import { Link } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export function Navbar() {
  const { user, logoutMutation } = useAuth();

  return (
    <nav className="border-b bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
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
                    <Link href="/events">
                      <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                        Events
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link href="/issues">
                      <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                        Issues
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                  {user.role === "admin" && (
                    <NavigationMenuItem>
                      <Link href="/admin">
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
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
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-700">
                  Welcome, {user.fullName}
                </span>
                <Button
                  variant="outline"
                  onClick={() => logoutMutation.mutate()}
                  disabled={logoutMutation.isPending}
                >
                  Logout
                </Button>
              </div>
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
