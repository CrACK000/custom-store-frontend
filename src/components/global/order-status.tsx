import {Check, CheckCheck, CircleEllipsis, CopyX, RefreshCw, X} from "lucide-react";
import {Badge} from "@/components/ui/badge";
import React, {FC} from "react";

type OrderStatusProps = {
  status: "pending" | "paid" | "unpaid";
}

const OrderStatus: FC<OrderStatusProps> = ({ status }) => {
  switch (status) {
    case "paid":
      return (
        <Badge>
          Paid
          <CheckCheck className="w-3.5 h-3.5 ml-1"/>
        </Badge>
      )

    case "unpaid":
      return (
        <Badge variant="destructive">
          Unpaid
          <CopyX className="w-3.5 h-3.5 ml-1"/>
        </Badge>
      )

    case "pending":
      return (
        <Badge variant="secondary">
          Pending
          <CircleEllipsis className="w-3.5 h-3.5 ml-1" />
        </Badge>
      )
  }
}

export default OrderStatus