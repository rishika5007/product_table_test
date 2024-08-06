'use client'
import React, { useEffect, useState } from 'react';
import {
  Modal,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';
import styled from '@emotion/styled';
import { Product } from '../lib/interface';
import { fetchProductById } from '../lib/api'; // Import the API helper
import Image from 'next/image';

const StyledTable = styled(Table)`
  min-width: 650px;
`;

const StyledTableCell = styled(TableCell)`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const ProductTable = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then((response) => response.json())
      .then((data) => setProducts(data.products));
  }, []);

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
      <TableContainer component={Paper}>
        <StyledTable>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Discount Percentage</TableCell>
              <TableCell>Rating</TableCell>
              <TableCell>Stock</TableCell>
              <TableCell>Tags</TableCell>
              <TableCell>Brand</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.id}</TableCell>
                <TableCell>{product.title}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.discountPercentage}</TableCell>
                <TableCell>{product.rating}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>{product.tags.join(', ')}</TableCell>
                <TableCell>{product.brand}</TableCell>
                <StyledTableCell onClick={() => handleOpen(product.id)}>
                  <Image src="/images/review.svg" alt='review' width={24} height={24} loading='lazy' /> 
                  <Image src="/images/tabler-icon-edit.svg" alt='edit' width={24} height={24} loading='lazy' /> 
                  <Image src="/images/tabler-icon-share-2.svg" alt='share' width={24} height={24} loading='lazy' /> 
                  <Image src="/images/tabler-icon-share.svg" alt='upload' width={24} height={24} loading='lazy' /> 
                  <Image src="/images/tabler-icon-trash.svg" alt='trash' width={24} height={24} loading='lazy' /> 
                </StyledTableCell>
              </TableRow>
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
              <p>Category: {selectedProduct.category}</p>
              <p>Price: ${selectedProduct.price}</p>
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
