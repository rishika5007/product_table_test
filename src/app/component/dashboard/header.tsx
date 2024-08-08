'use client'
import React from 'react';
import { Box, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import Image from 'next/image';
import {
    Search,
    Menu as MenuIcon,
    AccountCircle,
    Notifications,
    Settings,
    ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";

import nookies from "nookies"


interface HeaderProps {
    onSidebarToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ onSidebarToggle }) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [searchValue, setSearchValue] = React.useState("");
    const [searchDropdown, setSearchDropdown] = React.useState(null);
    const router = useRouter();


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

    const logoutHandler = async () => {

        // Destroy the cookie client-side
        nookies.destroy(null, "authToken");
        router.push("/");
    };
    return (
        <header style={{ display: 'flex', alignItems: 'center', padding: '16px', backgroundColor: 'white', color: 'white', position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 1000 }}>
            <Box sx={{ display: "flex", columnGap: "104px", justifyContent: "center", alignItems: "center" }}>
                <Typography variant="h6" sx={{ flexGrow: 1 , marginLeft:"5px"}}>
                    <Image
                        src="/images/logo.svg"
                        alt="logo"
                        width={118}
                        height={28}
                    />
                </Typography>
                <IconButton onClick={onSidebarToggle} style={{ color: '#000' }}>
                    <Image
                        src="/images/menu.svg"
                        alt="logo"
                        width={32}
                        height={32}
                    />
                </IconButton>
            </Box>

            <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center", paddingBlock: "15px" }}>
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Search"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    sx={{
                        width: 371,
                        height: 48,
                        marginX: "5px",
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
                            cursor: "pointer"
                        }}
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        onClick={logoutHandler}
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
        </header>
    );
};

export default Header;
