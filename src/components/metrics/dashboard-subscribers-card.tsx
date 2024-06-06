import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Line, LineChart, ResponsiveContainer, Tooltip} from "recharts";
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

const DashboardSubscribersCard = () => {

  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between">
        <div className="space-y-2">
          <CardTitle>Subscribers</CardTitle>
          <CardDescription>+20.1% from last month</CardDescription>
        </div>
        <div>
          <Button variant="outline" size="sm" className="text-xs" asChild>
            <Link to="/analytics/subscribers">
              View More
            </Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={175}>
          <LineChart data={data}>
            <Line
              type="monotone"
              strokeWidth={4}
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
              strokeWidth={4}
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

export default DashboardSubscribersCard