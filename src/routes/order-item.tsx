import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Copy,
  CreditCard,
  Loader2,
  MoreVertical,
  Truck,
  UserRound
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Separator} from "@/components/ui/separator";
import {Pagination, PaginationContent, PaginationItem} from "@/components/ui/pagination";
import React, {FC} from "react";
import {useNavigate} from "react-router-dom";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {HoverCard, HoverCardContent, HoverCardTrigger} from "@/components/ui/hover-card";
import ordersData from "@/data/orders.json"
import {exportOrder} from "@/hooks/use-export-data";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import {z} from "zod";
import axios from "axios";
import {toast} from "@/components/ui/use-toast";
import {ToastAction} from "@/components/ui/toast";
import {copyLink} from "@/lib/copylink";
import {formatDate} from "@/lib/date-formats";
import {useOrder} from "@/hooks/use-orders";

const OrderItem: FC<OrderProps> = ({ orderId, nextOrder, prevOrder }) => {

  const navigate = useNavigate()
  const order: Order | null = useOrder(orderId)

  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false)
  const [loading, setLoading] = React.useState(false)

  if (order === null) {
    return (
      <div>Select Order</div>
    )
  }

  const subtotal = () => {
    return order.products.reduce((acc, product) => acc + product.price * product.quantity, 0);
  }
  const total = () => {
    return subtotal() + order.shipping_price + 25.99;
  }

  const onSubmitDelete = () => {

    setLoading(true)

    const api = "/"
    const data = order
    const options = { withCredentials: true }

    axios.post(api, data, options)
      .then(response => {
        toast(response.data.message)
        setOpenDeleteDialog(false)
      })
      .catch(error => {
        toast({
          variant: "destructive",
          title: "Server Error",
          description: String(error),
          action: <ToastAction altText="Try again" onClick={() => onSubmitDelete()}>Try again</ToastAction>,
          duration: 5000,
        })
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader className="group flex flex-row items-start bg-muted/50">
        <div className="grid gap-0.5">
          <CardTitle className="flex items-center gap-2 text-lg">
            Order {order._id}
            <TooltipProvider delayDuration={200}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="icon"
                    variant="outline"
                    className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                    onClick={() => copyLink(order?._id)}
                  >
                    <Copy className="h-3 w-3"/>
                    <span className="sr-only">Copy Order ID</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="text-xs">
                  Copy Order ID
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </CardTitle>
          <CardDescription>Date: {formatDate(order.created_at)}</CardDescription>
        </div>
        <div className="ml-auto flex items-center gap-1">
          <Button size="sm" variant="outline" className="h-8 gap-1">
            <Truck className="h-3.5 w-3.5"/>
            <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
              Track Order
            </span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="outline" className="h-8 w-8">
                <MoreVertical className="h-3.5 w-3.5"/>
                <span className="sr-only">More</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => navigate(`edit/${orderId}`)}>Edit</DropdownMenuItem>
              <DropdownMenuItem onClick={() => exportOrder(order)}>Export</DropdownMenuItem>
              <DropdownMenuSeparator/>
              <DropdownMenuItem onClick={() => setOpenDeleteDialog(true)}>Trash</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="p-6 text-sm">
        <div className="grid gap-3">
          <div className="font-semibold">Order Details</div>
          <ul className="grid gap-3">
            {order.products.map((product, key) => (
              <li key={key} className="flex items-center justify-between">
                <span className="text-muted-foreground">
                  {product.name} x <span>{product.quantity}</span>
                </span>
                <span>${product.price.toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <Separator className="my-2"/>
          <ul className="grid gap-3">
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>${subtotal().toFixed(2)}</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Shipping</span>
              <span>${order.shipping_price.toFixed(2)}</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Tax</span>
              <span>$25.99</span>
            </li>
            <li className="flex items-center justify-between font-semibold">
              <span className="text-muted-foreground">Total</span>
              <span>${total().toFixed(2)}</span>
            </li>
          </ul>
        </div>
        <Separator className="my-4"/>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-3">
            <div className="font-semibold">Shipping Information</div>
            <address className="grid gap-0.5 not-italic text-muted-foreground">
              <span>{`${order.shipping_data.customer.name} ${order.shipping_data.customer.surname}`}</span>
              <span>{order.shipping_data.address}</span>
              <span>{order.shipping_data.city}, {order.shipping_data.zip}</span>
              <span>{order.shipping_data.state}</span>
            </address>
          </div>
          <div className="grid auto-rows-max gap-3">
            <div className="font-semibold">Billing Information</div>
            {order.billing_data === null ? (
              <div className="text-muted-foreground">
                Same as shipping address
              </div>
            ) : (
              <address className="grid gap-0.5 not-italic text-muted-foreground">
                <span>{order.billing_data.customer.name} {order.billing_data.customer.surname}</span>
                <span>{order.billing_data.address}</span>
                <span>{order.billing_data.city}, {order.billing_data.zip}</span>
                <span>{order.billing_data.state}</span>
              </address>
            )}
          </div>
        </div>
        <Separator className="my-4"/>
        <div className="grid gap-3">
          <div className="font-semibold">Customer Information</div>
          <dl className="grid gap-3">
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">Customer</dt>
              <dd>{order.customer ? order.customer.name : order.shipping_data.customer.name} {order.customer ? order.customer.surname : order.shipping_data.customer.surname}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">Email</dt>
              <dd>
                <a href={`mailto:${order.customer ? order.customer.email : order.shipping_data.customer.email}`}>
                  {order.customer ? order.customer.email : order.shipping_data.customer.email}
                </a>
              </dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">Phone</dt>
              <dd>
                <a href={`tel:${order.shipping_data.customer.phone}`}>{order.shipping_data.customer.phone}</a>
              </dd>
            </div>
          </dl>
        </div>
        <Separator className="my-4"/>
        <div className="grid gap-3">
          <div className="font-semibold">Payment Information</div>
          <dl className="grid gap-3">
            <div className="flex items-center justify-between">
              <dt className="flex items-center gap-1 text-muted-foreground">
                <CreditCard className="h-4 w-4"/>
                Visa
              </dt>
              <dd>**** **** **** 4532</dd>
            </div>
          </dl>
        </div>
      </CardContent>
      <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-2.5">
        <div className="text-xs text-muted-foreground">
          Updated <time dateTime={order.updated_at}>{formatDate(order.updated_at)}</time>
        </div>
        {order.customer && (
          <div className="ms-auto">
            <HoverCard>
              <HoverCardTrigger asChild>
                <Avatar className="cursor-pointer w-8 h-8">
                  <AvatarImage src="/placeholder-light.pngs" alt={`@${order.customer.name}`}/>
                  <AvatarFallback>
                    <UserRound className="w-5 h-5 text-muted-foreground"/>
                  </AvatarFallback>
                </Avatar>
              </HoverCardTrigger>
              <HoverCardContent className="w-80">
                <div className="flex justify-between space-x-4">
                  <Avatar>
                    <AvatarImage src="/placeholder-light.pngs" alt={`@${order.customer.name}`}/>
                    <AvatarFallback>
                      <UserRound className="w-5 h-5 text-muted-foreground"/>
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <h4 className="text-sm font-semibold">@{order.customer.name}</h4>
                    <p className="text-sm">
                      The React Framework – created and maintained by @vercel.
                    </p>
                    <div className="flex items-center pt-2">
                      <CalendarDays className="mr-2 h-4 w-4 opacity-70"/>{" "}
                      <span className="text-xs text-muted-foreground">
                      Joined December 2021
                    </span>
                    </div>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          </div>
        )}
        <Pagination className="ml-auto mr-0 w-auto">
          <PaginationContent>
            <PaginationItem>
              <Button size="icon" variant="outline" className="h-6 w-6" onClick={prevOrder}>
                <ChevronLeft className="h-3.5 w-3.5"/>
                <span className="sr-only">Previous Order</span>
              </Button>
            </PaginationItem>
            <PaginationItem>
              <Button size="icon" variant="outline" className="h-6 w-6" onClick={nextOrder}>
                <ChevronRight className="h-3.5 w-3.5"/>
                <span className="sr-only">Next Order</span>
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </CardFooter>
      <AlertDialog open={openDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Move to trash?</AlertDialogTitle>
            <AlertDialogDescription>
              Do you really want to move the <b className="text-primary">{order._id}</b> order to the trash?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button type="reset" variant="ghost" onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
            <AlertDialogAction onClick={onSubmitDelete}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>}
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  )
}

export default OrderItem