import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {ScrollArea} from "@/components/ui/scroll-area";
import {Link} from "react-router-dom";
import {BellIcon} from "lucide-react";
import {EyeNoneIcon, PersonIcon} from "@radix-ui/react-icons";
import React from "react";

const NotificationsCard = () => {

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Notifications</CardTitle>
        <CardDescription>
          Choose what you want to be notified about.
        </CardDescription>
      </CardHeader>
      <ScrollArea className="h-96">
        <CardContent className="grid gap-1">
          <Link to="/" className="-mx-2 flex items-start space-x-4 rounded-md p-2 transition-all hover:bg-accent hover:text-accent-foreground">
            <BellIcon className="mt-px h-5 w-5" />
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">Everything</p>
              <p className="text-sm text-muted-foreground">
                Email digest, mentions & all activity.
              </p>
            </div>
          </Link>
          <Link to="/" className="-mx-2 flex items-start space-x-4 rounded-md p-2 transition-all hover:bg-accent hover:text-accent-foreground">
            <PersonIcon className="mt-px h-5 w-5" />
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">Available</p>
              <p className="text-sm text-muted-foreground">
                Only mentions and comments.
              </p>
            </div>
          </Link>
          <Link to="/" className="-mx-2 flex items-start space-x-4 rounded-md p-2 transition-all hover:bg-accent hover:text-accent-foreground">
            <EyeNoneIcon className="mt-px h-5 w-5" />
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">Ignoring</p>
              <p className="text-sm text-muted-foreground">
                Turn off all notifications.
              </p>
            </div>
          </Link>
          <Link to="/" className="-mx-2 flex items-start space-x-4 rounded-md p-2 transition-all hover:bg-accent hover:text-accent-foreground">
            <EyeNoneIcon className="mt-px h-5 w-5" />
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">Ignoring</p>
              <p className="text-sm text-muted-foreground">
                Turn off all notifications.
              </p>
            </div>
          </Link>
          <Link to="/" className="-mx-2 flex items-start space-x-4 rounded-md p-2 transition-all hover:bg-accent hover:text-accent-foreground">
            <BellIcon className="mt-px h-5 w-5" />
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">Everything</p>
              <p className="text-sm text-muted-foreground">
                Email digest, mentions & all activity.
              </p>
            </div>
          </Link>
          <Link to="/" className="-mx-2 flex items-start space-x-4 rounded-md p-2 transition-all hover:bg-accent hover:text-accent-foreground">
            <PersonIcon className="mt-px h-5 w-5" />
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">Available</p>
              <p className="text-sm text-muted-foreground">
                Only mentions and comments.
              </p>
            </div>
          </Link>
          <Link to="/" className="-mx-2 flex items-start space-x-4 rounded-md p-2 transition-all hover:bg-accent hover:text-accent-foreground">
            <EyeNoneIcon className="mt-px h-5 w-5" />
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">Ignoring</p>
              <p className="text-sm text-muted-foreground">
                Turn off all notifications.
              </p>
            </div>
          </Link>
          <Link to="/" className="-mx-2 flex items-start space-x-4 rounded-md p-2 transition-all hover:bg-accent hover:text-accent-foreground">
            <EyeNoneIcon className="mt-px h-5 w-5" />
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">Ignoring</p>
              <p className="text-sm text-muted-foreground">
                Turn off all notifications.
              </p>
            </div>
          </Link>
          <Link to="/" className="-mx-2 flex items-start space-x-4 rounded-md p-2 transition-all hover:bg-accent hover:text-accent-foreground">
            <BellIcon className="mt-px h-5 w-5" />
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">Everything</p>
              <p className="text-sm text-muted-foreground">
                Email digest, mentions & all activity.
              </p>
            </div>
          </Link>
          <Link to="/" className="-mx-2 flex items-start space-x-4 rounded-md p-2 transition-all hover:bg-accent hover:text-accent-foreground">
            <PersonIcon className="mt-px h-5 w-5" />
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">Available</p>
              <p className="text-sm text-muted-foreground">
                Only mentions and comments.
              </p>
            </div>
          </Link>
          <Link to="/" className="-mx-2 flex items-start space-x-4 rounded-md p-2 transition-all hover:bg-accent hover:text-accent-foreground">
            <EyeNoneIcon className="mt-px h-5 w-5" />
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">Ignoring</p>
              <p className="text-sm text-muted-foreground">
                Turn off all notifications.
              </p>
            </div>
          </Link>
          <Link to="/" className="-mx-2 flex items-start space-x-4 rounded-md p-2 transition-all hover:bg-accent hover:text-accent-foreground">
            <EyeNoneIcon className="mt-px h-5 w-5" />
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">Ignoring</p>
              <p className="text-sm text-muted-foreground">
                Turn off all notifications.
              </p>
            </div>
          </Link>
        </CardContent>
      </ScrollArea>
    </Card>
  )
}

export default NotificationsCard