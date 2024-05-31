import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Button} from "@/components/ui/button";
import {ScrollArea} from "@/components/ui/scroll-area";
import {Input} from "@/components/ui/input";
import {Separator} from "@/components/ui/separator";
import {AtSign, Copy, LineChart, Loader2, Minus, Package, Plus, Search, Settings, Users} from "lucide-react";
import {Area, AreaChart, Bar, BarChart, ResponsiveContainer, Tooltip as RechartTooltip} from "recharts"
import * as React from "react"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {useState} from "react";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import Fuse from "fuse.js";
import {copyLink} from "@/lib/copylink";
import {Label} from "@/components/ui/label";
import {Textarea} from "@/components/ui/textarea";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {toast} from "@/components/ui/use-toast";
import {useUsers} from "@/hooks/use-users";
import {useBrand} from "@/hooks/use-brand";
import {getInitials} from "@/lib/utils";
import axios from "axios";
import {ToastAction} from "@/components/ui/toast";

const data = [
  {
    value: Math.floor(Math.random() * 500),
  },
  {
    value: Math.floor(Math.random() * 500),
  },
  {
    value: Math.floor(Math.random() * 500),
  },
  {
    value: Math.floor(Math.random() * 500),
  },
  {
    value: Math.floor(Math.random() * 500),
  },
  {
    value: Math.floor(Math.random() * 500),
  },
  {
    value: Math.floor(Math.random() * 500),
  },
  {
    value: Math.floor(Math.random() * 500),
  },
  {
    value: Math.floor(Math.random() * 500),
  },
  {
    value: Math.floor(Math.random() * 500),
  },
  {
    value: Math.floor(Math.random() * 500),
  },
  {
    value: Math.floor(Math.random() * 500),
  },
  {
    value: Math.floor(Math.random() * 500),
  },
  {
    value: Math.floor(Math.random() * 500),
  },
  {
    value: Math.floor(Math.random() * 500),
  },
  {
    value: Math.floor(Math.random() * 500),
  },
  {
    value: Math.floor(Math.random() * 500),
  },
  {
    value: Math.floor(Math.random() * 500),
  },
  {
    value: Math.floor(Math.random() * 500),
  },
  {
    value: Math.floor(Math.random() * 500),
  },
  {
    value: Math.floor(Math.random() * 500),
  },
  {
    value: Math.floor(Math.random() * 500),
  },
  {
    value: Math.floor(Math.random() * 500),
  },
  {
    value: Math.floor(Math.random() * 500),
  },
  {
    value: Math.floor(Math.random() * 500),
  },
  {
    value: Math.floor(Math.random() * 500),
  },
  {
    value: Math.floor(Math.random() * 500),
  },
  {
    value: Math.floor(Math.random() * 500),
  },
  {
    value: Math.floor(Math.random() * 500),
  },
  {
    value: Math.floor(Math.random() * 500),
  },
]

const FormSchema = z.object({
  title: z.string()
    .min(2, {message: "The title must have at least 2 characters."})
    .max(50, {message: "The maximum number of characters is 50."}),
  logo: z.string().url(),
  link: z.string(),
  description: z.string().max(600, {
    message: "The maximum number of characters is 600."
  })
})

