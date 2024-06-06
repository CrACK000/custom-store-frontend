import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip
} from "recharts";
import {Button} from "@/components/ui/button";
import {Link} from "react-router-dom";

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

const DashboardOrdersCard = () => {

  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between">
        <div className="space-y-2">
          <CardTitle>Orders</CardTitle>
          <CardDescription>
            +20.1% from last month
          </CardDescription>
        </div>
        <Button variant="outline" size="sm" className="text-xs" asChild>
          <Link to="/analytics/orders">
            View More
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={175}>
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

export default DashboardOrdersCard