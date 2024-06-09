import React, {useState} from "react";
import {Button} from "@/components/ui/button";
import {BarChart3, Calendar, Car, ChevronDown, ChevronLeft, Loader2} from "lucide-react";
import {useNavigate} from "react-router-dom";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Area, AreaChart, ResponsiveContainer, Tooltip} from "recharts";
import {useQuery} from "@apollo/client";

const currentMonth = new Date().toLocaleString('en', { month: 'long' }).toLowerCase()
const sales = [
  {
    last: Math.floor(Math.random() * 500),
    this: Math.floor(Math.random() * 500),
  },
  {
    last: Math.floor(Math.random() * 500),
    this: Math.floor(Math.random() * 500),
  },
  {
    last: Math.floor(Math.random() * 500),
    this: Math.floor(Math.random() * 500),
  },
  {
    last: Math.floor(Math.random() * 500),
    this: Math.floor(Math.random() * 500),
  },
  {
    last: Math.floor(Math.random() * 500),
    this: Math.floor(Math.random() * 500),
  },
  {
    last: Math.floor(Math.random() * 500),
    this: Math.floor(Math.random() * 500),
  },
  {
    last: Math.floor(Math.random() * 500),
    this: Math.floor(Math.random() * 500),
  },
  {
    last: Math.floor(Math.random() * 500),
    this: Math.floor(Math.random() * 500),
  },
  {
    last: Math.floor(Math.random() * 500),
    this: Math.floor(Math.random() * 500),
  },
  {
    last: Math.floor(Math.random() * 500),
    this: Math.floor(Math.random() * 500),
  },
  {
    last: Math.floor(Math.random() * 500),
    this: Math.floor(Math.random() * 500),
  },
  {
    last: Math.floor(Math.random() * 500),
    this: Math.floor(Math.random() * 500),
  },
  {
    last: Math.floor(Math.random() * 500),
    this: Math.floor(Math.random() * 500),
  },
  {
    last: Math.floor(Math.random() * 500),
    this: Math.floor(Math.random() * 500),
  },
  {
    last: Math.floor(Math.random() * 500),
    this: Math.floor(Math.random() * 500),
  },
  {
    last: Math.floor(Math.random() * 500),
    this: Math.floor(Math.random() * 500),
  },
  {
    last: Math.floor(Math.random() * 500),
    this: Math.floor(Math.random() * 500),
  },
  {
    last: Math.floor(Math.random() * 500),
    this: Math.floor(Math.random() * 500),
  },
  {
    last: Math.floor(Math.random() * 500),
    this: Math.floor(Math.random() * 500),
  },
  {
    last: Math.floor(Math.random() * 500),
    this: Math.floor(Math.random() * 500),
  },
  {
    last: Math.floor(Math.random() * 500),
    this: Math.floor(Math.random() * 500),
  },
  {
    last: Math.floor(Math.random() * 500),
    this: Math.floor(Math.random() * 500),
  },
  {
    last: Math.floor(Math.random() * 500),
  },
  {
    last: Math.floor(Math.random() * 500),
  },
  {
    last: Math.floor(Math.random() * 500),
  },
  {
    last: Math.floor(Math.random() * 500),
  },
  {
    last: Math.floor(Math.random() * 500),
  },
  {
    last: Math.floor(Math.random() * 500),
  },
  {
    last: Math.floor(Math.random() * 500),
  },
  {
    last: Math.floor(Math.random() * 500),
  },
]
const likes = [
  {
    last: Math.floor(Math.random() * 500),
    this: Math.floor(Math.random() * 500),
  },
  {
    last: Math.floor(Math.random() * 500),
    this: Math.floor(Math.random() * 500),
  },
  {
    last: Math.floor(Math.random() * 500),
    this: Math.floor(Math.random() * 500),
  },
  {
    last: Math.floor(Math.random() * 500),
    this: Math.floor(Math.random() * 500),
  },
  {
    last: Math.floor(Math.random() * 500),
    this: Math.floor(Math.random() * 500),
  },
  {
    last: Math.floor(Math.random() * 500),
    this: Math.floor(Math.random() * 500),
  },
  {
    last: Math.floor(Math.random() * 500),
    this: Math.floor(Math.random() * 500),
  },
  {
    last: Math.floor(Math.random() * 500),
    this: Math.floor(Math.random() * 500),
  },
  {
    last: Math.floor(Math.random() * 500),
    this: Math.floor(Math.random() * 500),
  },
  {
    last: Math.floor(Math.random() * 500),
    this: Math.floor(Math.random() * 500),
  },
  {
    last: Math.floor(Math.random() * 500),
    this: Math.floor(Math.random() * 500),
  },
  {
    last: Math.floor(Math.random() * 500),
    this: Math.floor(Math.random() * 500),
  },
  {
    last: Math.floor(Math.random() * 500),
    this: Math.floor(Math.random() * 500),
  },
  {
    last: Math.floor(Math.random() * 500),
    this: Math.floor(Math.random() * 500),
  },
  {
    last: Math.floor(Math.random() * 500),
    this: Math.floor(Math.random() * 500),
  },
  {
    last: Math.floor(Math.random() * 500),
    this: Math.floor(Math.random() * 500),
  },
  {
    last: Math.floor(Math.random() * 500),
    this: Math.floor(Math.random() * 500),
  },
  {
    last: Math.floor(Math.random() * 500),
    this: Math.floor(Math.random() * 500),
  },
  {
    last: Math.floor(Math.random() * 500),
    this: Math.floor(Math.random() * 500),
  },
  {
    last: Math.floor(Math.random() * 500),
    this: Math.floor(Math.random() * 500),
  },
  {
    last: Math.floor(Math.random() * 500),
    this: Math.floor(Math.random() * 500),
  },
  {
    last: Math.floor(Math.random() * 500),
    this: Math.floor(Math.random() * 500),
  },
  {
    last: Math.floor(Math.random() * 500),
  },
  {
    last: Math.floor(Math.random() * 500),
  },
  {
    last: Math.floor(Math.random() * 500),
  },
  {
    last: Math.floor(Math.random() * 500),
  },
  {
    last: Math.floor(Math.random() * 500),
  },
  {
    last: Math.floor(Math.random() * 500),
  },
  {
    last: Math.floor(Math.random() * 500),
  },
  {
    last: Math.floor(Math.random() * 500),
  },
]
const views = [
  {
    last: Math.floor(Math.random() * 500),
    this: Math.floor(Math.random() * 500),
  },
  {
    last: Math.floor(Math.random() * 500),
    this: Math.floor(Math.random() * 500),
  },
  {
    last: Math.floor(Math.random() * 500),
    this: Math.floor(Math.random() * 500),
  },
  {
    last: Math.floor(Math.random() * 500),
    this: Math.floor(Math.random() * 500),
  },
  {
    last: Math.floor(Math.random() * 500),
    this: Math.floor(Math.random() * 500),
  },
  {
    last: Math.floor(Math.random() * 500),
    this: Math.floor(Math.random() * 500),
  },
  {
    last: Math.floor(Math.random() * 500),
    this: Math.floor(Math.random() * 500),
  },
  {
    last: Math.floor(Math.random() * 500),
    this: Math.floor(Math.random() * 500),
  },
  {
    last: Math.floor(Math.random() * 500),
    this: Math.floor(Math.random() * 500),
  },
  {
    last: Math.floor(Math.random() * 500),
    this: Math.floor(Math.random() * 500),
  },
  {
    last: Math.floor(Math.random() * 500),
    this: Math.floor(Math.random() * 500),
  },
  {
    last: Math.floor(Math.random() * 500),
    this: Math.floor(Math.random() * 500),
  },
  {
    last: Math.floor(Math.random() * 500),
    this: Math.floor(Math.random() * 500),
  },
  {
    last: Math.floor(Math.random() * 500),
    this: Math.floor(Math.random() * 500),
  },
  {
    last: Math.floor(Math.random() * 500),
    this: Math.floor(Math.random() * 500),
  },
  {
    last: Math.floor(Math.random() * 500),
    this: Math.floor(Math.random() * 500),
  },
  {
    last: Math.floor(Math.random() * 500),
    this: Math.floor(Math.random() * 500),
  },
  {
    last: Math.floor(Math.random() * 500),
    this: Math.floor(Math.random() * 500),
  },
  {
    last: Math.floor(Math.random() * 500),
    this: Math.floor(Math.random() * 500),
  },
  {
    last: Math.floor(Math.random() * 500),
    this: Math.floor(Math.random() * 500),
  },
  {
    last: Math.floor(Math.random() * 500),
    this: Math.floor(Math.random() * 500),
  },
  {
    last: Math.floor(Math.random() * 500),
    this: Math.floor(Math.random() * 500),
  },
  {
    last: Math.floor(Math.random() * 500),
  },
  {
    last: Math.floor(Math.random() * 500),
  },
  {
    last: Math.floor(Math.random() * 500),
  },
  {
    last: Math.floor(Math.random() * 500),
  },
  {
    last: Math.floor(Math.random() * 500),
  },
  {
    last: Math.floor(Math.random() * 500),
  },
  {
    last: Math.floor(Math.random() * 500),
  },
  {
    last: Math.floor(Math.random() * 500),
  },
]