function Brand() {

  const subscribers = useUsers();
  const brand = useBrand();

  const fuseOptions = { keys: ['name', 'surname', 'email'], includeScore: true };

  const [metricData, setMetricData] = useState(30)
  const convertData = data.slice(0, metricData)

  const [unSubDialog, setUnSubDialog] = useState(false)
  const [unSubData, setUnSubData] = useState<User | null>(null)
  const [searchInput, setSearchInput] = useState('');
  const [loading, useLoading] = useState(false)

  const formValues = {
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: brand.title ?? "Undefined",
      logo: brand.logo ?? "",
      link: brand.link ?? "",
      description: brand.description ?? "",
    },
  }
  const form = useForm<z.infer<typeof FormSchema>>(formValues);

  const handleSearch = (value: string) => {
    setSearchInput(value);
  };
  const searchSubscribers = (users: User[], query: string): User[] => {
    if (!query) return users;

    const fuse = new Fuse(users, fuseOptions);
    const results = fuse.search(query);

    return results.map(result => result.item);
  };

  const unSubAlert = (data: User | null, open: boolean) => {
    setUnSubDialog(open)
    setUnSubData(data)
  }

  const onEditBrandData = (values: z.infer<typeof FormSchema>) => {

    useLoading(true)

    const api = ""
    const data = values
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
          action: <ToastAction altText="Try again" onClick={() => form.handleSubmit(onEditBrandData)()}>Try again</ToastAction>,
          duration: 5000,
        })
      })
      .finally(() => {
        useLoading(false)
      })

  }

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-6">
      <div className="grid gap-4 md:gap-8 col-span-3 xl:col-span-4">
        <Card>
          <div className="relative rounded-t-lg h-44 bg-center bg-cover bg-[url(/public/placeholder-light.png)] dark:bg-[url(/public/placeholder-dark.png)]">
            <CardContent className="absolute bottom-0 w-full">
              <div className="flex items-center gap-x-4 md:gap-x-6">
                <Avatar className="w-10 h-10 md:w-14 md:h-14">
                  <AvatarImage src={brand.logo} alt={brand.title}/>
                  <AvatarFallback>{getInitials(brand.title)}</AvatarFallback>
                </Avatar>
                <div className="text-2xl md:text-3xl font-bold">
                  Different studio
                </div>
                <div className="ms-auto self-end">
                  <Drawer>
                    <DrawerTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Settings className="w-5 h-5"/>
                      </Button>
                    </DrawerTrigger>
                    <DrawerContent>
                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(onEditBrandData)} onChange={() => {form.watch()}}>
                          <div className="mx-auto w-full max-w-3xl">
                            <DrawerHeader>
                              <DrawerTitle>Brand Information</DrawerTitle>
                            </DrawerHeader>
                            <div className="p-4 grid md:grid-cols-2 gap-6">
                              <FormField
                                control={form.control}
                                name="title"
                                render={({field}) => (
                                  <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                      <Input {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={form.control}
                                name="logo"
                                render={({field}) => (
                                  <FormItem>
                                    <FormLabel>Logo URL</FormLabel>
                                    <div className="flex gap-x-4">
                                      <FormControl>
                                        <Input placeholder="https://" {...field} />
                                      </FormControl>
                                      <Avatar>
                                        <AvatarImage src={brand.logo} alt={brand.title}/>
                                        <AvatarFallback>{getInitials(brand.title)}</AvatarFallback>
                                      </Avatar>
                                    </div>
                                    <FormMessage/>
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={form.control}
                                name="link"
                                render={({field}) => (
                                  <FormItem>
                                    <FormLabel>Link</FormLabel>
                                    <FormControl>
                                      <div className="relative">
                                        <Input className="ps-9" {...field} />
                                        <AtSign className="absolute top-1/2 -translate-y-1/2 left-3 w-4 h-4 text-muted-foreground" />
                                      </div>
                                    </FormControl>
                                    <FormMessage/>
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={form.control}
                                name="description"
                                render={({field}) => (
                                  <FormItem className="md:col-span-2">
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                      <Textarea rows={10} {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                  </FormItem>
                                )}
                              />
                            </div>
                            <DrawerFooter>
                              <div className="flex justify-end">
                                <DrawerClose asChild>
                                  <Button type="button" variant="outline">Cancel</Button>
                                </DrawerClose>
                                <Button type="submit">
                                  {!loading || <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                  Save Changes
                                </Button>
                              </div>
                            </DrawerFooter>
                          </div>
                        </form>
                      </Form>
                    </DrawerContent>
                  </Drawer>
                </div>
              </div>
            </CardContent>
          </div>
          <CardContent className="pt-6">
            <div className="text-lg font-bold mb-4">Description</div>
            <CardDescription>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
              ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
              fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum.
            </CardDescription>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <div className="flex justify-between">
              <div>
                <CardTitle>Attendance</CardTitle>
                <CardDescription>Traffic to your brand in the last {metricData} days.</CardDescription>
              </div>
              <Select value={String(metricData)} onValueChange={(value) => setMetricData(Number(value))}>
                <SelectTrigger className="w-auto">
                  <SelectValue placeholder="Select a metric"/>
                </SelectTrigger>
                <SelectContent align="end">
                  <SelectGroup>
                    <SelectItem value="7" onSelect={() => setMetricData(7)}>last 7 days</SelectItem>
                    <SelectItem value="15" onSelect={() => setMetricData(15)}>last 15 days</SelectItem>
                    <SelectItem value="30" onSelect={() => setMetricData(30)}>last 30 days</SelectItem>
                    <SelectItem value="60" onSelect={() => setMetricData(60)}>last 60 days</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={175}>
              <AreaChart data={convertData}>
                <defs>
                  <linearGradient id="colorThis" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={`hsl(var(--primary))`} stopOpacity={0.8}/>
                    <stop offset="95%" stopColor={`hsl(var(--primary))`} stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorLast" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={`hsl(var(--primary))`} stopOpacity={0.8}/>
                    <stop offset="95%" stopColor={`hsl(var(--primary))`} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <RechartTooltip content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="rounded-lg border bg-background p-2 shadow-sm">
                          <div className="grid gap-2">
                            <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              Views
                            </span>
                              <span className="font-bold">
                              {payload[0].value}
                            </span>
                            </div>
                          </div>
                        </div>
                      )
                    }

                    return null
                  }}
                />
                <Area type="monotone" dataKey="value" stroke={`hsl(var(--primary))`} strokeWidth={3} fillOpacity={0.30}
                      fill="url(#colorThis)"/>
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:gap-8 col-span-3 xl:col-span-2">
        <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Subscriptions
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground"/>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+2350</div>
              <p className="text-xs text-muted-foreground">
                +180.1% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Products
              </CardTitle>
              <Package className="h-4 w-4 text-muted-foreground"/>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">12</div>
            </CardContent>
          </Card>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Share your brand</CardTitle>
            <CardDescription>The link on view your brand.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-x-2">
              <Input value={`http://localhost:5173/@${brand.link}`} readOnly />
              <TooltipProvider delayDuration={0}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="secondary" size="icon" onClick={() => copyLink(`http://localhost:5173/@${brand.link}`)}>
                      <Copy className="w-4 h-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Copy Link</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Separator className="my-5"/>
            <div className="text-sm mb-2 font-bold">Subscribers</div>
            <div className="relative ml-auto flex-1 md:grow-0">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"/>
              <Input
                type="search"
                placeholder="Search..."
                className="w-full rounded-lg bg-background pl-8 mb-4"
                value={searchInput}
                onChange={e => handleSearch(e.target.value)}
              />
            </div>
          </CardContent>
          <ScrollArea className="h-[300px]">
            <CardContent>
              <div className="grid gap-8">
                {searchSubscribers(subscribers, searchInput).map((user, key) => (
                  <div key={key} className="flex items-center gap-4">
                    <Avatar className="hidden h-9 w-9 sm:flex">
                      <AvatarImage src="/avatars/01.png" alt={`${user.name} ${user.surname}`} />
                      <AvatarFallback>{getInitials(`${user.name} ${user.surname}`)}</AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                      <p className="text-sm font-medium leading-none">
                        {user.name} {user.surname}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                    <div className="ml-auto">
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-xs"
                        onClick={() => unSubAlert(user, true)}
                      >
                        Unsubscribe
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </ScrollArea>
        </Card>
      </div>
      <AlertDialog open={unSubDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Unsubscribe</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to unsubscribe from <b className="text-primary">{unSubData?.name} {unSubData?.surname}</b>?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => unSubAlert(null, false)}>Cancel</AlertDialogCancel>
            <AlertDialogAction>Unsubscribe</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  )
}

export default Brand