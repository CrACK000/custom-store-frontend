import React, {useState} from "react";
import {useParams, useLocation, useNavigate} from "react-router-dom";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Input} from "@/components/ui/input";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Button} from "@/components/ui/button";
import {
  Check,
  CheckIcon,
  ChevronLeft,
  DollarSign, DollarSignIcon,
  Loader2,
  Plus,
  PlusCircle,
  RefreshCwIcon,
  Truck,
  X
} from "lucide-react";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Label} from "@/components/ui/label";
import {useFieldArray, useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {Separator} from "@/components/ui/separator";
import {Checkbox} from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle, DialogTrigger
} from "@/components/ui/dialog";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from "@/components/ui/command";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {useConfig} from "@/hooks/use-config";
import {Badge} from "@/components/ui/badge";
import OrderStatus from "@/components/global/order-status";
import {useOrder} from "@/hooks/use-orders";
import {toast, useToast} from "@/components/ui/use-toast";
import axios from "axios";
import {ToastAction} from "@/components/ui/toast";
import {formatDate, formatDateTime} from "@/lib/date-formats";
import {useProducts} from "@/hooks/use-products";

const products: Product[] = useProducts();

const customerSchema = z.object({
  name: z.string(),
  surname: z.string(),
  email: z.string().email(),
  phone: z.string(),
});
const shippingDataSchema = z.object({
  customer: customerSchema,
  address: z.string(),
  city: z.string(),
  state: z.string(),
  zip: z.string(),
});
const billingDataSchema = z.object({
  customer: customerSchema,
  address: z.string(),
  city: z.string(),
  state: z.string(),
  zip: z.string(),
});
const productsDataSchema = z.object({
  data: z.any(),
  sku: z.string(),
  name: z.string(),
  quantity: z.number().optional(),
  price: z.number().optional(),
  size: z.enum(["xs", "s", "m", "l", "xl", "xxl"], {
    message: "Please select a size.",
  })
});

const FormSchema = z.object({
  type: z.enum(["Sale", "Refund", "Subscription"], {
    message: "Type must be selected."
  }),
  status: z.enum(["Fulfilled", "Declined", "Refunded", "Approved", "Pending"], {
    message: "Status must be selected."
  }),
  products: z.array(productsDataSchema),
  payment_method: z.string(),
  shipping_price: z.number().optional(),
  shipping_data: shippingDataSchema,
  billing_data_checkbox: z.boolean(),
  billing_data: z.union([billingDataSchema, z.null()]),
}).refine(data => {
  if (!data.billing_data_checkbox) {
    return data.billing_data !== null;
  }
  return true;
}, {
  message: "If billing data is checked, the billing data object must be provided and valid.",
  path: ["billing_data"]
});

