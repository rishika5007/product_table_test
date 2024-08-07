'use client'
import React, { useState } from 'react';
import { useReactTable, ColumnDef, getCoreRowModel, getSortedRowModel, flexRender, SortingState } from '@tanstack/react-table';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, TablePagination, TableFooter, Box, Chip, FormControl, InputLabel, MenuItem, OutlinedInput } from '@mui/material';
import styled from '@emotion/styled';
import { Product, ProductTableProps } from '@components/app/lib/interface';
import Image from 'next/image';
import { fetchProductById } from '@components/app/lib/api';
import ProductDetailModal from '../modal';
import ProgressCircle from '../progress/progress';
import TagsCell from '../dropDown';

const ProductTable: React.FC<ProductTableProps> = ({ data }) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sorting, setSorting] = useState<SortingState>([]);

  const columns: ColumnDef<Product, any>[] = [
    { header: "ID", accessorKey: "id" },
    {
      header: "Title", accessorKey: "title",
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
        </div>),
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
        <div style={{ display: "flex" }}>
          <IconButton onClick={() => handleOpen(row.original?.id)}>
            <Image
              src="/images/review.svg"
              alt="review"
              width={24}
              height={24}
              loading="lazy"
            />
          </IconButton>
          <IconButton>
            <Image
              src="/images/tabler-icon-edit.svg"
              alt="edit"
              width={24}
              height={24}
              loading="lazy"
            />
          </IconButton>
          <IconButton>
            <Image
              src="/images/tabler-icon-share.svg"
              alt="upload"
              width={24}
              height={24}
              loading="lazy"
            />
          </IconButton>
          <IconButton>
            <Image
              src="/images/tabler-icon-trash.svg"
              alt="trash"
              width={24}
              height={24}
              loading="lazy"
            />
          </IconButton>
        </div>
      ),
    },
  ];

  const { getHeaderGroups, getRowModel } = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
    onSortingChange: setSorting,
  });

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
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
    setSorting(prev => {
      const newSorting: SortingState = prev.some(sort => sort.id === columnId)
        ? prev.map(sort => sort.id === columnId ? { id: columnId, desc: !sort.desc } : sort)
        : [...prev, { id: columnId, desc: false }];

      return newSorting;
    });
  };

  return (
    <>
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
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      cursor: 'pointer',
                    }}
                    key={header.id}
                    onClick={() => header.column.getCanSort() && handleSort(header.id)}
                  >
                    <span className="flex">
                      {header.column.columnDef.header as string}
                      <Image
                        src="/images/dot_menu.svg"
                        width={24}
                        height={24}
                        alt="more icon"
                        loading="lazy"
                      />
                    </span>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody sx={{ marginBottom: "10px" }} >
            {getRowModel().rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, rowIndex) => (
              <StyledTableRow key={row.id} isEven={rowIndex % 2 === 0}>
                {row.getVisibleCells().map((cell) => (
                  <StyledTableCell key={cell.id} sx={{ paddingY: "26.5px" }}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </StyledTableCell>
                ))}
              </StyledTableRow>
            ))}
          </TableBody>
          <TableFooter >
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

const scrollbarContainer = {
  overflowY: "hidden",
  overflowX: "auto",
  '&::-webkit-scrollbar': {
    height: '4px',
  },
  '&::-webkit-scrollbar-track': {
    background: '#f1f1f1',
  },
  '&::-webkit-scrollbar-thumb': {
    background: '#888',
    borderRadius: '10px',
  },
  '&::-webkit-scrollbar-thumb:hover': {
    background: '#555',
  }
}

const StyledTable = styled(Table)`
  max-width: 100%;
  overflow: auto;
   overflowX: "hidden",
    overflowY: "auto",
    '&::-webkit-scrollbar': {
        width: '8px',
    },
    '&::-webkit-scrollbar-track': {
        background: '#f1f1f1',
    },
    '&::-webkit-scrollbar-thumb': {
        background: '#888',
        borderRadius: '10px',
    },
    '&::-webkit-scrollbar-thumb:hover': {
        background: '#555',
    }
`;


const StyledTableRow = styled(TableRow, {
  shouldForwardProp: (prop) => prop !== 'isEven',
}) <{ isEven: boolean }>`
  background-color: ${({ isEven }) => (isEven ? '#F5F5F5' : '#ffffff')};
  cursor: pointer;
`;

const StyledTableCell = styled(TableCell)`
  border-right: 1px solid #ddd;
  width: 350px; 
  color: #364152;
  &:nth-of-type(9) {
    width: 15%; 
  }
  &:last-of-type {
    border-right: none; 
    width: 16%; 
  }
`;


const TablePaginationStyled = styled(TablePagination)`
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: #fff; 
`;