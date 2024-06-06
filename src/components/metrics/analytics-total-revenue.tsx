import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import React, {FC, useState} from "react";
import {Area, AreaChart, ResponsiveContainer, Tooltip} from "recharts";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {Calendar, ChevronDown} from "lucide-react";

const data = [
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
const currentMonth = new Date().toLocaleString('en', { month: 'long' }).toLowerCase()

const AnalyticsTotalRevenue: FC<AnalyticsCardProps> = ({ period = currentMonth, width = "100%", height = 175 }) => {

  const [date, setDate] = useState(period)

  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between">
        <div className="space-y-2">
          <CardTitle className="text-lg font-medium">
            Total Revenue
          </CardTitle>
          <div>
            <div className="text-xl md:text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </div>
        </div>
        <div>
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
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width={width} height={height}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorThis" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={`hsl(var(--primary))`} stopOpacity={0.7}/>
                <stop offset="95%" stopColor={`hsl(var(--primary))`} stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorLast" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={`hsl(var(--primary))`} stopOpacity={0.7}/>
                <stop offset="95%" stopColor={`hsl(var(--primary))`} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="rounded-lg border bg-background p-2 shadow-sm">
                      <div className={`grid gap-2 ${payload[1] && "grid-cols-2"}`}>
                        <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              May
                            </span>
                          <span className="font-bold text-muted-foreground">
                              {payload[0].value}
                            </span>
                        </div>
                        {
                          payload[1] ? (
                            <div className="flex flex-col">
                              <span className="text-[0.70rem] uppercase text-muted-foreground">
                                June
                              </span>
                              <span className="font-bold">
                                {payload[1].value}
                              </span>
                            </div>
                          ) : ""
                        }
                      </div>
                    </div>
                  )
                }

                return null
              }}
            />
            <Area type="monotone" dataKey="this" stroke={`hsl(var(--primary))`} strokeWidth={3} fillOpacity={1}
                  fill="url(#colorThis)"/>
            <Area type="monotone" dataKey="last" stroke={`hsl(var(--primary))`} strokeWidth={3} opacity={0.15}
                  fill="url(#colorLast)"/>
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

export default AnalyticsTotalRevenue