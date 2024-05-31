import products from "@/data/products.json";

export const useProducts = (): Product[] => {
  return products;
};

export const useProduct = (productId: string): Product | null => {
  return products.find((product: Product) => product._id === productId) || null;
};