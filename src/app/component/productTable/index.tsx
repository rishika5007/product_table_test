'use client'
import React, { useState } from 'react';
import { useReactTable, ColumnDef, getCoreRowModel, flexRender } from '@tanstack/react-table';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Modal } from '@mui/material';
import styled from '@emotion/styled';
import { Product } from '@components/app/lib/interface';
import Image from 'next/image';

const StyledTable = styled(Table)`
  min-width: 650px;
`;

const StyledTableRow = styled(TableRow) <{ isEven: boolean }>`
  background-color: ${({ isEven }) => (isEven ? '#F5F5F5' : '#ffffff')};
  cursor: pointer;
`;

const StyledTableCell = styled(TableCell)`
  border-right: 1px solid #ddd; 
  &:last-of-type {
    border-right: none; 
  }
`;

interface ProductTableProps {
  data: Product[];
}

const ProductTable: React.FC<ProductTableProps> = ({ data }) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [open, setOpen] = useState(false);

  const columns: ColumnDef<Product, any>[] = [
    {
      header: 'ID',
      accessorKey: 'id',
    },
    {
      header: 'Title',
      accessorKey: 'title',
    },
    {
      header: 'Description',
      accessorKey: 'description',
    },
    {
      header: 'Category',
      accessorKey: 'category',
    },
    {
      header: 'Price',
      accessorKey: 'price',
    },
    {
      header: 'Discount Percentage',
      accessorKey: 'discountPercentage',
    },
    {
      header: 'Rating',
      accessorKey: 'rating',
    },
    {
      header: 'Stock',
      accessorKey: 'stock',
    },
    {
      header: 'Tags',
      accessorKey: 'tags',
      cell: info => info.getValue().join(', '),
    },
    {
      header: 'Brand',
      accessorKey: 'brand',
    },
    {
      header: 'Actions',
      id: 'actions',
      cell: ({ row }) => (
        <div
          className='flex'
          onClick={() => handleOpen(row.original)}
        >
          <Image src="/images/review.svg" alt='review' width={24} height={24} loading='lazy' />
          <Image src="/images/tabler-icon-edit.svg" alt='edit' width={24} height={24} loading='lazy' />
          <Image src="/images/tabler-icon-share.svg" alt='upload' width={24} height={24} loading='lazy' />
          <Image src="/images/tabler-icon-trash.svg" alt='trash' width={24} height={24} loading='lazy' />
        </div>
      ),
    },
  ];

  const { getHeaderGroups, getRowModel } = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleOpen = (product: Product) => {
    setSelectedProduct(product);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedProduct(null);
  };


  return (
    <>
      <TableContainer component={Paper}>
        <StyledTable>
          <TableHead>
            {getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <TableCell sx={{
                    color: 'success.dark',
                    fontWeight: 'bold',
                    fontSize: 14,
                  }} key={header.id}>
                    <span className='flex'>
                      {header.column.columnDef.header as string}
                      <Image src="/images/dot_menu.svg" width={24} height={24} alt='more icon' loading='lazy' />
                    </span>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {getRowModel().rows.map((row, rowIndex) => (
              <StyledTableRow key={row.id} isEven={rowIndex % 2 === 0}>
                {row.getVisibleCells().map(cell => (
                  <StyledTableCell key={cell.id} sx={{ paddingY: "66.5px" }}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </StyledTableCell>
                ))}
              </StyledTableRow>
            ))}
          </TableBody>
        </StyledTable>
      </TableContainer>

      <Modal open={open} onClose={handleClose}>
        <div style={{ padding: '20px', backgroundColor: 'white', margin: '100px auto', width: '50%' }}>
          {selectedProduct && (
            <>
              <h1>{selectedProduct.title}</h1>
              <p>{selectedProduct.description}</p>
              <p>Price: ${selectedProduct.price}</p>
              <p>Category: {selectedProduct.category}</p>
              <p>Discount: {selectedProduct.discountPercentage}%</p>
              <p>Rating: {selectedProduct.rating}</p>
              <p>Stock: {selectedProduct.stock}</p>
              <p>Tags: {selectedProduct.tags.join(', ')}</p>
              <p>Brand: {selectedProduct.brand}</p>
              <Button onClick={handleClose} variant="contained" color="secondary">Close</Button>
            </>
          )}
        </div>
      </Modal>
    </>
  );
};

export default ProductTable;
