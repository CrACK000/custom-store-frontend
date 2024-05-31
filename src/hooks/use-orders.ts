import orders from "@/data/orders.json";

export const useOrders = (): Order[] => {
  return orders;
};

export const useOrder = (orderId: string): Order | null => {
  return orders.find((order: Order) => order._id === orderId) || null;
};