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
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const paginatedData = data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

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
      cell: info => (
        <div className='truncate-text'>
          {info.getValue() as string}
        </div>
      ),
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
      cell: info => (
        <ProgressCircle value={info.getValue() as number} size={40} />
      ),
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
        <div style={{ display: 'flex', gap: '8px' }}>
          <IconButton onClick={() => handleOpen(row.original?.id)}>
            <Image src="/images/review.svg" alt='review' width={24} height={24} loading='lazy' />
          </IconButton>
          <IconButton>
            <Image src="/images/tabler-icon-edit.svg" alt='edit' width={24} height={24} loading='lazy' />
          </IconButton>
          <IconButton>
            <Image src="/images/tabler-icon-share.svg" alt='upload' width={24} height={24} loading='lazy' />
          </IconButton>
          <IconButton>
            <Image src="/images/tabler-icon-trash.svg" alt='trash' width={24} height={24} loading='lazy' />
          </IconButton>
        </div>
      ),
    },
  ];

  const { getHeaderGroups, getRowModel } = useReactTable({
    data: paginatedData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handlePageChange = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  const handleOpen = async (id: number) => {
    try {
      const product = await fetchProductById(id);
      setSelectedProduct(product);
      setOpen(true);
    } catch (error) {
      console.error('Failed to fetch product details:', error);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedProduct(null);
  };


  return (
    <>
      <TableContainer component={Paper} className='relative'>
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
        <TablePaginationStyled
          rowsPerPageOptions={[10, 25, 50]}
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      </TableContainer>
      <ProductDetailModal open={open} onClose={handleClose} product={selectedProduct} />
    </>
  );
};

export default ProductTable;
