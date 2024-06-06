import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import React from "react";
import {Progress} from "@/components/ui/progress";
import {Button} from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetOverlay,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";
import {ScrollArea} from "@/components/ui/scroll-area";

type DataItem = {
  country: string;
  value: number;
};

const data: DataItem[] = [
  { country: "Kazakhstan", value: 3 },
  { country: "Russia", value: 5 },
  { country: "China", value: 12 },
  { country: "Slovakia", value: 9411 },
  { country: "France", value: 156 },
  { country: "Other", value: 300 },
  { country: "Czech", value: 12241 },
  { country: "Hungary", value: 441 },
  { country: "Brazil", value: 124 },
  { country: "Nigeria", value: 60 },
  { country: "Nigeria", value: 60 },
  { country: "Nigeria", value: 60 },
  { country: "Sweden", value: 200 },
  { country: "Poland", value: 912 }
];

const AnalyticsOrdersCountriesCard = () => {

  const sum = data.reduce((sum, item) => sum + item.value, 0)
  const sortedData = [...data].sort((a, b) => b.value - a.value)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Countries</CardTitle>
        <CardDescription>Countries with the largest number of orders.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col divide-y divide-secondary">
          {sortedData.map((country, key) => {
            const progress = (country.value / sum) * 100
            return (
              <div key={key} className="py-3 space-y-2">
                <div className="flex justify-between px-2">
                  <span className="font-medium">{country.country}</span>
                  <span className="font-bold">{progress.toFixed(1)}%</span>
                </div>
                <div className="px-2">
                  <Progress value={progress} className="h-2"/>
                </div>
              </div>
            )
          }).slice(0, 4)}
        </div>
      </CardContent>
      <CardFooter>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="sm" className="mx-auto">
              Show all ({data.length})
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Countries</SheetTitle>
              <SheetDescription className="line-clamp-1">
                Top countries subscribing to the channel.
              </SheetDescription>
            </SheetHeader>
            <ScrollArea className="h-[calc(100vh_-_theme(spacing.20))] -mx-6 px-6">
              <div className="flex flex-col divide-y divide-secondary my-2">
                {sortedData.map((country, key) => {
                  const progress = (country.value / sum) * 100
                  return (
                    <div key={key} className="py-3 space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium">{country.country}</span>
                        <span className="font-bold">{progress.toFixed(1)}%</span>
                      </div>
                      <div>
                        <Progress value={progress} className="h-2" />
                      </div>
                    </div>
                  )
                })}
              </div>
            </ScrollArea>
          </SheetContent>
        </Sheet>
      </CardFooter>
    </Card>
  )
}

export default AnalyticsOrdersCountriesCard