const OrderActions = () => {

  const navigate = useNavigate();
  const [config] = useConfig();
  const { orderId } = useParams();
  const order = useOrder(orderId ?? "none");
  const isEditMode = order !== null;
  const [loading, useLoading] = useState(false)

  const formValues = {
    resolver: zodResolver(FormSchema),
    defaultValues: {
      type: order?.type ?? undefined,
      status: order?.status ?? undefined,
      payment_method: order?.payment_data.type ?? undefined,
      shipping_price: order?.shipping_price ?? 0,
      shipping_data: order?.shipping_data ?? {},
      products: order?.products ?? [],
      billing_data_checkbox: !(!!order?.billing_data),
      billing_data: order?.billing_data ?? null,
    },
  }
  const form = useForm<z.infer<typeof FormSchema>>(formValues);
  const {fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'products',
  });
  const totalProductsSum = form.getValues("products") ?
    form.getValues("products").reduce((acc, product) => acc + ((product.price ?? 0) * (product.quantity ?? 1)), 0) : 0;

  function onSubmit(values: z.infer<typeof FormSchema>) {

    useLoading(true)

    const api = `https://localhost:8080/v1/api/orders?action=${isEditMode ? "edit" : "create"}`
    const data = {
      productId: order?._id ?? undefined,
      data: values,
    }
    const options = { withCredentials: true }

    axios.post(api, data, options)
      .then(response => {
        toast(response.data.message)
      })
      .catch(error => {
        toast({
          variant: "destructive",
          title: "Server Error",
          description: String(error),
          action: <ToastAction altText="Try again" onClick={() => form.handleSubmit(onSubmit)()}>Try again</ToastAction>,
          duration: 5000,
        })
      })
      .finally(() => {
        useLoading(false)
      })
  }

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 sm:px-6 sm:py-0 mx-auto max-w-7xl">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} onChange={() => {form.watch()}} className="mx-auto grid max-w-5xl flex-1 auto-rows-max gap-4">
          <div className="flex items-center gap-4">
            <Button type="button" variant="outline" size="icon" className="h-7 w-7" onClick={() => navigate("/orders")}>
              <ChevronLeft className="h-4 w-4"/>
              <span className="sr-only">Back</span>
            </Button>
            <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
              {isEditMode ? `Editing Order: ${order?._id}` : "Create Order"}
            </h1>
            <div className="hidden items-center gap-2 md:ml-auto md:flex">
              <Button type="button" variant="outline" size="sm" onClick={() => navigate("/orders")}>
                {isEditMode ? "Discard" : "Cancel"}
              </Button>
              <Button size="sm" type="submit" disabled={!form.formState.isDirty}>
                {!loading || <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isEditMode ? "Save Changes" : "Create"}
              </Button>
            </div>
          </div>
          <div className="grid gap-4 lg:grid-cols-3 lg:gap-8">
            <div className="grid auto-rows-max items-start gap-4 lg:gap-8 lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Shipping Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-12 gap-x-6 gap-y-4">
                    <FormField
                      control={form.control}
                      name="shipping_data.customer.name"
                      render={({field}) => (
                        <FormItem className="md:col-span-4">
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage/>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="shipping_data.customer.surname"
                      render={({field}) => (
                        <FormItem className="md:col-span-4">
                          <FormLabel>Surname</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage/>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="shipping_data.customer.email"
                      render={({field}) => (
                        <FormItem className="md:col-span-5">
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="@" {...field} />
                          </FormControl>
                          <FormMessage/>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="shipping_data.customer.phone"
                      render={({field}) => (
                        <FormItem className="md:col-span-5">
                          <FormLabel>Phone</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage/>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="shipping_data.address"
                      render={({field}) => (
                        <FormItem className="md:col-span-4">
                          <FormLabel>Address</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage/>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="shipping_data.city"
                      render={({field}) => (
                        <FormItem className="md:col-span-4">
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage/>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="shipping_data.zip"
                      render={({field}) => (
                        <FormItem className="md:col-span-4">
                          <FormLabel>Zip</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage/>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="shipping_data.state"
                      render={({field}) => (
                        <FormItem className="md:col-span-5">
                          <FormLabel>State</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage/>
                        </FormItem>
                      )}
                    />
                  </div>
                  <Separator className="my-6" />
                  <CardTitle className="text-xl">Billing Information</CardTitle>
                  <div className="my-6">
                    <FormField
                      control={form.control}
                      name="billing_data_checkbox"
                      render={({field}) => (
                        <FormItem className="md:col-span-4 flex flex-row items-center space-x-2 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={(checked) => {
                                field.onChange(checked);
                                if (checked) {
                                  form.setValue("billing_data", null);
                                }
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">Same as Shipping</FormLabel>
                          <FormMessage/>
                        </FormItem>
                      )}
                    />
                  </div>
                  {!form.watch("billing_data_checkbox") && (
                    <div className="grid md:grid-cols-12 gap-x-6 gap-y-4">
                      <FormField
                        control={form.control}
                        name="billing_data.customer.name"
                        render={({ field }) => (
                          <FormItem className="md:col-span-4">
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="billing_data.customer.surname"
                        render={({ field }) => (
                          <FormItem className="md:col-span-4">
                            <FormLabel>Surname</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="billing_data.customer.email"
                        render={({ field }) => (
                          <FormItem className="md:col-span-5">
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="@" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="billing_data.customer.phone"
                        render={({ field }) => (
                          <FormItem className="md:col-span-5">
                            <FormLabel>Phone</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="billing_data.address"
                        render={({ field }) => (
                          <FormItem className="md:col-span-4">
                            <FormLabel>Address</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="billing_data.city"
                        render={({ field }) => (
                          <FormItem className="md:col-span-4">
                            <FormLabel>City</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="billing_data.zip"
                        render={({ field }) => (
                          <FormItem className="md:col-span-4">
                            <FormLabel>Zip</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="billing_data.state"
                        render={({ field }) => (
                          <FormItem className="md:col-span-5">
                            <FormLabel>State</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Products</CardTitle>
                  <CardDescription>selected products</CardDescription>
                </CardHeader>
                <CardContent className="px-0 pb-0 lg:px-6 lg:pb-6">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead className="w-16 md:w-24">Quantity</TableHead>
                        <TableHead className="w-16 md:w-24">Size</TableHead>
                        <TableHead colSpan={2}>Price</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {
                        fields.length !== 0 ? (
                          fields.map((item, index) => (
                            <TableRow key={item.id}>
                              <TableCell className="text-xs lg:text-sm">
                                <div className="flex items-center gap-x-3">
                                  <img
                                    src={item.data.gallery?.data[item.data.gallery?.main].image}
                                    width={35}
                                    height={35}
                                    className="hidden xl:block aspect-square rounded-md object-cover"
                                    alt="name"
                                  />
                                  <div className="md:line-clamp-2">
                                    {item.name}
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>
                                <FormField control={form.control} name={`products.${index}.quantity`}
                                           render={({ field }) => (
                                             <FormItem>
                                               <FormControl>
                                                 <Input type="number" min={0} {...field} />
                                               </FormControl>
                                               <FormMessage className="text-xs" />
                                             </FormItem>
                                           )}
                                />
                              </TableCell>
                              <TableCell>
                                <FormField
                                  control={form.control}
                                  name={`products.${index}.size`}
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormControl>
                                        <Select
                                          onValueChange={(value) => {
                                            const selectedProduct = products.find((product) => product._id === fields[index].data._id);
                                            const selectedStock = selectedProduct?.stocks ? selectedProduct?.stocks.find((stock) => stock.size === value) : 0;
                                            form.setValue(`products.${index}.price`, Number(selectedStock ? selectedStock.price : 0));
                                            field.onChange(value);
                                          }}
                                          defaultValue={field.value}
                                        >
                                          <SelectTrigger>
                                            <SelectValue placeholder="Select size" />
                                          </SelectTrigger>
                                          <SelectContent>
                                            <SelectGroup>
                                              {item.data.stocks.map((stock: Stocks) => (
                                                <SelectItem key={stock.size} value={stock.size ?? ''}>
                                                  {stock.size ? stock.size.toUpperCase() : 'Unknown Size'}
                                                </SelectItem>
                                              ))}
                                            </SelectGroup>
                                          </SelectContent>
                                        </Select>
                                      </FormControl>
                                      <FormMessage className="text-xs" />
                                    </FormItem>
                                  )}

                                />
                              </TableCell>
                              <TableCell className="text-xs lg:text-sm max-w-16">
                                ${form.getValues(`products.${index}.price`)}
                              </TableCell>
                              <TableCell>
                                <Button type="button" variant="ghost" size="icon" className="w-7 h-7" onClick={() => remove(index)}>
                                  <X className="w-4 h-4" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={4} className="text-center text-muted-foreground">
                              Empty
                            </TableCell>
                          </TableRow>
                        )
                      }
                    </TableBody>
                    {fields.length !== 0 && (
                      <TableFooter>
                        <TableRow>
                          <TableCell colSpan={3}>Total</TableCell>
                          <TableCell colSpan={2} className="text-right">
                            ${totalProductsSum.toFixed(2)}
                          </TableCell>
                        </TableRow>
                      </TableFooter>
                    )}
                  </Table>
                </CardContent>
                <CardFooter className="justify-center border-t p-4">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button type="button" size="sm" variant="ghost" className="gap-1">
                        <PlusCircle className="h-3.5 w-3.5"/>
                        Add Product
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="gap-0 p-0 outline-none">
                      <DialogHeader className="px-4 pb-4 pt-5">
                        <DialogTitle>Add Product</DialogTitle>
                        <DialogDescription>
                          Select a product for the order.
                        </DialogDescription>
                      </DialogHeader>
                      <Command className="overflow-hidden rounded-t-none border-t bg-transparent">
                        <CommandInput placeholder="Search product..." />
                        <CommandList>
                          <CommandEmpty>No products found.</CommandEmpty>
                          <CommandGroup className="p-2">
                            {products.map((product) => {
                              const totalStock = product.stocks ? product.stocks.reduce((acc, stock) => acc + (stock.stock ?? 0), 0) : 0;
                              return (
                                <CommandItem
                                  key={product._id}
                                  className="flex items-center px-2"

                                >
                                  <img
                                    src={product.gallery?.data[product.gallery?.main].image}
                                    width={44}
                                    height={44}
                                    className="rounded-md aspect-square object-cover"
                                    alt={product.name}
                                  />
                                  <div className="ml-2">
                                    <p className="text-sm font-medium leading-none">
                                      {product.name}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                      {product.description}
                                    </p>
                                  </div>
                                  <div className="ms-auto">
                                    {product.stocks && totalStock > 0 ? (
                                      <DropdownMenu>
                                        <DropdownMenuTrigger>
                                          <Button type="button" size="icon" className="text-xs w-6 h-6">
                                            <Plus className="w-4 h-4" />
                                          </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                          {product.stocks?.map((stock, key) => (
                                            <DropdownMenuItem key={key} onClick={
                                              () => append({
                                                data: product,
                                                sku: stock.sku ?? "",
                                                name: product.name ?? "",
                                                quantity: Number(1),
                                                price: stock.price,
                                                size: stock.size ?? "m"
                                              })
                                            }>
                                              <div className="flex w-full justify-between items-center">
                                                <span className="uppercase">{stock.size}</span>
                                                <span className="text-xs text-muted-foreground">${stock.price}</span>
                                              </div>
                                            </DropdownMenuItem>
                                          ))}
                                        </DropdownMenuContent>
                                      </DropdownMenu>
                                    ) : (
                                      <div className="text-muted-foreground text-xs">Sold Out</div>
                                    )}
                                  </div>
                                </CommandItem>
                              )
                            })}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </DialogContent>
                  </Dialog>
                </CardFooter>
              </Card>
            </div>
            <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Order</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3">
                    <FormField
                      control={form.control}
                      name="status"
                      render={({field}) => (
                        <FormItem>
                          <FormLabel>Status</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select status"/>
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Fulfilled">Fulfilled</SelectItem>
                              <SelectItem value="Declined">Declined</SelectItem>
                              <SelectItem value="Refunded">Refunded</SelectItem>
                              <SelectItem value="Approved">Approved</SelectItem>
                              <SelectItem value="Pending">Pending</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage/>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="type"
                      render={({field}) => (
                        <FormItem>
                          <FormLabel>Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select type"/>
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Sale">Sale</SelectItem>
                              <SelectItem value="Refund">Refund</SelectItem>
                              <SelectItem value="Subscription">Subscription</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage/>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="shipping_price"
                      render={({field}) => (
                        <FormItem className="max-w-[150px]">
                          <FormLabel>Shipping price</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input type="number" min={0} step="any" className="ps-8" {...field} />
                              <DollarSign className="absolute top-1/2 -translate-y-1/2 left-2.5 w-4 h-4 text-muted-foreground"/>
                            </div>
                          </FormControl>
                          <FormMessage/>
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Payment</CardTitle>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="payment_method"
                    render={({field}) => (
                      <FormItem>
                        <FormLabel>Method</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          disabled={order?.payment_data.status === "paid"}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select method"/>
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Paypal">Paypal</SelectItem>
                            <SelectItem value="Card">Card</SelectItem>
                            <SelectItem value="GoPass">GoPass</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage/>
                      </FormItem>
                    )}
                  />
                  {isEditMode && (
                    <div>
                      <Separator className="my-4"/>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <dt className="text-muted-foreground">Payment status</dt>
                        <OrderStatus status={order?.payment_data.status}/>
                      </div>
                      <div className="flex items-end justify-between text-sm">
                        <dt className="text-muted-foreground">Date of payment</dt>
                        <dd className="font-medium text-xs">{formatDateTime(order?.payment_data.date)}</dd>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Summarization</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm">
                    <dt className="text-muted-foreground">Products</dt>
                    <dd className="font-medium">{form.getValues("products").length}</dd>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <dt className="text-muted-foreground">Price products</dt>
                    <dd className="font-medium">${totalProductsSum.toFixed(2)}</dd>
                  </div>
                  <Separator className="my-4"/>
                  <div className="flex items-center justify-between text-sm">
                    <dt className="text-muted-foreground">Shipping price</dt>
                    <dd className="font-medium">${Number(form.getValues("shipping_price") ?? 0).toFixed(2)}</dd>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <dt className="text-muted-foreground">{config.tax.title} <small
                      className="text-muted-foreground">({config.tax.value}%)</small></dt>
                    <dd
                      className="font-medium">${(((totalProductsSum + Number(form.getValues("shipping_price") ?? 0)) * config.tax.value / 100).toFixed(2))}</dd>
                  </div>
                  <Separator className="my-4"/>
                  <div className="flex items-center justify-between text-sm">
                    <dt className="text-muted-foreground">Total</dt>
                    <dd
                      className="font-medium">${((((totalProductsSum + Number(form.getValues("shipping_price") ?? 0)) * config.tax.value / 100) + (totalProductsSum + Number(form.getValues("shipping_price") ?? 0))).toFixed(2))}</dd>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <dt className="text-muted-foreground">Payment method</dt>
                    <dd className="font-medium">{form.getValues("payment_method") ?? (
                      <small className="text-muted-foreground">not selected</small>
                    )}</dd>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 md:hidden">
            <Button type="button" variant="outline" size="sm" onClick={() => navigate("/orders")}>
              {isEditMode ? "Discard" : "Cancel"}
            </Button>
            <Button size="sm" type="submit" disabled={!form.formState.isDirty}>
              {!loading || <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isEditMode ? "Save Changes" : "Create"}
            </Button>
          </div>
        </form>
      </Form>
    </main>
  );
};

export default OrderActions;