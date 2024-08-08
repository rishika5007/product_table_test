import React from "react";
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
import SearchIcon from "@mui/icons-material/Search";
import Link from "next/link";
import { Home as HomeIcon } from "@mui/icons-material";
import ProductTable from "../productTable";
import { fetchProducts } from "@components/app/lib/api";

export default async function ProductList() {
  const ProductData = await getData();
  //  const cookieStore = cookies();
  //  const token = cookieStore.get("authToken");

  //  if (!token) {
  //    // Redirect to login if no token is present
  //    redirect("/login");
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
                  height: "40px",
                  fontSize: "12px",
                  lineHeight: "14px",
                  fontWeight: "700",
                  paddingY: "12px",
                  paddingX: "22px"
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
