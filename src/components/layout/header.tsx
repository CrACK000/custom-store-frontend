import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet"
import {Button} from "@/components/ui/button"
import {
  Home,
  LineChart,
  Package,
  Package2,
  PanelLeft, Settings,
  ShoppingCart,
  Store,
} from "lucide-react"
import React from "react"
import {NavLink, useMatch} from "react-router-dom";
import BreadcrumbPanel from "@/components/layout/breadcrumb";
import SearchBox from "@/components/layout/search-box";
import UserAvatar from "@/components/layout/user-avatar";
import ThemeButton from "@/components/layout/theme-button";

function Header(){

  return (
    <header
      className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="sm:hidden">
            <PanelLeft className="h-5 w-5"/>
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="sm:max-w-xs">
          <nav className="grid gap-6 text-lg font-medium">
            <a
              href="#"
              className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
            >
              <Package2 className="h-5 w-5 transition-all group-hover:scale-110"/>
              <span className="sr-only">Acme Inc</span>
            </a>
            <NavLink
              to="/"
              className={`flex items-center gap-4 px-2.5 ${
                  useMatch("/") ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                }
              `}
            >
              <Home className="h-5 w-5"/>
              Dashboard
            </NavLink>
            <NavLink
              to="/orders"
              className={`flex items-center gap-4 px-2.5 ${
                  useMatch("/orders/*") ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                }
              `}
            >
              <ShoppingCart className="h-5 w-5"/>
              Orders
            </NavLink>
            <NavLink
              to="/products"
              className={`flex items-center gap-4 px-2.5 ${
                  useMatch("/products/*") ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                }
              `}
            >
              <Package className="h-5 w-5"/>
              Products
            </NavLink>
            <NavLink
              to="/brand"
              className={`flex items-center gap-4 px-2.5 ${
                  useMatch("/brand") ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                }
              `}
            >
              <Store className="h-5 w-5"/>
              My Brand
            </NavLink>
            <NavLink
              to="/analytics"
              className={`flex items-center gap-4 px-2.5 ${
                  useMatch("/analytics/*") ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                }
              `}
            >
              <LineChart className="h-5 w-5"/>
              Analytics
            </NavLink>
            <NavLink
              to="/settings"
              className={`flex items-center gap-4 px-2.5 ${
                  useMatch("/settings/*") ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                }
              `}
            >
              <Settings className="h-5 w-5"/>
              Settings
            </NavLink>
          </nav>
        </SheetContent>
      </Sheet>
      <BreadcrumbPanel/>
      <SearchBox/>
      <UserAvatar/>
      <ThemeButton/>
    </header>
  )
}

export default Header