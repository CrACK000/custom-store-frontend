import {toast} from "@/components/ui/use-toast";

export function copyLink(text: string) {
  navigator.clipboard.writeText(text)
    .then(() => {
      toast({
        description: "Link Copied.",
        duration: 2000
      })
    })
    .catch((error) => {
      toast({
        description: String(error),
        duration: 3000
      })
    });
}