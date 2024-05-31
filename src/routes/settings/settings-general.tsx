import {Separator} from "@/components/ui/separator";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Switch} from "@/components/ui/switch";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {toast} from "@/components/ui/use-toast";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {
  Dialog, DialogClose,
  DialogContent,
  DialogDescription, DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import {Label} from "@/components/ui/label";

const FormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  username: z.string().min(3, {
    message: "Username must be at least 3 characters.",
  }),
  email: z.string().email({
    message: "Invalid email.",
  }),
  avatar: z.string().url({
    message: "Invalid url.",
  }),
})
const NotificationsSchema = z.object({
  marketing_emails: z.boolean().default(false).optional(),
  security_emails: z.boolean(),
})

function SettingsGeneral() {

  const AccountForm = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "CrACK",
      username: "cracky000",
      email: "patrikfejfar2@gmail.com",
      avatar: "https://github.com/shadcn.png",
    },
  })
  const NotificationsForm = useForm<z.infer<typeof NotificationsSchema>>({
    resolver: zodResolver(NotificationsSchema),
    defaultValues: {
      marketing_emails: false,
      security_emails: true,
    },
  })

  function onSubmitAccountData(values: z.infer<typeof FormSchema>) {
    toast({
      title: "Account Settings",
      description: "Changes have been saved.",
      duration: 3000,
    })
  }
  function onSubmitNotificationsData(values: z.infer<typeof NotificationsSchema>) {
    toast({
      title: "Email Notifications",
      description: "Changes have been saved.",
      duration: 2000,
    })
  }

  return (
    <div className="grid gap-6 max-w-3xl">
      <Form {...AccountForm}>
        <form onSubmit={AccountForm.handleSubmit(onSubmitAccountData)} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Account Settings</CardTitle>
              <CardDescription>
                Information about your account.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-x-6 lg:gap-x-8 gap-y-6">
                <FormField control={AccountForm.control} name="name"
                           render={({field}) => (
                             <FormItem>
                               <FormLabel>Name</FormLabel>
                               <FormControl>
                                 <Input placeholder="shadcn" {...field} />
                               </FormControl>
                               <FormMessage/>
                             </FormItem>
                           )}
                />
                <FormField control={AccountForm.control} name="username"
                           render={({field}) => (
                             <FormItem>
                               <FormLabel>Username</FormLabel>
                               <FormControl>
                                 <Input {...field} />
                               </FormControl>
                               <FormMessage/>
                             </FormItem>
                           )}
                />
                <FormField control={AccountForm.control} name="email"
                           render={({field}) => (
                             <FormItem>
                               <FormLabel>Email</FormLabel>
                               <FormControl>
                                 <Input type="email" {...field} />
                               </FormControl>
                               <FormMessage/>
                             </FormItem>
                           )}
                />
                <FormField control={AccountForm.control} name="avatar"
                           render={({field}) => (
                             <FormItem>
                               <FormLabel>Avatar URL</FormLabel>
                               <div className="flex gap-x-4">
                                 <FormControl>
                                   <Input {...field} />
                                 </FormControl>
                                 <Avatar>
                                   <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn"/>
                                   <AvatarFallback>CN</AvatarFallback>
                                 </Avatar>
                               </div>
                               <FormMessage/>
                             </FormItem>
                           )}
                />
              </div>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <Button type="submit" size="sm" disabled={!AccountForm.formState.isDirty}>Update</Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
      <Form {...NotificationsForm}>
        <form onSubmit={NotificationsForm.handleSubmit(onSubmitNotificationsData)} className="w-full space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Email Notifications</CardTitle>
              <CardDescription>
                Setting up email notifications.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <FormField
                  control={NotificationsForm.control}
                  name="marketing_emails"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          Marketing emails
                        </FormLabel>
                        <FormDescription>
                          Receive emails about new products, features, and more.
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={NotificationsForm.control}
                  name="security_emails"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Security emails</FormLabel>
                        <FormDescription>
                          Receive emails about your account security.
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <Button type="submit" size="sm" disabled={!NotificationsForm.formState.isDirty}>Update</Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
      <Card className="my-6">
        <CardHeader>
          <CardTitle className="text-xl">Delete Account</CardTitle>
          <CardDescription>
            Are you sure you want to delete your account? Deleting your account is permanent and will delete all your projects forever.
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="destructive">Delete Account</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Delete Account</DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete your account? Deleting your account is permanent and will delete all your projects forever.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="password" className="text-right">
                    Password
                  </Label>
                  <Input
                    type="password"
                    id="password"
                    defaultValue=""
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <DialogClose>
                  <Button variant="ghost">Cancel</Button>
                </DialogClose>
                <Button type="submit" variant="destructive">Yes, Delete Account Forever</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>
    </div>
  )
}

export default SettingsGeneral