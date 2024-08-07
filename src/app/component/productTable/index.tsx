'use client'
import React, { useState } from 'react';
import { useReactTable, ColumnDef, getCoreRowModel, flexRender } from '@tanstack/react-table';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, TablePagination } from '@mui/material';
import styled from '@emotion/styled';
import { Product } from '@components/app/lib/interface';
import Image from 'next/image';
import { fetchProductById } from '@components/app/lib/api';
import ProductDetailModal from '../modal';
import ProgressCircle from '../progress/progress';

const StyledTable = styled(Table)`
  max-width: 100%;
  overflow: auto;
  // * {
  //   scrollbar-width: thin;
  //   scrollbar-color: var(--scroll-bar-color) var(--scroll-bar-bg-color);
  // }

  // /* Works on Chrome, Edge, and Safari */
  // *::-webkit-scrollbar {
  //   width: 12px;
  // }

  // *::-webkit-scrollbar-track {
  //   background: var(--scroll-bar-bg-color);
  // }

  // *::-webkit-scrollbar-thumb {
  //   background-color: var(--scroll-bar-color);
  //   border-radius: 20px;
  //   border: 3px solid var(--scroll-bar-bg-color);
  // }
`;


const StyledTableRow = styled(TableRow, {
  shouldForwardProp: (prop) => prop !== 'isEven',
})<{ isEven: boolean }>`
  background-color: ${({ isEven }) => (isEven ? '#F5F5F5' : '#ffffff')};
  cursor: pointer;
`;

const StyledTableCell = styled(TableCell)`
  border-right: 1px solid #ddd; 
  &:last-of-type {
    border-right: none; 
  }
  color: #364152;
`;


const TablePaginationStyled = styled(TablePagination)`
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: #fff; /* Ensure it blends with your table's background */
`;

interface ProductTableProps {
  data: Product[];
}

const ProductTable: React.FC<ProductTableProps> = ({ data }) => {
const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
const [open, setOpen] = useState(false);

const columns: ColumnDef<Product, any>[] = [
  { header: "ID", accessorKey: "id" },
  { header: "Title", accessorKey: "title" },
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
    header: "Discount Percentage",
    accessorKey: "discountPercentage",
    cell: (info) => (
      <ProgressCircle value={info.getValue() as number} size={40} />
    ),
  },
  { header: "Rating", accessorKey: "rating" },
  { header: "Stock", accessorKey: "stock" },
  {
    header: "Tags",
    accessorKey: "tags",
    cell: (info) => info.getValue().join(", "),
  },
  { header: "Brand", accessorKey: "brand" },
  {
    header: "Actions",
    id: "actions",
    size: 200,
    cell: ({ row }) => (
      <div style={{ display: "flex", gap: "8px" }}>
        <IconButton onClick={() => handleOpen(row.original?.id)}>
          <Image
            src="/images/review.svg"
            alt="review"
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
});

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


  return (
    <>
      <TableContainer
        component={Paper}
        className="relative"
        sx={{ maxHeight: "452px" }}
      >
        <StyledTable>
          <TableHead>
            {getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableCell
                    sx={{
                      color: "success.dark",
                      fontWeight: "bold",
                      fontSize: 14,
                    }}
                    key={header.id}
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
          <TableBody>
            {getRowModel().rows.map((row, rowIndex) => (
              <StyledTableRow key={row.id} isEven={rowIndex % 2 === 0}>
                {row.getVisibleCells().map((cell) => (
                  <StyledTableCell key={cell.id} sx={{ paddingY: "66.5px" }}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </StyledTableCell>
                ))}
              </StyledTableRow>
            ))}
          </TableBody>
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
