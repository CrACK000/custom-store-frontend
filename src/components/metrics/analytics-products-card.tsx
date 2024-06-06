import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState
} from "@tanstack/react-table";
import {Button} from "@/components/ui/button";
import React from "react";
import {ArrowUpDown, BarChart2, Eye, MoveDown, MoveUp, Package, Settings, ThumbsUp} from "lucide-react";
import {Link} from "react-router-dom";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";

const data: StatsProductsTable[] = [
  {
    id: "ASD32AQS",
    product: "Human Resources Assistant IV",
    views: 316,
    sales: 4020,
    likes: 2334,
  },
  {
    id: "ASD32AQS",
    product: "Account Coordinator",
    views: 242,
    sales: 2345,
    likes: 23,
  },
  {
    id: "ASD32AQS",
    product: "Account Representative III",
    views: 837,
    sales: 678,
    likes: 4674,
  },
  {
    id: "ASD32AQS",
    product: "Assistant Professor",
    views: 874,
    sales: 98,
    likes: 764,
  },
  {
    id: "ASD32AQS",
    product: "Database Administrator IV",
    views: 721,
    sales: 543,
    likes: 2945,
  },
  {
    id: "ASD32AQS",
    product: "Human Resources Assistant IV",
    views: 316,
    sales: 4020,
    likes: 2334,
  },
]

export type StatsProductsTable = {
  id: string
  product: string
  views: number;
  sales: number;
  likes: number;
}

const columns: ColumnDef<StatsProductsTable>[] = [
  {
    accessorKey: "product",
    header: () => <div className="font-medium text-xs uppercase">Product</div>,
    cell: ({ row }) => (
      <Button variant="link" size="sm" className="px-0">
        <div className="w-44 md:w-auto truncate text-start">
          {row.getValue("product")}
        </div>
      </Button>
    ),
  },
  {
    accessorKey: "views",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="uppercase text-xs float-end px-1.5"
        >
          <div className="flex">
            Views
            {column.getIsSorted() && (column.getIsSorted() === "desc" ? (
              <MoveUp className="ml-0.5 h-3.5 w-3.5" />
            ) : (
              <MoveDown className="ml-0.5 h-3.5 w-3.5" />
            ))}
          </div>
        </Button>
      )
    },
    cell: ({ row }) => <div className="text-end font-bold text-xs md:text-sm">{row.getValue("views")}</div>,
  },
  {
    accessorKey: "sales",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="uppercase text-xs float-end px-1.5"
        >
          <div className="flex">
            Sales
            {column.getIsSorted() && (column.getIsSorted() === "desc" ? (
              <MoveUp className="ml-0.5 h-3.5 w-3.5" />
            ) : (
              <MoveDown className="ml-0.5 h-3.5 w-3.5" />
            ))}
          </div>
        </Button>
      )
    },
    cell: ({row}) => <div className="text-end font-bold text-xs md:text-sm">{row.getValue("sales")}</div>,
  },
  {
    accessorKey: "likes",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="uppercase text-xs float-end px-1.5"
        >
          <div className="flex">
            Likes
            {column.getIsSorted() && (column.getIsSorted() === "desc" ? (
              <MoveUp className="ml-0.5 h-3.5 w-3.5" />
            ) : (
              <MoveDown className="ml-0.5 h-3.5 w-3.5" />
            ))}
          </div>
        </Button>
      )
    },
    cell: ({ row }) => <div className="text-end font-bold text-xs md:text-sm">{row.getValue("likes")}</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const product = row.original

      return (
        <div className="flex gap-x-2 justify-end">
          <TooltipProvider>
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" className="text-xs w-8 h-8" asChild>
                  <Link to={`/analytics/product/${product.id}`}>
                    <BarChart2 className="w-4 h-4"/>
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>View Stats</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" className="text-xs w-8 h-8" asChild>
                  <Link to={`/products/edit/${product.id}`}>
                    <Settings className="w-4 h-4"/>
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Edit product</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      )
    },
  },
]

function AnalyticsProductsCard() {

  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    initialState: {
      pagination: {
        pageSize: 8
      }
    }
  })

  return (
    <Card>
      <CardHeader className="border-b border-secondary">
        <div className="flex">
          <div className="space-y-1">
            <CardTitle>All Products</CardTitle>
            <CardDescription>Statistics of your products.</CardDescription>
          </div>
          <div className="relative overflow-hidden ms-auto -my-6 -me-6 p-6 w-44 md:w-80 lg:w-44 xl:w-96">
            <div className="absolute inset-0">
              <div className="w-full h-full bg-cover bg-left bg-[url(/public/chart-light.svg)] dark:bg-[url(/public/chart-dark.svg)]"></div>
            </div>
            <div className="grid gap-1 justify-end">
              <div className="flex items-center gap-2">
                <dt className="text-sm font-medium">3 320</dt>
                <dd className="text-xs text-muted-foreground font-medium">VIEWS</dd>
              </div>
              <div className="flex items-center gap-2">
                <dt className="text-sm font-medium">3 320</dt>
                <dd className="text-xs text-muted-foreground font-medium">SALES</dd>
              </div>
              <div className="flex items-center gap-2">
                <dt className="text-sm font-medium">3 320</dt>
                <dd className="text-xs text-muted-foreground font-medium">LIKES</dd>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-0">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <div className="flex items-center space-x-2 w-full">
          <div className="ms-auto space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}

export default AnalyticsProductsCard