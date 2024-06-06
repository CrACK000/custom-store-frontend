import {
  ChevronLeft, Euro, Loader2,
  PlusCircle, Star,
  Upload, X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent, SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import {useMatch, useNavigate, useParams} from "react-router-dom";
import {useFieldArray, useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {toast} from "@/components/ui/use-toast";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";
import {ToastAction} from "@/components/ui/toast";
import * as constants from "node:constants";
import {Badge} from "@/components/ui/badge";
import {useOrder} from "@/hooks/use-orders";
import {useProduct} from "@/hooks/use-products";

// fetch data
const categories: Category[] = [
  { _id: "2SD12", name: "Clothing" },
  { _id: "s44G2", name: "Electronics" },
  { _id: "90D1S", name: "Accessories" },
  { _id: "2WEDD", name: "Other" },
]
const subcategories: Category[] = [
  { _id: "14AFD", category_id: "2SD12", name: "T-Shirts" },
  { _id: "52AFG", category_id: "s44G2", name: "Hoodies" },
  { _id: "78HGG", category_id: "90D1S", name: "Sweatshirts" },
]

// form schema
const FormSchema = z.object({
  name: z.string(),
  description: z.string(),
  status: z.enum(["Draft","Active","Archived"], {
    message: "Status must be selected."
  }),
  category: z.string().optional(),
  subcategory: z.string(),
  stocks: z.array(z.object({
    sku: z.string(),
    stock: z.number().optional(),
    price: z.number().optional(),
    size: z.enum(["xs", "s", "m", "l", "xl", "xxl"], {
      message: "Please select a size.",
    })
  }))
})
  .refine(data => (data.status === 'Draft' || (data.name && data.name.length >= 2)),
    {
      message: 'Name must be at least 2 characters.',
      path: ['name']
    }
  )
  .refine(data => !(data.status !== 'Draft' && !data.category),
    {
      message: 'Please select a category.',
      path: ['category']
    }
  );

function ProductActions() {

  const navigate = useNavigate()
  let formData = new FormData()
  const { productId } = useParams();
  const product = useProduct(productId ?? "none");
  const isEditMode = product !== null;

  // vars
  const [files, setFiles] = useState<Gallery[]>(product?.gallery?.data ?? [])
  const [mainFile, setMainFile] = useState<number | undefined>(product?.gallery?.main ?? 0)
  const [submitAction, setSubmitAction] = useState<TypesAction>(isEditMode ? "save" : "add");
  const [triggerSubmit, setTriggerSubmit] = useState(false);
  const [isDirty, setIsDirty] = useState(false)
  const [loading, useLoading] = useState(false)

  // form
  const formValues = {
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: product?.name ?? "",
      description: product?.description ?? "",
      status: product?.status ?? undefined,
      category: product?.categories ? product?.categories[0] : undefined,
      subcategory: product?.categories ? product?.categories[1] : "",
      stocks: product?.stocks ?? []
    },
  }
  const form = useForm<z.infer<typeof FormSchema>>(formValues)
  const {fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'stocks',
  });

  useEffect(() => {
    if (form.formState.isDirty) {
      setIsDirty(true);
    } else {
      setIsDirty(false);
    }
  }, [form.formState.isDirty]);
  useEffect(() => {
    if (triggerSubmit) {
      form.handleSubmit(onSubmit)();
      setTriggerSubmit(false);
    }
  }, [triggerSubmit]);

  // previews images
  const selectFile = (e: any) => {
    const previews = e.target.files;
    for (let i = 0; i < previews.length; i++) {
      if (previews[i].size < 15 * 1024 * 1024) {
        const img = new Image();
        img.src = window.URL.createObjectURL(previews[i]);
        img.onload = function () {
          const loadedImg = this as HTMLImageElement;
          console.log(loadedImg.width)
          if(loadedImg.width >= 500 && loadedImg.height >= 500) {
            formData.append('images', previews[i])
            setFiles(prevFiles => [...prevFiles, { image: window.URL.createObjectURL(previews[i]) }])
          }
        }
      }
    }
  }
  const deletePreview = (key?: number) => {
    if (key !== undefined) {
      // If the main file is being deleted
      if (mainFile !== undefined && key === mainFile) {
        setMainFile(undefined);
      }
      // If a file before the main file is being deleted
      else if (mainFile !== undefined && key < mainFile) {
        setMainFile(prevKey => (prevKey !== undefined ? prevKey - 1 : undefined));
      }

      const newFiles = files.filter((file, index) => index !== key);

      setFiles(newFiles);

      // Create new FormData and append only the remaining files
      const newFormData = new FormData();
      newFiles.forEach((file, index) => {
        newFormData.append('images', formData.getAll('images')[index]);
      });

      formData = newFormData;
    }
  }

  // save products actions
  function onSubmit(values: z.infer<typeof FormSchema>) {

    useLoading(true)

    const api = `https://localhost:8080/v1/api/products?action=${submitAction}`
    const data = {
      productId: product?._id ?? undefined,
      data: values,
      gallery: {
        data: formData,
        main: mainFile
      }
    }
    const options = { withCredentials: true }

    axios.post(api, data, options)
      .then(response => {
        if (submitAction !== "save") {
          navigate("/products")
        }
        toast(response.data.message)
      })
      .catch(error => {
        toast({
          variant: "destructive",
          title: "Server Error",
          description: String(error),
          action: <ToastAction altText="Try again" onClick={() => setTriggerSubmit(true)}>Try again</ToastAction>,
          duration: 5000,
        })
      })
      .finally(() => {
        useLoading(false)
      })
  }

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} onChange={() => {form.watch()}} className="mx-auto grid w-full max-w-5xl flex-1 auto-rows-max gap-4">
          <div className="flex items-center gap-4">
            <Button type="button" variant="outline" size="icon" className="h-7 w-7" onClick={() => navigate(-1)}>
              <ChevronLeft className="h-4 w-4"/>
              <span className="sr-only">Back</span>
            </Button>
            <h1 className="w-full md:text-xl font-semibold tracking-tight truncate">
              {isEditMode ? product.name : "Add Product"}
            </h1>
            <div className="hidden items-center gap-2 md:ml-auto md:flex">
              <Button type="button" variant="outline" size="sm" onClick={() => navigate("/products")}>
                {isEditMode ? "Discard" : "Cancel"}
              </Button>
              <Button size="sm" type="submit" disabled={!isDirty}>
                {!loading || <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isEditMode ? "Save Changes" : "Add Product"}
              </Button>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
            <div className="grid auto-rows-max items-start gap-4 lg:gap-8 lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Product Details</CardTitle>
                  <CardDescription>
                    Lipsum dolor sit amet, consectetur adipiscing elit
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    <div className="grid gap-3">
                      <FormField control={form.control} name="name"
                                 render={({field}) => (
                                   <FormItem>
                                     <FormLabel>Name</FormLabel>
                                     <FormControl>
                                       <Input {...field} />
                                     </FormControl>
                                     <FormMessage/>
                                   </FormItem>
                                 )}
                      />
                      <FormField control={form.control} name="description"
                                 render={({field}) => (
                                   <FormItem>
                                     <FormLabel>Description</FormLabel>
                                     <FormControl>
                                       <Textarea className="min-h-32" {...field} />
                                     </FormControl>
                                     <FormMessage/>
                                   </FormItem>
                                 )}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Stock</CardTitle>
                  <CardDescription>
                    Lipsum dolor sit amet, consectetur adipiscing elit
                  </CardDescription>
                </CardHeader>
                <CardContent className="px-0 pb-0 lg:px-6 lg:pb-6">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[75px] hidden lg:flex items-center">Code</TableHead>
                        <TableHead>Stock</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead className="w-[100px]">Size</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {
                        fields.length !== 0 ? (
                          fields.map((item, index) => (
                            <TableRow key={item.id}>
                              <TableCell className="font-semibold text-sm hidden lg:block" valign="middle">
                                <FormField control={form.control} name={`stocks.${index}.sku`}
                                           render={({ field }) => (
                                             <FormItem>
                                               <FormControl className="hidden">
                                                 <Input {...field} value={"GPP-" + (index + 1)} />
                                               </FormControl>
                                               {"GPP-" + String((index + 1)).padStart(2, '0')}
                                               <FormMessage className="text-xs" />
                                             </FormItem>
                                           )}
                                />
                              </TableCell>
                              <TableCell>
                                <FormField control={form.control} name={`stocks.${index}.stock`}
                                           render={({ field }) => (
                                             <FormItem>
                                               <FormControl>
                                                 <Input type="number" {...field} placeholder="Stock" />
                                               </FormControl>
                                               <FormMessage className="text-xs" />
                                             </FormItem>
                                           )}
                                />
                              </TableCell>
                              <TableCell>
                                <FormField control={form.control} name={`stocks.${index}.price`}
                                           render={({ field }) => (
                                             <FormItem>
                                               <FormControl>
                                                 <div className="relative">
                                                   <Input type="number" {...field} placeholder="Price" className="ps-6" />
                                                   <Euro className="absolute top-1/2 left-2 -translate-y-1/2 text-muted-foreground w-3.5 h-3.5" />
                                                 </div>
                                               </FormControl>
                                               <FormMessage className="text-xs" />
                                             </FormItem>
                                           )}
                                />
                              </TableCell>
                              <TableCell>
                                <FormField
                                  control={form.control}
                                  name={`stocks.${index}.size`}
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormControl>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                          <SelectTrigger>
                                            <SelectValue placeholder="Select size" />
                                          </SelectTrigger>
                                          <SelectContent>
                                            <SelectGroup>
                                              <SelectItem value="xs">XS</SelectItem>
                                              <SelectItem value="s">S</SelectItem>
                                              <SelectItem value="m">M</SelectItem>
                                              <SelectItem value="l">L</SelectItem>
                                              <SelectItem value="xl">XL</SelectItem>
                                              <SelectItem value="xxl">XXL</SelectItem>
                                            </SelectGroup>
                                          </SelectContent>
                                        </Select>
                                      </FormControl>
                                      <FormMessage className="text-xs" />
                                    </FormItem>
                                  )}
                                />
                              </TableCell>
                              <TableCell>
                                <Button type="button" variant="ghost" size="icon" onClick={() => remove(index)}>
                                  <X className="w-4 h-4" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={5} className="text-center text-muted-foreground">
                              Empty
                            </TableCell>
                          </TableRow>
                        )
                      }
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter className="justify-center border-t p-4">
                  <Button type="button" size="sm" variant="ghost" className="gap-1"
                          onClick={
                            () => append({
                              sku: "",
                              stock: Number(10),
                              price: Number(form.getValues("stocks").length ? form.getValues("stocks")[form.getValues("stocks").length - 1].price : 10.00),
                              size: "m"
                            })
                          }>
                    <PlusCircle className="h-3.5 w-3.5"/>
                    Add Variant
                  </Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Product Category</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <div className="grid gap-3">
                      <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Category</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {categories.map((category: Category) => (
                                  <SelectItem
                                    key={category._id}
                                    value={category._id}
                                  >
                                    {category.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid gap-3">
                      <FormField
                        control={form.control}
                        name="subcategory"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Subcategory (optional)</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              disabled={
                                (!form.getValues("category") || (!subcategories.filter(category => category.category_id === form.getValues("category")).length))
                              }
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select subcategory" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {
                                  subcategories
                                    .filter(category => category.category_id === form.getValues("category"))
                                    .map((category: Category) => (
                                      <SelectItem key={category._id} value={category._id}>{category.name}</SelectItem>
                                    ))
                                }
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Product Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    <div className="grid gap-3">
                      <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Status</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="Draft">Draft</SelectItem>
                                <SelectItem value="Active">Active</SelectItem>
                                <SelectItem value="Archived">Archived</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Product Images</CardTitle>
                  <CardDescription>
                    Upload images with min. 500x500px pixels, not exceeding a 15MB file size.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-2">
                    <div className="grid grid-cols-3 gap-2">
                      {
                        files
                          .map((file, key) => (
                            <Popover key={key}>
                              <PopoverTrigger asChild>
                                <div className="relative overflow-hidden rounded-md border border-dashed">
                                  <img
                                    alt="Product image"
                                    className="aspect-square w-full object-cover"
                                    src={file.image}
                                  />
                                  {
                                    mainFile === key && (
                                      <div className="absolute bottom-0 right-0 pe-1 pb-1 pt-1.5 ps-1.5 bg-primary-foreground rounded-tl-lg">
                                        <Star className="w-4 h-4 text-primary" />
                                      </div>
                                    )
                                  }
                                </div>
                              </PopoverTrigger>
                              <PopoverContent className="w-64 max-w-full grid gap-2 p-2">
                                <img
                                  alt="Product image"
                                  className="aspect-square w-full rounded-md object-cover"
                                  src={file.image}
                                />
                                <div className="grid gap-1">
                                  <Button type="button" onClick={() => setMainFile(key)} variant="ghost" size="sm" disabled={mainFile === key}>Set Main</Button>
                                  <Button type="button" onClick={() => deletePreview(key)} variant="ghost" size="sm">Delete</Button>
                                </div>
                              </PopoverContent>
                            </Popover>
                          ))
                      }
                      <label htmlFor="gallery">
                        <div
                          className="flex aspect-square cursor-pointer w-full items-center hover:bg-secondary/25 justify-center rounded-md border border-dashed">
                          <Upload className="h-5 w-5 text-muted-foreground"/>
                          <span className="sr-only">Upload</span>
                        </div>
                        <Input id="gallery" onChange={selectFile} type="file" className="hidden" multiple accept="image/*" />
                      </label>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 md:hidden">
            <Button variant="outline" size="sm" onClick={() => navigate("/products")}>
              {isEditMode ? "Discard" : "Cancel"}
            </Button>
            <Button size="sm" type="submit" disabled={!isDirty}>
              {!loading || <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isEditMode ? "Save Changes" : "Add Product"}
            </Button>
          </div>
        </form>
      </Form>
    </main>
  )
}

export default ProductActions