import { FetchProductsResponse, Product } from "./interface";

  
  export async function fetchProducts(): Promise<Product[]> {
    const response = await fetch('https://dummyjson.com/products');
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    const data: FetchProductsResponse = await response.json();
    return data.products;
  }
  