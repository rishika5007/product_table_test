'use client'
import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';
import { Product } from '@components/app/lib/interface';

interface ProductDetailModalProps {
  open: boolean;
  onClose: () => void;
  product: Product | null;
}

const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ open, onClose, product }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        style: {
          padding: '20px',
        },
      }}
    >
      <DialogTitle>
        {product ? product.title : 'Product Details'}
      </DialogTitle>
      <DialogContent dividers>
        {product ? (
          <>
            <Typography variant="h6">
              <strong>Category:</strong> {product.category}
            </Typography>
            <Typography variant="body1" paragraph>
              {product.description}
            </Typography>
            <Typography variant="body1">
              <strong>Price:</strong> ${product.price}
            </Typography>
            <Typography variant="body1">
              <strong>Discount:</strong> {product.discountPercentage}%
            </Typography>
            <Typography variant="body1">
              <strong>Rating:</strong> {product.rating}
            </Typography>
            <Typography variant="body1">
              <strong>Stock:</strong> {product.stock}
            </Typography>
            <Typography variant="body1">
              <strong>Tags:</strong> {product.tags.join(' , ')}
            </Typography>
            <Typography variant="body1">
              <strong>Brand:</strong> {product.brand}
            </Typography>
          </>
        ) : (
          <Typography>No product details available.</Typography>
        )}
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center' }}>
        <Button onClick={onClose} variant="contained" color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductDetailModal;
