import React from "react"
import {Home, LineChart, Package, Package2, Settings, ShoppingCart, Users2, Store} from "lucide-react"
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip"
import {NavLink, useMatch} from "react-router-dom"

function SideBar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <a
          href="#"
          className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
        >
          <Package2 className="h-4 w-4 transition-all group-hover:scale-110"/>
          <span className="sr-only">Customs Inc</span>
        </a>
        <TooltipProvider>
          <Tooltip delayDuration={250}>
            <TooltipTrigger asChild>
              <NavLink
                to="/"
                className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8 ${
                    useMatch("/") ? "bg-accent text-accent-foreground" : "text-muted-foreground"
                  }`
                }
              >
                <Home className="h-5 w-5"/>
                <span className="sr-only">Dashboard</span>
              </NavLink>
            </TooltipTrigger>
            <TooltipContent side="right">Dashboard</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip delayDuration={250}>
            <TooltipTrigger asChild>
              <NavLink
                to="/orders"
                className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8 ${
                    useMatch("/orders/*") ? "bg-accent text-accent-foreground" : "text-muted-foreground"
                  }`
                }
              >
                <ShoppingCart className="h-5 w-5"/>
                <span className="sr-only">Orders</span>
              </NavLink>
            </TooltipTrigger>
            <TooltipContent side="right">Orders</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip delayDuration={250}>
            <TooltipTrigger asChild>
              <NavLink
                to="/products"
                className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8 ${
                    useMatch("/products/*") ? "bg-accent text-accent-foreground" : "text-muted-foreground"
                  }`
                }
              >
                <Package className="h-5 w-5"/>
                <span className="sr-only">Products</span>
              </NavLink>
            </TooltipTrigger>
            <TooltipContent side="right">Products</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip delayDuration={250}>
            <TooltipTrigger asChild>
              <NavLink
                to="/brand"
                className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8 ${
                    useMatch("/brand") ? "bg-accent text-accent-foreground" : "text-muted-foreground"
                  }`
                }
              >
                <Store className="h-5 w-5"/>
                <span className="sr-only">My Brand</span>
              </NavLink>
            </TooltipTrigger>
            <TooltipContent side="right">My Brand</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip delayDuration={250}>
            <TooltipTrigger asChild>
              <NavLink
                to="/analytics"
                className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8 ${
                    useMatch("/analytics") ? "bg-accent text-accent-foreground" : "text-muted-foreground"
                  }`
                }
              >
                <LineChart className="h-5 w-5"/>
                <span className="sr-only">Analytics</span>
              </NavLink>
            </TooltipTrigger>
            <TooltipContent side="right">Analytics</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        <TooltipProvider>
          <Tooltip delayDuration={250}>
            <TooltipTrigger asChild>
              <NavLink
                to="/settings"
                className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8 ${
                    useMatch("/settings/*") ? "bg-accent text-accent-foreground" : "text-muted-foreground"
                  }`
                }
              >
                <Settings className="h-5 w-5"/>
                <span className="sr-only">Settings</span>
              </NavLink>
            </TooltipTrigger>
            <TooltipContent side="right">Settings</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav>
    </aside>
  )
}

export default SideBar