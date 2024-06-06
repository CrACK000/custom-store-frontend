import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Line, LineChart, ResponsiveContainer, Tooltip} from "recharts";
import React, {FC, useState} from "react";
import {Button} from "@/components/ui/button";
import {Link} from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
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

const AnalyticsSubscribersCard: FC<AnalyticsCardProps> = ({ period = currentMonth, width = "100%", height = 175 }) => {

  const [date, setDate] = useState(period)

  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between">
        <div className="space-y-2">
          <CardTitle className="text-lg font-medium">
            Subscribers
          </CardTitle>
          <div>
            <div className="text-2xl md:text-3xl font-extrabold">1 233</div>
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
        <ResponsiveContainer width={width} height={height}>
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 10,
              left: 10,
              bottom: 0,
            }}
          >
            <Tooltip
              content={({ active, payload }) => {
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
            <Line
              type="monotone"
              strokeWidth={2}
              dataKey="last"
              activeDot={{
                r: 6,
                style: {fill: "var(--theme-primary)", opacity: 0.25 },
              }}
              style={
                {
                  stroke: "var(--theme-primary)",
                  opacity: 0.25,
                  "--theme-primary": `hsl(var(--primary))`,
                } as React.CSSProperties
              }
            />
            <Line
              type="monotone"
              dataKey="this"
              strokeWidth={2}
              activeDot={{
                r: 8,
                style: { fill: "var(--theme-primary)" },
              }}
              style={
                {
                  stroke: "var(--theme-primary)",
                  "--theme-primary": `hsl(var(--primary))`,
                } as React.CSSProperties
              }
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

export default AnalyticsSubscribersCard