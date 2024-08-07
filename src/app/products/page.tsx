// app/products/layout.tsx

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Box } from "@mui/material";
import ProductList from "../component/layout";

const ProductsLayout = () => {
  const router = useRouter();


  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      router.push("/");
    }
  }, [router]);

  return (
    <Box>
      <ProductList />
    </Box>
  );
};

export default ProductsLayout;
