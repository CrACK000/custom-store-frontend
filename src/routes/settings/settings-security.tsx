import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Separator} from "@/components/ui/separator";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Globe, MoreHorizontal, MoreVertical} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";

const formSchema = z.object({
  oldPassword: z.string().min(6, {
    message: "Invalid password.",
  }),
  newPassword: z.string().min(3, {
    message: "Password must be minimum 8 characters, including at least one uppercase letter, one lowercase letter and one number..",
  }),
  controlPassword: z.string(),
}).refine((data) => {
  return data.newPassword === data.controlPassword
}, {
  message: "Password do not match.",
  path: ["controlPassword"]
})

function SettingsSecurity() {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      controlPassword: "",
    },
  })
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  return (
    <div className="grid gap-6 max-w-3xl">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>
                Manage your password.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-x-6 lg:gap-x-8 gap-y-6 max-w-sm">
                <FormField control={form.control} name="oldPassword"
                           render={({field}) => (
                             <FormItem>
                               <FormLabel>Current password</FormLabel>
                               <FormControl>
                                 <Input type="password" {...field} />
                               </FormControl>
                               <FormMessage/>
                             </FormItem>
                           )}
                />
                <FormField control={form.control} name="newPassword"
                           render={({field}) => (
                             <FormItem>
                               <FormLabel>New password</FormLabel>
                               <FormControl>
                                 <Input type="password" {...field} />
                               </FormControl>
                               <FormMessage/>
                             </FormItem>
                           )}
                />
                <FormField control={form.control} name="controlPassword"
                           render={({field}) => (
                             <FormItem>
                               <FormLabel>Check password</FormLabel>
                               <FormControl>
                                 <Input type="password" {...field} />
                               </FormControl>
                               <FormMessage/>
                             </FormItem>
                           )}
                />
              </div>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <Button type="submit" size="sm" disabled={!form.formState.isDirty}>Change</Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
      <Card>
        <CardHeader>
          <CardTitle>Sessions</CardTitle>
          <CardDescription>
            View everything that has access to your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead>First Used</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>
                  <div className="flex items-center gap-x-2">
                    <Globe className="text-muted-foreground w-4 h-4" />
                    <div>Opera (Windows)</div>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">5 minutes ago</TableCell>
                <TableCell className="text-muted-foreground">5 weeks ago</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        aria-haspopup="true"
                        size="icon"
                        variant="ghost"
                      >
                        <MoreVertical className="h-4 w-4"/>
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <div className="flex items-center gap-x-2">
                    <Globe className="text-muted-foreground w-4 h-4" />
                    <div>Opera (Windows)</div>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">5 minutes ago</TableCell>
                <TableCell className="text-muted-foreground">5 weeks ago</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        aria-haspopup="true"
                        size="icon"
                        variant="ghost"
                      >
                        <MoreVertical className="h-4 w-4"/>
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

export default SettingsSecurity