import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip
} from "recharts";
import React, {FC, useState} from "react";
import {Button} from "@/components/ui/button";
import {Link} from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem,
  DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Calendar, ChevronDown} from "lucide-react";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";

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

const AnalyticsOrdersCard: FC<AnalyticsCardProps> = ({ period = currentMonth, width = "100%", height = 175 }) => {

  const [date, setDate] = useState(period)

  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between">
        <div className="space-y-2">
          <CardTitle>Orders</CardTitle>
          <CardDescription>
            Order statistics and performance analysis.
          </CardDescription>
        </div>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Calendar className="w-3.5 h-3.5 text-muted-foreground"/>
                <span className="mx-1.5 capitalize">{date}</span>
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter Time Range</DropdownMenuLabel>
              <DropdownMenuSeparator />
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
        <div className="grid grid-cols-3 gap-2 md:gap-6 mb-6">
          <div className="border-b border-secondary px-2 pb-2">
            <div className="text-xl md:text-3xl font-extrabold md:mb-1">459</div>
            <div className="text-muted-foreground text-xs font-medium uppercase">Fulfilled</div>
          </div>
          <div className="border-b border-secondary px-2 pb-2">
            <div className="text-xl md:text-3xl font-extrabold md:mb-1">120</div>
            <div className="text-muted-foreground text-xs font-medium uppercase">Declined</div>
          </div>
          <div className="border-b border-secondary px-2 pb-2">
            <div className="text-xl md:text-3xl font-extrabold md:mb-1">3</div>
            <div className="text-muted-foreground text-xs font-medium uppercase">Refunded</div>
          </div>
        </div>
        <div>
          <div className="text-3xl md:text-4xl font-extrabold">573</div>
          <p className="text-xs text-muted-foreground">
            +20.1% from last month
          </p>
        </div>
        <ResponsiveContainer width={width} height={height}>
          <AreaChart data={data}>
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
            <Tooltip
              content={({active, payload}) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="rounded-lg border bg-background p-2 shadow-sm">
                      <div className={`grid gap-2 ${payload[1] && "grid-cols-2"}`}>
                        <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              Last month
                            </span>
                          <span className="font-bold text-muted-foreground">
                              {payload[0].value}
                            </span>
                        </div>
                        {
                          payload[1] ? (
                            <div className="flex flex-col">
                              <span className="text-[0.70rem] uppercase text-muted-foreground">
                                This month
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

export default AnalyticsOrdersCard