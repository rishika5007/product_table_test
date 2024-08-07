import React from 'react'
import ProductTable from '../component/productTable'
import { fetchProducts } from '../lib/api';
import Header from '../component/header/Header';
import Sidebar from '../component/sidebar';
import { Box, Typography, Button, TextField, InputAdornment } from '@mui/material';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Image from 'next/image';
import SearchIcon from "@mui/icons-material/Search";

export default async function ProductList() {
    const ProductData = await getData()
    //  const cookieStore = cookies();
    //  const token = cookieStore.get("authToken");

    //  if (!token) {
    //    // Redirect to login if no token is present
    //    redirect("/login");
    //  }
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Header />
        <Box sx={{ display: "flex" }}>
          <Sidebar />
          <Box
            sx={{
              flexGrow: 1,
              overflow: "auto",
              marginTop: "76px",
              marginInline: "20px",
            }}
          >
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
              <Box
                sx={{
                  borderTop: "1px solid #E0E0E0",
                  marginTop: "15px",
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "20px",
                }}
              >
                <Button
                  variant="outlined"
                  sx={{
                    borderColor: "#6290CB",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "30px",
                    fontSize: "12px",
                    lineHeight: "14px",
                  }}
                >
                  Add project
                </Button>
                <Box
                  sx={{
                    display: "flex",
                    columnGap: "18px",
                    alignItems: "center",
                  }}
                >
                  <TextField
                    placeholder=""
                    variant="outlined"
                    size="small"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "4px",
                        border: "none",
                        "& fieldset": {
                          border: "none",
                        },
                      },
                      "& .MuiOutlinedInput-input": {
                        padding: "0 8px",
                      },
                      "& .MuiInputBase-input": {
                        padding: "0",
                      },
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Image
                    src="/images/filter.svg"
                    alt="filter"
                    height={24}
                    width={24}
                  />
                  <Image
                    src="images/columns.svg"
                    alt="columns"
                    height={24}
                    width={24}
                  />
                  <Image
                    src="images/dashboard-zoom.svg"
                    alt="zoom"
                    height={24}
                    width={24}
                  />
                </Box>
              </Box>
              <Box sx={{ marginLeft: "20px" }}>
                <ProductTable data={ProductData} />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    );
}

async function getData() {
    const res = await fetchProducts()
    return res;
}