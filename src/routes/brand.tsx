import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Button} from "@/components/ui/button";
import {ScrollArea} from "@/components/ui/scroll-area";
import {Input} from "@/components/ui/input";
import {Separator} from "@/components/ui/separator";
import {
  AlertCircle,
  AtSign,
  CircleAlert,
  Copy,
  LineChart,
  Loader2,
  Minus,
  Package,
  Plus,
  Search,
  Settings,
  Users
} from "lucide-react";
import {Area, AreaChart, Bar, BarChart, ResponsiveContainer, Tooltip as RechartTooltip} from "recharts"
import * as React from "react"
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {useState} from "react";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Fuse from "fuse.js";
import {copyLink} from "@/lib/copylink";
import {toast} from "@/components/ui/use-toast";
import {GET_SUBSCRIPTIONS_USERS} from "@/hooks/use-users";
import {GET_BRAND} from "@/hooks/use-brand";
import {getInitials} from "@/lib/utils";
import {useQuery} from "@apollo/client";
import {Skeleton} from "@/components/ui/skeleton";
import BrandSettings from "@/components/global/brand-settings";
import {useLoaderData} from "react-router-dom";
import client from "@/hooks/apollo-client";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";

const chartData = [
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

export function brandLoader() {
  return async () => {
    try {
      const brand = await client.query({
        query: GET_BRAND,
        variables: { _id: "1", user_id: "user1" }
      });
      const subs = await client.query({
        query: GET_SUBSCRIPTIONS_USERS,
        variables: { key: "456def" }
      });
      return { brand, subs };
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: String(error),
      });
      return {
        brand: null,
        subs: { error: { message: String(error) } }
      };
    }
  };
}

function Brand() {

  const data: any = useLoaderData();

  const users = data.subs;
  const brand = data.brand;
  
  const fuseOptions = { keys: ['name', 'surname', 'email'], includeScore: true };

  const [metricData, setMetricData] = useState(30)
  const convertData = chartData.slice(0, metricData)

  const [unSubDialog, setUnSubDialog] = useState(false)
  const [unSubData, setUnSubData] = useState<User | null>(null)
  const [searchInput, setSearchInput] = useState('');

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

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-6">
      {
        (users && users.error) && (
          <div className="col-span-full">
            <Alert variant="destructive" className="bg-card">
              <AlertCircle className="h-4 w-4"/>
              <AlertTitle>{users.error.name ?? "Error"}</AlertTitle>
              <AlertDescription>
                {users.error.message}
              </AlertDescription>
            </Alert>
          </div>
        )
      }
      <div className="grid gap-4 md:gap-8 col-span-3 xl:col-span-4">
        <Card>
          {
            (brand && brand.data.brand) ? (
              <>
                <div
                  className={`relative h-44 ${(brand.data.brand && brand.data.brand.description) ? "rounded-t-lg" : "rounded-lg"} bg-center bg-cover bg-[url(/public/placeholder-light.png)] dark:bg-[url(/public/placeholder-dark.png)]`}>
                  <CardContent className="absolute bottom-0 w-full">
                    <div className="flex items-center gap-x-4 md:gap-x-6">
                      {(brand.loading && brand.error) ? (
                        <Skeleton className="w-10 h-10 md:w-14 md:h-14 rounded-full" />
                      ) : (
                        <Avatar className="w-10 h-10 md:w-14 md:h-14">
                          {brand.data.brand && (
                            <AvatarImage src={brand.data.brand.logo} alt={brand.data.brand.title}/>
                          )}
                          <AvatarFallback>{getInitials(brand.data.brand ? brand.data.brand.title : "Custom Hood")}</AvatarFallback>
                        </Avatar>
                      )}
                      <div className="text-2xl md:text-3xl font-bold">
                        {
                          brand.loading && brand.error ? (
                              <Skeleton className="w-32 md:w-56 max-w-full h-4" />
                            ) :
                            brand.data.brand && brand.data.brand.title
                        }
                      </div>
                      <div className="ms-auto self-end">
                        <BrandSettings brandData={brand.data.brand}/>
                      </div>
                    </div>
                  </CardContent>
                </div>
                {brand.data.brand && brand.data.brand.description.length && (
                  <CardContent className="pt-6">
                    <div className="text-lg font-bold mb-4">Description</div>
                    <CardDescription>{brand.data.brand.description}</CardDescription>
                  </CardContent>
                )}
              </>
            ) : (
              <div className={`relative h-44 rounded-lg bg-center bg-cover bg-[url(/public/placeholder-light.png)] dark:bg-[url(/public/placeholder-dark.png)]`}>
                <CardContent className="absolute bottom-0 w-full">
                  <div className="flex items-center gap-x-4 md:gap-x-6">
                    <Skeleton className="w-10 h-10 md:w-14 md:h-14 rounded-full"/>
                    <div className="text-2xl md:text-3xl font-bold">
                      <Skeleton className="w-32 md:w-56 max-w-full h-4"/>
                    </div>
                  </div>
                </CardContent>
              </div>
            )
          }
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
              <div className="text-3xl font-bold">
                {
                  users.data ? users.data.subscriptions.length : 0
                }
              </div>
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
              <Input value={
                (brand && brand.data.brand) ? `http://localhost:5173/@${brand ? brand.data.brand.link : ""}` : "http://localhost:5173"
              } readOnly />
              <TooltipProvider delayDuration={0}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="secondary" onClick={() => copyLink((brand && brand.data.brand) ? `http://localhost:5173/@${brand ? brand.data.brand.link : ""}` : "http://localhost:5173")}>
                      <Copy className="w-4 h-4 mr-1.5" /> Copy Link
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
                {
                  (users.loading || users.error) ?
                    (
                      [...Array(3)].map((_, index) => (
                        <div key={index} className="flex items-center space-x-4">
                          <Skeleton className="h-10 w-10 rounded-full"/>
                          <div className="space-y-2">
                            <Skeleton className="h-4 w-[250px] max-w-full"/>
                            <Skeleton className="h-3 w-[200px] max-w-full"/>
                          </div>
                        </div>
                      ))
                    ) : (
                      <>
                        {
                          searchSubscribers(users.data.subscriptions, searchInput).length ?
                            searchSubscribers(users.data.subscriptions, searchInput)
                              .map((user, key) => (
                                <div key={key} className="flex items-center gap-4">
                                  <Avatar className="hidden h-9 w-9 sm:flex">
                                    <AvatarImage src={user.avatar} alt={`${user.name} ${user.surname}`}/>
                                    <AvatarFallback>{getInitials(`${user.name} ${user.surname}`)}</AvatarFallback>
                                  </Avatar>
                                  <div className="grid gap-1">
                                    <p className="text-sm font-medium leading-none">
                                      {user.name} {user.surname}
                                    </p>
                                    <p className="text-sm text-muted-foreground truncate">
                                      <a href={`mailto:${user.email}`} className="hover:underline">
                                        {user.email}
                                      </a>
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
                              ))
                            :
                            (
                              <div className="flex justify-center items-center">
                                <div className="text-sm text-muted-foreground">
                                  no subscribers
                                </div>
                              </div>
                            )
                        }
                      </>
                    )
                }
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
              Are you sure you want to unsubscribe from <b
              className="text-primary">{unSubData?.name} {unSubData?.surname}</b>?
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