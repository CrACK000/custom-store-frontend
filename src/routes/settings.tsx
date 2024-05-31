import {CreditCard, Headset, Lock, Settings as SettingsIcon, Settings2, SquareSplitHorizontal} from "lucide-react";
import {Separator} from "@/components/ui/separator";
import {NavLink, Outlet, useMatch} from "react-router-dom";

function Settings() {
  return (
    <main
      className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
      <div className="grid w-full">
        <h3 className="scroll-m-20 text-2xl font-bold tracking-tight">
          Settings
        </h3>
        <p className="text-muted-foreground font-normal">Manage your account settings and set e-mail preferences.</p>
        <Separator className="mt-6" />
      </div>
      <div
        className="grid w-full items-start gap-8 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr] mx-auto max-w-7xl">
        <nav className="grid gap-1.5 text-sm text-muted-foreground">
          <NavLink to="/settings/general"
                   className={`font-semibold py-2.5 px-3.5 rounded-md transition hover:text-primary duration-100 ${useMatch("/settings/general") ? "bg-secondary shadow-sm text-primary" : ""}`}>
            <div className="flex items-center gap-x-2">
              <SettingsIcon className="w-4 h-4" />
              General
            </div>
          </NavLink>
          <NavLink to="/settings/billing"
                   className={`font-semibold py-2.5 px-3.5 rounded-md transition hover:text-primary duration-100 ${useMatch("/settings/billing") ? "bg-secondary shadow-sm text-primary" : ""}`}>
            <div className="flex items-center gap-x-2">
              <CreditCard className="w-4 h-4" />
              Billing
            </div>
          </NavLink>
          <NavLink to="/settings/security"
                   className={`font-semibold py-2.5 px-3.5 rounded-md transition hover:text-primary duration-100 ${useMatch("/settings/security") ? "bg-secondary shadow-sm text-primary" : ""}`}>
            <div className="flex items-center gap-x-2">
              <Lock className="w-4 h-4" />
              Security
            </div>
          </NavLink>
          <NavLink to="/settings/support"
                   className={`font-semibold py-2.5 px-3.5 rounded-md transition hover:text-primary duration-100 ${useMatch("/settings/support") ? "bg-secondary shadow-sm text-primary" : ""}`}>
            <div className="flex items-center gap-x-2">
              <Headset className="w-4 h-4" />
              Support
            </div>
          </NavLink>
        </nav>

        <Outlet/>

      </div>
    </main>
  )
}

export default Settings