import { FetchProductsResponse, Product } from "./interface";

  
  export async function fetchProducts(): Promise<Product[]> {
    const response = await fetch('https://dummyjson.com/products');
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    const data: FetchProductsResponse = await response.json();
    return data.products;
  }
  
  export const fetchProductById = async (id: number) => {
    const response = await fetch(`https://dummyjson.com/products/${id}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  };