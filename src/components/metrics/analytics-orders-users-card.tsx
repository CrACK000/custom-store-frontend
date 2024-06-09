import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Progress} from "@/components/ui/progress";
import React, {useState} from "react";
import {ChevronDown, Trophy} from "lucide-react";
import users from "@/data/users.json"



const AnalyticsOrdersUsersCard = () => {

  const [top, setTop] = useState("5")

  return (
    <Card>
      <CardHeader>
        <div className=" flex justify-between">
          <div className="space-y-1">
            <CardTitle>Customers</CardTitle>
            <CardDescription>Customers with the most orders.</CardDescription>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Trophy className="w-3.5 h-3.5 text-muted-foreground" />
                <span className="mx-1.5 capitalize">Top {top}</span>
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuRadioGroup value={top} onValueChange={setTop}>
                <DropdownMenuRadioItem value="5">Top 5</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="10">Top 10</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="15">Top 15</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <span className="sr-only">Avatar</span>
              </TableHead>
              <TableHead className="w-full text-xs uppercase">Customer</TableHead>
              <TableHead className="text-xs uppercase">Orders</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user, key) => (
              <TableRow key={key}>
                <TableCell>
                  <Avatar>
                    <AvatarImage src=""/>
                    <AvatarFallback className="font-bold">{(++key)}.</AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell>
                  <div className="w-full space-y-1.5">
                    <div className="font-bold">Sofia Davis</div>
                    <Progress value={55} className="h-1"/>
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <span className="font-bold text-lg">32</span>
                </TableCell>
              </TableRow>
            )).slice(0, Number(top))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

export default AnalyticsOrdersUsersCard