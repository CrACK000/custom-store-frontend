import {Button} from "@/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList, CommandSeparator
} from "@/components/ui/command";
import React from "react";
import {useOrders} from "@/hooks/use-orders";
import {useProducts} from "@/hooks/use-products";
import {Badge} from "@/components/ui/badge";

function SearchBox() {

  const orders = useOrders();
  const products = useProducts();

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
        <CommandInput placeholder="Search for products, orders..."/>
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Products">
            {products.map((product, key) => (
              <CommandItem
                key={key}
                className="teamaspace-y-1 flex flex-col items-start px-4 py-2"
              >
                <div className="flex items-center gap-x-2">
                  <img
                    src={product.gallery?.data[product.gallery?.main].image}
                    alt={product.name}
                    width={32}
                    height={32}
                    className="aspect-square object-cover rounded-md"
                  />
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <div className="flex items-center gap-x-1">
                      {product.stocks?.map(stock => (
                        <div className="bg-secondary px-1 text-xs uppercase rounded text-muted-foreground font-medium">{stock.size}</div>
                      ))}
                    </div>
                  </div>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator/>
          <CommandGroup heading="Orders">
            {orders.map((order, key) => (
              <CommandItem
                key={key}
                className="teamaspace-y-1 flex flex-col items-start px-4 py-2"
              >
                <p>Order <b>{order._id}</b></p>
                <p className="text-xs text-muted-foreground">
                  {order.customer ? order.customer.name : order.shipping_data.customer.name} {order.customer ? order.customer.surname : order.shipping_data.customer.surname}
                  <span className="sr-only">{order.customer ? order.customer.email : order.shipping_data.customer.email}</span>
                </p>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>
  )
}

export default SearchBox