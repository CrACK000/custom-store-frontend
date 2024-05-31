import {Button} from "@/components/ui/button";
import {Table, TableBody, TableCell, TableRow} from "@/components/ui/table";
import {Calendar, CircleCheckBig, CreditCard} from "lucide-react";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";

function SettingsBilling() {
  return (
    <div className="grid gap-6 max-w-3xl">
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Payment method
            </CardTitle>
            <Button variant="link" size="sm" className="ms-auto">Change</Button>
          </CardHeader>
          <CardContent className="flex items-end">
            <div className="text-2xl font-bold">PayPal</div>
            <div className="ms-auto text-sm text-muted-foreground">Card ending in 7883</div>
          </CardContent>
        </Card>
        <Card className="flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Next payment
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground"/>
          </CardHeader>
          <CardContent className="mt-auto">
            <div className="text-2xl font-bold">May 5, 2024</div>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Billing History</CardTitle>
          <CardDescription>
            Overview of billing for the application.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>
                  <div className="flex items-center gap-x-2">
                    <CircleCheckBig className="text-green-500 w-4 h-4"/>
                    <div className="font-medium">Apr 5, 2024</div>
                  </div>
                </TableCell>
                <TableCell>Using the application</TableCell>
                <TableCell>$ 15.48</TableCell>
                <TableCell className="text-right">
                  <Button variant="link">View</Button>
                  <Button variant="link">Refund</Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <div className="flex items-center gap-x-2">
                    <CircleCheckBig className="text-green-500 w-4 h-4"/>
                    <div className="font-medium">Mar 5, 2024</div>
                  </div>
                </TableCell>
                <TableCell>Using the application</TableCell>
                <TableCell>$ 11.72</TableCell>
                <TableCell className="text-right">
                  <Button variant="link">View</Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

export default SettingsBilling