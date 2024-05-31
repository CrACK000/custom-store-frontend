import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  File, Loader2,
  MoreHorizontal,
  PlusCircle, Search,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {Link} from "react-router-dom";
import {Input} from "@/components/ui/input";
import React, {useState} from "react";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {toast} from "@/components/ui/use-toast";
import axios from "axios";
import {
  AlertDialog,
  AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Fuse from 'fuse.js';
import {ToastAction} from "@/components/ui/toast";
import {useProducts} from "@/hooks/use-products";

const products: Product[] = useProducts();
const stages: { [key: string]: { title: string; desc: string; empty: string } } = {
  all: {
    title: 'Complete Product Portfolio',
    desc: 'View and manage your entire range of products here along with their sales performance metrics.',
    empty: 'No products have been added yet.',
  },
  active: {
    title: 'Active Product Line-up',
    desc: 'Monitor the sales performance of your active products and manage their details.',
    empty: 'No active products have been found.',
  },
  draft: {
    title: 'Product Drafts',
    desc: 'Here you can manage drafts of products that are about to enter or re-enter your portfolio.',
    empty: 'No product drafts are currently available.',
  },
  archived: {
    title: 'Archived Products',
    desc: 'Examine the details and previous sales performance of your archived products.',
    empty: 'No products have been archived yet.',
  }
};

function Products() {

  const [localProducts, setLocalProducts] = useState(products)
  const fuseOptions = { keys: ['name'], includeScore: true };
  const [searchInput, setSearchInput] = useState('');
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [deletedData, setDeletedData] = React.useState<Product>({
    _id: "",
    name: "",
    status: "Draft",
    created_at: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage,] = useState(6);

  const handleSearch = (value: string) => {
    setSearchInput(value);
    setCurrentPage(1);
  };
  const searchProducts = (products: Product[], query: string): Product[] => {
    if (!query) return products;

    const fuse = new Fuse(products, fuseOptions);
    const results = fuse.search(query);

    return results.map(result => result.item);
  };

  const filteredProducts: { [key: string]: Product[] } = {
    all: searchProducts(localProducts, searchInput),
    active: searchProducts(localProducts.filter(product => product.status === "Active"), searchInput),
    draft: searchProducts(localProducts.filter(product => product.status === "Draft"), searchInput),
    archived: searchProducts(localProducts.filter(product => product.status === "Archived"), searchInput)
  };

  const deleteFormSchema = z.object({
      name: z.string(),
    })
    .refine((data) => {
      return data.name === deletedData.name
    }, {
      message: "Text do not match.",
      path: ["name"]
    })

  const form = useForm<z.infer<typeof deleteFormSchema>>({
    resolver: zodResolver(deleteFormSchema),
    defaultValues: {
      name: "",
    },
  });

  const currentProducts = (stage: string) => filteredProducts[stage].slice((currentPage-1)*productsPerPage, currentPage*productsPerPage);

  const handleClickNext = (stage: string) => {
    if (currentPage < Math.ceil(filteredProducts[stage].length / productsPerPage)) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  }
  const handleClickPrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  }

  const onOpenDelete = (data: Product) => {
    setOpenDeleteDialog(true)
    setDeletedData(data)
  }
  const onCloseDelete = () => {
    setOpenDeleteDialog(false)
    setDeletedData({
      _id: "",
      name: "",
      status: "Draft",
      created_at: "",
    })
    form.setValue("name", "")
    form.clearErrors()
  }
  const onSubmitDelete = (values: z.infer<typeof deleteFormSchema>) => {

    setLoading(true)

    const api = "/"
    const data = deletedData
    const options = { withCredentials: true }

    axios.post(api, data, options)
      .then(response => {
        setLocalProducts(localProducts.filter(product => product._id !== deletedData._id))
        toast(response.data.message)
        onCloseDelete()
      })
      .catch(error => {
        toast({
          variant: "destructive",
          title: "Server Error",
          description: String(error),
          action: <ToastAction altText="Try again" onClick={() => form.handleSubmit(onSubmitDelete)()}>Try again</ToastAction>,
          duration: 5000,
        })
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const productElement = (product: Product, key: number) => {
    return (
      <TableRow key={key}>
        <TableCell className="hidden sm:table-cell">
          <img
            alt="Product image"
            className="aspect-square w-[64px] h-[64px] rounded-md object-cover"
            src={product.gallery?.data[product.gallery?.main].image}
          />
        </TableCell>
        <TableCell className="font-medium">
          {product.name}
        </TableCell>
        <TableCell>
          <Badge variant="outline">{product.status}</Badge>
        </TableCell>
        <TableCell className="hidden md:table-cell">
          {product.stocks?.length ? "$" + product.stocks[0].price : (
            <Badge variant="outline">undefined</Badge>
          )}
        </TableCell>
        <TableCell className="hidden md:table-cell">
          25
        </TableCell>
        <TableCell className="hidden md:table-cell">
          {product.created_at}
        </TableCell>
        <TableCell>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                aria-haspopup="true"
                size="icon"
                variant="ghost"
              >
                <MoreHorizontal className="h-4 w-4"/>
                <span className="sr-only">Toggle menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <Link to={`/products/edit/${product._id}`}>
                <DropdownMenuItem>Edit</DropdownMenuItem>
              </Link>
              <DropdownMenuItem onClick={() => onOpenDelete(product)}>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      </TableRow>
    )
  }

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <Tabs defaultValue="all">
        <div className="flex items-center">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="draft">Draft</TabsTrigger>
            <TabsTrigger value="archived">Archived</TabsTrigger>
          </TabsList>
          <div className="ml-auto flex items-center gap-2">
            <Button size="sm" variant="outline" className="h-8 gap-1">
              <File className="h-3.5 w-3.5"/>
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Export
                  </span>
            </Button>
            <Link to="/products/add">
              <Button size="sm" className="h-8 gap-1">
                <PlusCircle className="h-3.5 w-3.5"/>
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Add Product
                  </span>
              </Button>
            </Link>
          </div>
        </div>
        {Object.keys(stages).map((stage, key) => (
          <TabsContent key={key} value={stage}>
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row gap-4 justify-between">
                  <div>
                    <CardTitle>{stages[stage].title}</CardTitle>
                    <CardDescription>{stages[stage].desc}</CardDescription>
                  </div>
                  <div>
                    <div className="relative">
                      <Search className="absolute top-1/2 -translate-y-1/2 left-2.5 w-4 h-4 text-muted-foreground" />
                      <Input
                        type="search"
                        className="ps-8"
                        placeholder="Search product"
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
                      <TableHead className="hidden w-[100px] sm:table-cell">
                        <span className="sr-only">Image</span>
                      </TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="hidden md:table-cell">
                        Price
                      </TableHead>
                      <TableHead className="hidden md:table-cell">
                        Total Sales
                      </TableHead>
                      <TableHead className="hidden md:table-cell">
                        Created at
                      </TableHead>
                      <TableHead>
                        <span className="sr-only">Actions</span>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentProducts(stage).length > 0 ? (
                      currentProducts(stage).map((product, key) => productElement(product, key))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center">
                          {stages[stage].empty}
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter className="flex items-center justify-between">
                <div className="text-xs text-muted-foreground">
                  Showing <strong>{(currentPage - 1) * productsPerPage + 1}-{currentPage * productsPerPage}</strong> of <strong>{filteredProducts[stage].length}</strong> products
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
                    disabled={currentPage === Math.ceil(filteredProducts[stage].length/productsPerPage) || filteredProducts[stage].length === 0}
                  >
                    Next
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
      <AlertDialog open={openDeleteDialog}>
        <AlertDialogContent className="sm:max-w-[425px]">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Product</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete the product frontend?
              All data associated with this product will be removed forever.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmitDelete)} className="space-y-6">
              <FormField
                control={form.control} name="name"
                render={({field}) => (
                  <FormItem>
                    <FormLabel className="font-normal">Type <b className="font-extrabold">{deletedData.name}</b> to confirm</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
              <AlertDialogFooter>
                <Button type="reset" variant="ghost" onClick={() => onCloseDelete()}>Cancel</Button>
                <Button type="submit" variant="destructive" disabled={!form.formState.isValid || loading}>
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Delete
                </Button>
              </AlertDialogFooter>
            </form>
          </Form>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  )
}

export default Products