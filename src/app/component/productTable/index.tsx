'use client'
import React from 'react';
import { useReactTable, ColumnDef, getCoreRowModel } from '@tanstack/react-table';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import styled from '@emotion/styled';
import { Product } from '@components/app/lib/interface';

const StyledTable = styled(Table)`
  min-width: 650px;
`;

interface ProductTableProps {
  columns: ColumnDef<Product, any>[];
  data: Product[];
}

const ProductTable: React.FC<ProductTableProps> = ({ columns, data }) => {
  const { getHeaderGroups, getRowModel } = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <TableContainer component={Paper}>
      <StyledTable>
        <TableHead>
          {getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <TableCell key={header.id}>
                  {header.column.columnDef.header as string}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody>
          {getRowModel().rows.map(row => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map(cell => (
                <TableCell key={cell.id}>
                 {String(cell.getValue())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </StyledTable>
    </TableContainer>
  );
};

export default ProductTable;
