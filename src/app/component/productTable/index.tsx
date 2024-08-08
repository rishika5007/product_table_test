"use client";
import React, { useState, MouseEvent, useEffect } from "react";
import {
  useReactTable,
  ColumnDef,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  SortingState,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TablePagination,
  TableFooter,
  Box,
  Typography,
  InputAdornment,
  TextField,
  Button,
} from "@mui/material";
import styled from "@emotion/styled";
import { Product, ProductTableProps } from "@components/app/lib/interface";
import Image from "next/image";
import { fetchProductById } from "@components/app/lib/api";
import ProductDetailModal from "../modal";
import ProgressCircle from "../progress/progress";
import TagsCell from "../dropDown";
import SearchIcon from "@mui/icons-material/Search";
import ActionButtons from "../actionButton";

// Custom debounce function with cancel capability
function debounce(func: (...args: any[]) => void, wait: number) {
  let timeout: NodeJS.Timeout;
  const debounced = function (...args: any[]) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };

  debounced.cancel = () => {
    clearTimeout(timeout);
  };

  return debounced;
}

const debouncedFilterData = debounce(
  (
    query: string,
    data: Product[],
    setFilteredData: React.Dispatch<React.SetStateAction<Product[]>>
  ) => {
    if (query.trim() === "") {
      // If search query is empty, reset to original data
      setFilteredData(data);
    } else {
      const newFilteredData = data.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredData(newFilteredData);
    }
  },
  300
);

