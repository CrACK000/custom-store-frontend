import {Button} from "@/components/ui/button";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList, CommandSeparator, CommandShortcut
} from "@/components/ui/command";
import React from "react";
import {useOrders} from "@/hooks/use-orders";
import {useProducts} from "@/hooks/use-products";
import {Badge} from "@/components/ui/badge";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {useNavigate} from "react-router-dom";
import {Input} from "@/components/ui/input";
import {ScrollArea} from "@/components/ui/scroll-area";
import {Separator} from "@/components/ui/separator";

function SearchBox() {

  const navigate = useNavigate()
  const orders = useOrders();
  const products = useProducts();
  const lastSearch = [
    {
      name: "Health Coach III",
      uri: "/products/edit/3b8a1d4c7e",
    }
  ]

  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const go = (uri: string) => {
    setOpen(false)
    return navigate(uri)
  }

  return (
    <div className="ml-auto flex-1 md:grow-0">
      <Button
        variant="outline"
        className="w-full flex justify-between md:w-[200px] lg:w-[336px] text-muted-foreground pe-2"
        onClick={() => setOpen(true)}
      >
        Search..
        <kbd className="hidden items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">⌘ K</kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <Input
          className="h-12 border-x-0 border-t-0 ring-0 rounded-none focus-visible:border-x-0 focus-visible:border-t-0 focus-visible:ring-0"
          placeholder="Search for products, orders..."
        />
        <ScrollArea className="pe-1 max-h-96">
          <div className="flex flex-col gap-1 p-2.5">
            <p className="text-muted-foreground font-bold text-xs">Recent</p>
            {lastSearch.map((item, key) => (
              <div
                key={key}
                className="text-sm py-1.5 px-2 hover:bg-accent rounded-sm cursor-pointer"
                onClick={() => go(item.uri)}
              >
                <span className="opacity-75">{item.name}</span>
              </div>
            )).slice(0, 5)}
          </div>
          <Separator/>
          <div className="flex flex-col gap-1 p-2.5">
            <p className="text-muted-foreground font-bold text-xs">Products</p>
            {products.map((product) => (
              <div
                key={product._id}
                className="text-sm py-1.5 px-2 hover:bg-accent rounded-sm cursor-pointer"
                onClick={() => go(`/products/edit/${product._id}`)}
              >
                <span className="font-medium">{product.name}</span>
              </div>
            )).slice(0, 5)}
          </div>
          <Separator/>
          <div className="flex flex-col gap-1 p-2.5">
            <p className="text-muted-foreground font-bold text-xs">Orders</p>
            {orders.map((order) => (
              <div
                key={order._id}
                className="text-sm py-1.5 px-2 hover:bg-accent rounded-sm cursor-pointer"
                onClick={() => go(`/orders/edit/${order._id}`)}
              >
                <span>Order <b>{order._id}</b></span>
              </div>
            )).slice(0, 5)}
          </div>
        </ScrollArea>
      </CommandDialog>
    </div>
  )
}

export default SearchBox