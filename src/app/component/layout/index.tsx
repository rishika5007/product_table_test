import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  InputAdornment,
} from "@mui/material";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Home as HomeIcon } from "@mui/icons-material";
import ProductTable from "../productTable";
import { fetchProducts } from "@components/app/lib/api";

export default async function ProductList() {
  const ProductData = await getData();
 
  //  }
  return (<>
          <Box
            sx={{
              backgroundColor: "#fff",
              marginBottom: "16px",
              marginTop: "50px",
              padding: "10px",
              border: "1px solid #fff",
              borderRadius: "12px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            Projects
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <Link href="#" color="inherit" className="flex items-end">
                <HomeIcon />
                <span style={{ marginLeft: 4 }}>Home</span>
                <Image src="/images/Next.svg" alt="arrow" width={24} height={24} loading="lazy" style={{ marginLeft: 4 }} />
                <span style={{ marginLeft: 4 }}>Projects</span>
              </Link>
            </Box>
          </Box>
          <Box
            sx={{
              background: "#fff",
              paddingTop: "16px",
              border: "1px solid #fff",
              borderRadius: "12px",
              paddingBottom: "16px",
            }}
          >
            <Typography variant="body1" sx={{ marginLeft: "16px" }}>
              Projects
            </Typography>
            
            <Box sx={{ paddingX: "20px" }}>
              <ProductTable data={ProductData} />
            </Box>
          </Box>
        </>);
}

async function getData() {
  const res = await fetchProducts();
  return res;
}
