// components/Header.js

"use client"

import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  TextField,
  InputAdornment,
  Menu,
  MenuItem,
  Container,
  Box,
} from "@mui/material";
import {
  Search,
  Menu as MenuIcon,
  AccountCircle,
  Notifications,
  Settings,
  ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material";
import Image from "next/image";

const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [searchValue, setSearchValue] = React.useState("");
  const [searchDropdown, setSearchDropdown] = React.useState(null);

  const handleMenuClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSearchDropdownOpen = (event: any) => {
    setSearchDropdown(event.currentTarget);
  };

  const handleSearchDropdownClose = () => {
    setSearchDropdown(null);
  };

  return (
    <AppBar position="static" sx={{ background: "#fff" }}>
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
          {/* Logo on the Left */}
          <Box sx={{ display: "flex", columnGap: "104px" }}>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              <Image
                src="/images/logo.svg"
                alt="logo"
                width={118}
                height={28}
              />
            </Typography>

            <Box
              sx={{
                backgroundColor: "#DAE7F9",
                height: "36px",
                width: "36px",
                borderRadius: "8px",
              }}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Image
                src="/images/dashes.svg"
                alt="bell"
                width={13}
                height={15}
              />
            </Box>
          </Box>

          {/* Search Bar with Dropdown */}
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            sx={{
              width: 371,
              height: 48,
              marginLeft: "20px",
              "& .MuiOutlinedInput-root": {
                height: "100%",
                borderRadius: "12px", // Rounded corners
                border: "1px solid #6290CB", // Border color
              },
              "& .MuiInputBase-input": {
                height: "100%",
                padding: "0 1px", // Adjust padding if needed
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#6290CB", // Border color
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton
                    aria-controls="search-dropdown"
                    aria-haspopup="true"
                    onClick={handleSearchDropdownOpen}
                    color="inherit"
                  >
                    <Search />
                  </IconButton>
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-controls="search-dropdown"
                    aria-haspopup="true"
                    color="inherit"
                  >
                    <ExpandMoreIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {/* Icons on the Right */}
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              justifyContent: "flex-end",
              columnGap: "18px",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                backgroundColor: "#DAE7F9",
                height: "36px",
                width: "36px",
                borderRadius: "8px",
              }}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Image src="/images/rays.svg" alt="bell" width={13} height={15} />
            </Box>
            <Box
              sx={{
                backgroundColor: "#F5F5F5",
                height: "36px",
                width: "36px",
                borderRadius: "8px",
              }}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Image src="/images/en.svg" alt="bell" width={13} height={15} />
            </Box>
            <Box
              sx={{
                backgroundColor: "#DAE7F9",
                height: "36px",
                width: "36px",
                borderRadius: "8px",
              }}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Image src="/images/bell.svg" alt="bell" width={13} height={15} />
            </Box>

            <Box
              sx={{
                backgroundColor: "#DAE7F9",
                height: "36px",
                width: "36px",
                borderRadius: "8px",
              }}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Image
                src="/images/logout.svg"
                alt="bell"
                width={13}
                height={15}
              />
            </Box>

            <Box
              sx={{
                backgroundColor: "#DAE7F9",
                height: "36px",
                width: "36px",
                borderRadius: "8px",
              }}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Image src="/images/zoom.svg" alt="bell" width={13} height={15} />
            </Box>

            <Box
              sx={{
                backgroundColor: "#F5F5F5",
                height: "51px",
                width: "102px",
                borderRadius: "27px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                columnGap: "4.32px",
              }}
            >
              <Box
                sx={{
                  backgroundColor: "#DAE7F9",
                  height: "32px",
                  width: "34px",
                  borderRadius: "35px",
                }}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Image src="/images/s.svg" alt="bell" width={13} height={15} />
              </Box>
              <Box
                sx={{
                  // backgroundColor: "#DAE7F9",
                  height: "32px",
                  width: "34px",
                  borderRadius: "35px",
                }}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Image
                  src="/images/settings.svg"
                  alt="settings"
                  width={25}
                  height={25}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
