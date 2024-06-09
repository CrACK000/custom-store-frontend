import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from "@/components/ui/drawer";
import {Button} from "@/components/ui/button";
import {AtSign, Loader2, Settings} from "lucide-react";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {getInitials} from "@/lib/utils";
import {Textarea} from "@/components/ui/textarea";
import * as React from "react";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {z} from "zod";
import axios from "axios";
import {toast} from "@/components/ui/use-toast";
import {ToastAction} from "@/components/ui/toast";
import {FC, useState} from "react";

const FormSchema = z.object({
  title: z.string()
    .min(2, {message: "The title must have at least 2 characters."})
    .max(50, {message: "The maximum number of characters is 50."}),
  logo: z.string().url(),
  link: z.string(),
  description: z.string().max(600, {
    message: "The maximum number of characters is 600."
  })
})

const BrandSettings: FC<any> = ({ brandData }) => {

  const [loading, useLoading] = useState(false)

  const formValues = {
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: brandData.title ?? "",
      logo: brandData.logo ?? "",
      link: brandData.link ?? "",
      description: brandData.description ?? "",
    },
  }
  const form = useForm<z.infer<typeof FormSchema>>(formValues);

  const onEditBrandData = (values: z.infer<typeof FormSchema>) => {

    useLoading(true)

    const api = ""
    const data = values
    const options = { withCredentials: true }

    axios.post(api, data, options)
      .then(response => {
        toast(response.data.message)
      })
      .catch(error => {
        toast({
          variant: "destructive",
          title: "Server Error",
          description: String(error),
          action: <ToastAction altText="Try again" onClick={() => form.handleSubmit(onEditBrandData)()}>Try again</ToastAction>,
          duration: 5000,
        })
      })
      .finally(() => {
        useLoading(false)
      })

  }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="ghost" size="icon">
          <Settings className="w-5 h-5"/>
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onEditBrandData)} onChange={() => {form.watch()}}>
            <div className="mx-auto w-full max-w-3xl">
              <DrawerHeader>
                <DrawerTitle>Brand Information</DrawerTitle>
              </DrawerHeader>
              <div className="p-4 grid md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage/>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="logo"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Logo URL</FormLabel>
                      <div className="flex gap-x-4">
                        <FormControl>
                          <Input placeholder="https://" {...field} />
                        </FormControl>
                        <Avatar>
                          <AvatarImage src={field.value} alt="Preview" />
                          <AvatarFallback className="text-sm">{getInitials("Custom Hood")}</AvatarFallback>
                        </Avatar>
                      </div>
                      <FormMessage/>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="link"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Link</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input className="ps-9" {...field} />
                          <AtSign className="absolute top-1/2 -translate-y-1/2 left-3 w-4 h-4 text-muted-foreground" />
                        </div>
                      </FormControl>
                      <FormMessage/>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({field}) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea rows={7} {...field} />
                      </FormControl>
                      <FormMessage/>
                    </FormItem>
                  )}
                />
              </div>
              <DrawerFooter>
                <div className="flex justify-end gap-2">
                  <DrawerClose asChild>
                    <Button type="button" variant="outline">Cancel</Button>
                  </DrawerClose>
                  <Button type="submit">
                    {!loading || <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Save Changes
                  </Button>
                </div>
              </DrawerFooter>
            </div>
          </form>
        </Form>
      </DrawerContent>
    </Drawer>
  )
}

export default BrandSettings