const ProductTable: React.FC<ProductTableProps> = ({ data }) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [activeColumnId, setActiveColumnId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    debouncedFilterData(searchQuery, data, setFilteredData);
    // Clean up the debounced function on unmount
    return () => {
      debouncedFilterData.cancel();
    };
  }, [searchQuery, data]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleOpen = async (id: number) => {
    try {
      const product = await fetchProductById(id);
      setSelectedProduct(product);
      setOpen(true);
    } catch (error) {
      console.error("Failed to fetch product details:", error);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedProduct(null);
  };

  const handleSort = (columnId: string) => {
    setSorting((prev) => {
      const newSorting: SortingState = prev.some((sort) => sort.id === columnId)
        ? prev.map((sort) =>
            sort.id === columnId ? { id: columnId, desc: !sort.desc } : sort
          )
        : [...prev, { id: columnId, desc: false }];

      return newSorting;
    });
  };

  const handleMenuClick = (
    event: MouseEvent<HTMLButtonElement>,
    columnId: string
  ) => {
    event.stopPropagation(); // Prevent triggering the row click event
    setActiveColumnId((prev) => (prev === columnId ? null : columnId));
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchClick = () => {
    // The search functionality is handled by the useEffect hook now
  };

  const columns: ColumnDef<Product, any>[] = [
    { header: "ID", accessorKey: "id" },
    {
      header: "Title",
      accessorKey: "title",
      cell: (info) => (
        <div className="truncate-text">{info.getValue() as string}</div>
      ),
    },
    {
      header: "Description",
      accessorKey: "description",
      cell: (info) => (
        <div className="truncate-text">{info.getValue() as string}</div>
      ),
    },
    { header: "Category", accessorKey: "category" },
    { header: "Price", accessorKey: "price" },
    {
      header: "Discount(%)",
      accessorKey: "discountPercentage",
      cell: (info) => (
        <div className="flex justify-center items-center">
          <ProgressCircle value={info.getValue() as number} size={40} />
        </div>
      ),
    },
    { header: "Rating", accessorKey: "rating" },
    { header: "Stock", accessorKey: "stock" },
    {
      header: "Tags",
      accessorKey: "tags",
      cell: (info) => <TagsCell value={info.getValue() as string[]} />,
    },
    { header: "Brand", accessorKey: "brand" },
    {
      header: "Actions",
      id: "actions",
      size: 500,
      cell: ({ row }) => (
        <ActionButtons onClick={() => handleOpen(row.original?.id)} />
      ),
    },
  ];

  const { getHeaderGroups, getRowModel } = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
    onSortingChange: setSorting,
  });

  return (
    <>
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
            paddingX: "22px",
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
            value={searchQuery}
            onChange={handleSearch}
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
                  <IconButton onClick={handleSearchClick}>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Image src="/images/filter.svg" alt="filter" height={24} width={24} />
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
      <TableContainer
        component={Paper}
        className="relative"
        sx={scrollbarContainer}
      >
        <StyledTable>
          <TableHead>
            {getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableCell
                    sx={{
                      color: "#000000",
                      fontWeight: "bold",
                      fontSize: 14,
                      justifyContent: "space-between",
                      alignItems: "center",
                      cursor: "pointer",
                      position: "relative",
                    }}
                    key={header.id}
                    onClick={() =>
                      header.column.getCanSort() && handleSort(header.id)
                    }
                  >
                    <Box className="flex" sx={{ display: "inline" }}>
                      {header.column.columnDef.header as string}
                      <IconButton
                        onClick={(event) => handleMenuClick(event, header.id)}
                      >
                        <Image
                          src="/images/dot_menu.svg"
                          width={24}
                          height={24}
                          alt="more icon"
                          loading="lazy"
                        />
                      </IconButton>
                      {activeColumnId === header.id && (
                        <Box
                          sx={{
                            position: "absolute",
                            background: "#fff",
                            zIndex: 10,
                            right: 5,
                            top: 45,
                            padding: "10px",
                            boxShadow: 3,
                          }}
                        >
                          {activeColumnId === header.id ? (
                            <>
                              <Typography
                                variant="body1"
                                sx={{ fontSize: "12px", cursor: "pointer" }}
                              >
                                Edit
                              </Typography>
                              <Typography
                                variant="body1"
                                sx={{ fontSize: "12px", cursor: "pointer" }}
                              >
                                Delete
                              </Typography>
                            </>
                          ) : null}
                        </Box>
                      )}
                    </Box>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody sx={{ marginBottom: "10px" }}>
            {getRowModel()
              .rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, rowIndex) => (
                <StyledTableRow key={row.id} isEven={rowIndex % 2 === 0}>
                  {row.getVisibleCells().map((cell) => (
                    <StyledTableCell key={cell.id} sx={{ paddingY: "26.5px" }}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </StyledTableCell>
                  ))}
                </StyledTableRow>
              ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePaginationStyled
                rowsPerPageOptions={[5, 10, 25, 50]}
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableRow>
          </TableFooter>
        </StyledTable>
      </TableContainer>
      <ProductDetailModal
        open={open}
        onClose={handleClose}
        product={selectedProduct}
      />
    </>
  );
};

export default ProductTable;

// The styles remain the same
const scrollbarContainer = {
  overflowY: "hidden",
  overflowX: "auto",
  "&::-webkit-scrollbar": {
    height: "4px",
  },
  "&::-webkit-scrollbar-track": {
    background: "#f1f1f1",
  },
  "&::-webkit-scrollbar-thumb": {
    background: "#888",
    borderRadius: "10px",
  },
  "&::-webkit-scrollbar-thumb:hover": {
    background: "#555",
  },
};

const StyledTable = styled(Table)`
  max-width: 100%;
  min-height: 370px;
  overflow: auto;
  overflow-x: hidden;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

const StyledTableRow = styled(TableRow, {
  shouldForwardProp: (prop) => prop !== "isEven",
})<{ isEven: boolean }>`
  background-color: ${({ isEven }) => (isEven ? "#F5F5F5" : "#ffffff")};
  cursor: pointer;
`;

const StyledTableCell = styled(TableCell)`
  border-right: 1px solid #ddd;
  width: 350px;
  color: #364152;
  &:nth-of-type(9) {
    width: 40%;
  }
  &:last-of-type {
    border-right: none;
    width: 100%;
  }
`;

const TablePaginationStyled = styled(TablePagination)`
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: #fff;
`;