function AnalyticsProduct() {

  const navigate = useNavigate()
  const [date, setDate] = useState(currentMonth)

  return (
    <main className="p-4 sm:px-6 sm:py-0">
      <div className="mx-auto grid max-w-7xl flex-1 auto-rows-max gap-4">
        <div className="flex items-center gap-4">
          <Button type="button" variant="outline" size="icon" className="h-7 w-7" onClick={() => navigate(-1)}>
            <ChevronLeft className="h-4 w-4"/>
            <span className="sr-only">Back</span>
          </Button>
          <h1 className="w-full md:text-xl font-semibold tracking-tight truncate">
            Human Resources Assist
          </h1>
          <div className="ms-auto">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Calendar className="w-3.5 h-3.5 text-muted-foreground"/>
                  <span className="mx-1.5 capitalize">{date}</span>
                  <ChevronDown className="w-4 h-4 text-muted-foreground"/>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter Time Range</DropdownMenuLabel>
                <DropdownMenuSeparator/>
                <DropdownMenuRadioGroup value={date} onValueChange={setDate}>
                  <DropdownMenuRadioItem value="june">This month</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="may">May</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="april">April</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="march">March</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 items-start gap-4 md:gap-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between">
                <div>
                  <CardTitle className="md:mb-1 text-lg md:text-2xl">Sales</CardTitle>
                  <CardDescription>sales</CardDescription>
                </div>
                <div>
                  <CardTitle className="text-end font-extrabold md:text-3xl">4 122</CardTitle>
                  <CardDescription className="text-end text-xs md:text-sm">+20.1% from last month</CardDescription>
                </div>
              </div>
            </CardHeader>
            <ResponsiveContainer width="100%" height={100} className="-mx-1 -mt-6">
              <AreaChart data={sales}>
                <defs>
                  <linearGradient id="colorThis" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={`hsl(var(--primary))`} stopOpacity={0.6}/>
                    <stop offset="95%" stopColor={`hsl(var(--primary))`} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="rounded-lg border bg-background p-2 shadow-sm">
                          <div className={`grid gap-2`}>
                            <div className="flex flex-col">
                              <span className="text-[0.70rem] uppercase text-muted-foreground">May</span>
                              <span className="font-bold text-muted-foreground">{payload[0].value}</span>
                            </div>
                          </div>
                        </div>
                      )
                    }

                    return null
                  }}
                />
                <Area type="monotone" dataKey="this" stroke={`hsl(var(--primary))`} strokeWidth={3} fillOpacity={1}
                      fill="url(#colorThis)"/>
              </AreaChart>
            </ResponsiveContainer>
          </Card>
          <Card>
            <CardHeader>
              <div className="flex justify-between">
                <div>
                  <CardTitle className="md:mb-1 text-lg md:text-2xl">Likes</CardTitle>
                  <CardDescription>likes</CardDescription>
                </div>
                <div>
                  <CardTitle className="text-end font-extrabold md:text-3xl">4 122</CardTitle>
                  <CardDescription className="text-end text-xs md:text-sm">+20.1% from last month</CardDescription>
                </div>
              </div>
            </CardHeader>
            <ResponsiveContainer width="100%" height={100} className="-mx-1 -mt-6">
              <AreaChart data={likes}>
                <defs>
                  <linearGradient id="colorThis" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={`hsl(var(--primary))`} stopOpacity={0.6}/>
                    <stop offset="95%" stopColor={`hsl(var(--primary))`} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="rounded-lg border bg-background p-2 shadow-sm">
                          <div className={`grid gap-2`}>
                            <div className="flex flex-col">
                              <span className="text-[0.70rem] uppercase text-muted-foreground">May</span>
                              <span className="font-bold text-muted-foreground">{payload[0].value}</span>
                            </div>
                          </div>
                        </div>
                      )
                    }

                    return null
                  }}
                />
                <Area type="monotone" dataKey="this" stroke={`hsl(var(--primary))`} strokeWidth={3} fillOpacity={1}
                      fill="url(#colorThis)"/>
              </AreaChart>
            </ResponsiveContainer>
          </Card>
          <Card>
            <CardHeader>
              <div className="flex justify-between">
                <div>
                  <CardTitle className="md:mb-1 text-lg md:text-2xl">Views</CardTitle>
                  <CardDescription>views</CardDescription>
                </div>
                <div>
                  <CardTitle className="text-end font-extrabold md:text-3xl">4 122</CardTitle>
                  <CardDescription className="text-end text-xs md:text-sm">+20.1% from last month</CardDescription>
                </div>
              </div>
            </CardHeader>
            <ResponsiveContainer width="100%" height={100} className="-mx-1 -mt-6">
              <AreaChart data={views}>
                <defs>
                  <linearGradient id="colorThis" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={`hsl(var(--primary))`} stopOpacity={0.6}/>
                    <stop offset="95%" stopColor={`hsl(var(--primary))`} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="rounded-lg border bg-background p-2 shadow-sm">
                          <div className={`grid gap-2`}>
                            <div className="flex flex-col">
                              <span className="text-[0.70rem] uppercase text-muted-foreground">May</span>
                              <span className="font-bold text-muted-foreground">{payload[0].value}</span>
                            </div>
                          </div>
                        </div>
                      )
                    }

                    return null
                  }}
                />
                <Area type="monotone" dataKey="this" stroke={`hsl(var(--primary))`} strokeWidth={3} fillOpacity={1}
                      fill="url(#colorThis)"/>
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </div>
        <div className="grid lg:grid-cols-2 xl:grid-cols-5 items-start gap-4 md:gap-8 mt-4">
          <div className="xl:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>asd</CardTitle>
                <CardDescription>asd.</CardDescription>
              </CardHeader>
            </Card>
          </div>
          <div className="xl:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="md:mb-1">Earnings</CardTitle>
                    <CardDescription>Earnings on the product.</CardDescription>
                  </div>
                  <div>
                    <CardTitle className="font-extrabold md:text-3xl text-end">$241</CardTitle>
                    <CardDescription className="text-xs text-end">+20.1% from last month</CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}

export default AnalyticsProduct