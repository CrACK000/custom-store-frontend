import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import {Progress} from "@/components/ui/progress"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuPortal,
  DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import {File, ListFilter, Search, X} from "lucide-react"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table"
import {Badge} from "@/components/ui/badge"
import React, {useState} from "react";
import {Link} from "react-router-dom";
import Fuse from "fuse.js";
import OrderItem from "@/routes/order-item";
import {Input} from "@/components/ui/input";
import {exportOrdersList} from "@/hooks/use-export-data";
import {useOrders} from "@/hooks/use-orders";

const orders: Order[] = useOrders();
const stages: { [key: string]: { title: string; desc: string; empty: string } } = {
  week: {
    title: 'Orders',
    desc: 'Orders for this week.',
    empty: 'No orders have been created in this week.',
  },
  month: {
    title: 'Orders',
    desc: 'Orders for this month.',
    empty: 'No orders have been created in this month.',
  },
  year: {
    title: 'Orders',
    desc: 'Orders for this year.',
    empty: 'No orders have been created in this year.',
  },
  all: {
    title: 'All Orders',
    desc: 'A comprehensive list of all orders.',
    empty: 'No orders have been created.',
  }
};

function Orders() {

  const now = new Date();
  const startOfWeek = new Date(now.setDate(now.getDate() - 7));
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOfYear = new Date(now.getFullYear(), 0, 1);
  const fuseOptions = {
    keys: [
      'customer.name',
      'customer.surname',
      'customer.email',
      'shipping_data.customer.name',
      'shipping_data.customer.surname',
      'shipping_data.customer.email'
    ],
    includeScore: true
  };
  const [localOrders, setLocalOrders] = useState<Order[]>(orders)
  const [searchInput, setSearchInput] = useState('');
  const [selectedStage, selectStage] = useState("week")
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage,] = useState(5);
  const [filterStatus, setFilterStatus] = useState<string | null>(null)

  const handleSearch = (value: string) => {
    setSearchInput(value);
    setCurrentPage(1);
  };
  const searchProducts = (products: Order[], query: string): Order[] => {
    if (!query) return products;

    const fuse = new Fuse(products, fuseOptions);
    const results = fuse.search(query);

    return results.map(result => result.item);
  };

  const filteredOrders: { [key: string]: Order[] } = {
    week: searchProducts(localOrders.filter(order => new Date(order.created_at) >= startOfWeek), searchInput),
    month: searchProducts(localOrders.filter(order => new Date(order.created_at) >= startOfMonth), searchInput),
    year: searchProducts(localOrders.filter(order => new Date(order.created_at) >= startOfYear), searchInput),
    all: searchProducts(localOrders, searchInput)
  };
  const currentOrders = (stage: string) => filteredOrders[stage].filter(order => filterStatus ? order.status === filterStatus : true);

  const [selectedOrder, selectOrder] = useState(filteredOrders[selectedStage][0] ? filteredOrders[selectedStage][0]._id : localOrders[0]._id)
  const changeStage = (stage: string) => {
    setCurrentPage(1)
    selectStage(stage)
  }

  const nextOrder = () => {
    selectOrder(currentOrders(selectedStage)[(currentOrders(selectedStage).findIndex(order => order._id === selectedOrder) + 1) % currentOrders(selectedStage).length]._id)
  }
  const prevOrder = () => {
    selectOrder(currentOrders(selectedStage)[(currentOrders(selectedStage).findIndex(order => order._id === selectedOrder) - 1 + currentOrders(selectedStage).length) % currentOrders(selectedStage).length]._id)
  }

  const handleClickNext = (stage: string) => {
    if (currentPage < Math.ceil(filteredOrders[stage].length / productsPerPage)) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  }
  const handleClickPrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  }

  const total = (order: Order) => {
    const subtotal = order.products.reduce((acc, product) => acc + product.price * product.quantity, 0)
    return subtotal + order.shipping_price + 25.99;
  }

  const getLastFourMonths = () => {
    const months = [];
    const now = new Date();
    for (let i = 1; i < 5; i++) {
      const month = new Date(now.getFullYear(), now.getMonth() - i, 1);
      months.push({
            name: month.toLocaleString('en', { month: 'long' }),
            value: (month.getMonth() + 1),
          });
    }
    return months;
  };

  const getYears = () => {
    const years = new Set<number>();

    localOrders.forEach(order => {
      const orderDate = new Date(order.created_at);
      const year = orderDate.getFullYear();
      years.add(year);
    });

    return Array.from(years).sort((a, b) => a - b); // Sort the years in ascending order
  };

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
      <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
          <Card className="sm:col-span-2">
            <CardHeader className="pb-3">
              <CardTitle>Your Orders</CardTitle>
              <CardDescription className="max-w-lg text-balance leading-relaxed">
                Introducing Our Dynamic Orders Dashboard for Seamless
                Management and Insightful Analysis.
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Link to="create">
                <Button>Create New Order</Button>
              </Link>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>This Week</CardDescription>
              <CardTitle className="text-4xl">$1,329</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">
                +25% from last week
              </div>
            </CardContent>
            <CardFooter>
              <Progress value={25} aria-label="25% increase"/>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>This Month</CardDescription>
              <CardTitle className="text-4xl">$5,329</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">
                +10% from last month
              </div>
            </CardContent>
            <CardFooter>
              <Progress value={12} aria-label="12% increase"/>
            </CardFooter>
          </Card>
        </div>
        <Tabs defaultValue="week">
          <div className="flex items-center">
            <TabsList>
              <TabsTrigger value="week" onClick={() => changeStage("week")}>Week</TabsTrigger>
              <TabsTrigger value="month" onClick={() => changeStage("month")}>Month</TabsTrigger>
              <TabsTrigger value="year" onClick={() => changeStage("year")}>Year</TabsTrigger>
              <TabsTrigger value="all" onClick={() => changeStage("all")}>All</TabsTrigger>
            </TabsList>
            <div className="ml-auto flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 gap-1 text-sm"
                  >
                    <ListFilter className="h-3.5 w-3.5"/>
                    <span className="sr-only sm:not-sr-only">{filterStatus !== null ? filterStatus : "Filter"}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>
                    <div className="flex justify-between items-center">
                      <div>Filter by</div>
                      {filterStatus && (
                        <Button variant="ghost" className="w-5 h-5 p-0.5" onClick={() => setFilterStatus(null)}>
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator/>
                  <DropdownMenuCheckboxItem
                    checked={filterStatus === "Fulfilled"}
                    onClick={() => setFilterStatus("Fulfilled")}
                  >
                    Fulfilled
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={filterStatus === "Approved"}
                    onClick={() => setFilterStatus("Approved")}
                  >
                    Approved
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={filterStatus === "Pending"}
                    onClick={() => setFilterStatus("Pending")}
                  >
                    Pending
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={filterStatus === "Declined"}
                    onClick={() => setFilterStatus("Declined")}
                  >
                    Declined
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={filterStatus === "Refunded"}
                    onClick={() => setFilterStatus("Refunded")}
                  >
                    Refunded
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-7 gap-1 text-sm"
                  >
                    <File className="h-3.5 w-3.5"/>
                    <span className="sr-only sm:not-sr-only">Export</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem
                    onClick={() => exportOrdersList(currentOrders("all"), stages["all"].desc)}
                  >
                    All
                  </DropdownMenuItem>
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                      <span>Select month</span>
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent>
                        <DropdownMenuLabel>Last 4 month</DropdownMenuLabel>
                        {getLastFourMonths().map((month, key) => (
                          <DropdownMenuItem
                            key={key}
                            className="capitalize"
                            onClick={() => exportOrdersList(filteredOrders["all"], `List of orders per month: ${month.name}`, { type: "month", value: month.value })}
                          >
                            {month.name}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                      <span>Select year</span>
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent>
                        {getYears().map((year, key) => (
                          <DropdownMenuItem
                            key={key}
                            className="capitalize"
                            onClick={() => exportOrdersList(filteredOrders["all"], `List of orders per year: ${year}`, { type: "year", value: year })}
                          >
                            {year}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>
                  <DropdownMenuItem
                    onClick={() => exportOrdersList(currentOrders(selectedStage), stages[selectedStage].desc)}
                  >
                    Current list
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          {Object.keys(stages).map((stage, key) => (
            <TabsContent key={key} value={stage}>
              <Card>
                <CardHeader className="px-7">
                  <div className="flex flex-col md:flex-row gap-4 justify-between">
                    <div>
                      <CardTitle>{stages[stage].title}</CardTitle>
                      <CardDescription>{stages[stage].desc}</CardDescription>
                    </div>
                    <div>
                      <div className="relative">
                        <Search className="absolute top-1/2 -translate-y-1/2 left-2.5 w-4 h-4 text-muted-foreground"/>
                        <Input
                          type="search"
                          className="ps-8"
                          placeholder="Search order"
                          value={searchInput}
                          onChange={e => handleSearch(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                  <TableHeader>
                      <TableRow>
                        <TableHead>Customer</TableHead>
                        <TableHead className="hidden sm:table-cell">
                          Type
                        </TableHead>
                        <TableHead className="hidden sm:table-cell">
                          Status
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          Date
                        </TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {currentOrders(stage).length > 0 ? (
                        currentOrders(stage).map((order, key) => (
                          <TableRow
                            key={key}
                            className={`cursor-pointer ${order._id === selectedOrder ? "bg-accent" : ""}`}
                            onClick={() => selectOrder(order._id)}
                          >
                            <TableCell>
                              <div className="font-medium">{order.customer ? order.customer.name : order.shipping_data.customer.name} {order.customer ? order.customer.surname : order.shipping_data.customer.surname}</div>
                              <div className="hidden text-sm text-muted-foreground md:inline">
                                {order.customer ? order.customer.email : order.shipping_data.customer.email}
                              </div>
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">
                              {order.type}
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">
                              <Badge className="text-xs" variant="secondary">
                                {order.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              {order.created_at}
                            </TableCell>
                            <TableCell className="text-right">${total(order).toFixed(2)}</TableCell>
                          </TableRow>
                        )).slice((currentPage-1)*productsPerPage, currentPage*productsPerPage)
                      ) : (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center">
                            {stages[stage].empty}
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter className="flex items-center justify-between">
                  <div className="text-xs text-muted-foreground">
                    Showing <strong>{(currentPage - 1) * productsPerPage + 1}-{currentPage * productsPerPage}</strong> of <strong>{currentOrders(stage).length}</strong> products
                  </div>
                  <div className="space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleClickPrevious}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleClickNext(stage)}
                      disabled={currentPage === Math.ceil(currentOrders(stage).length/productsPerPage) || currentOrders(stage).length === 0}
                    >
                      Next
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
      <div>
        <OrderItem
          orderId={selectedOrder}
          nextOrder={nextOrder}
          prevOrder={prevOrder}
        />
      </div>
    </main>
  )
}

export default Orders