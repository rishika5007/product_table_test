'use client'
import React, { useCallback } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box } from '@mui/material';
import { Product } from '@components/app/lib/interface';
import ProgressCircle from '../progress/progress';

interface ProductDetailModalProps {
    open: boolean;
    onClose: () => void;
    product: Product | null;
}

const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ open, onClose, product }) => {
    const handleClose = useCallback(() => {
      onClose();
    }, [onClose]);
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
            <DialogTitle sx={infoHeading}>
                {product ? product.title : 'Product Details'}
                <Typography variant="body1" sx={infoValue}>
                    {product ? product?.description :''}
                </Typography>
            </DialogTitle>
            <DialogContent dividers>
                {product ? (
                    <>
                        <Box sx={infoContainer}>
                            <Typography variant="body1" sx={infoHeading}>
                                Category:
                            </Typography>
                            <Typography variant="body1" sx={infoValue}>
                                {product.category}
                            </Typography>
                        </Box>
                        <Box sx={infoContainer}>
                            <Typography variant="body1" sx={infoHeading}>
                                Price:
                            </Typography>
                            <Typography variant="body1" sx={infoValue}>
                                ${product.price}
                            </Typography>
                        </Box>
                        <Box sx={infoContainer}>
                            <Typography variant="body1" sx={infoHeading}>
                                Discount:
                            </Typography>
                            <Box sx={infoValue}>
                                <ProgressCircle value={product?.discountPercentage} size={40} />
                            </Box>
                        </Box>
                        <Box sx={infoContainer}>
                            <Typography variant="body1" sx={infoHeading}>
                                Rating:
                            </Typography>
                            <Typography variant="body1" sx={infoValue}>
                                {product.rating}
                            </Typography>
                        </Box>
                        <Box sx={infoContainer}>
                            <Typography variant="body1" sx={infoHeading}>
                                Stock:
                            </Typography>
                            <Typography variant="body1" sx={infoValue}>
                                {product.stock}
                            </Typography>
                        </Box>
                        <Box sx={infoContainer}>
                            <Typography variant="body1" sx={infoHeading}>
                                Tags:
                            </Typography>
                            <Typography variant="body1" sx={infoValue}>
                                {product.tags.join(' , ')}
                            </Typography>
                        </Box>
                        <Box sx={infoContainer}>
                            <Typography variant="body1" sx={infoHeading}>
                                Brand:
                            </Typography>
                            <Typography variant="body1" sx={infoValue}>
                                {product.brand}
                            </Typography>
                        </Box>
                    </>
                ) : (
                    <Typography>No product details available.</Typography>
                )}
            </DialogContent>
            <DialogActions sx={{ justifyContent: 'center' }}>
                <Button onClick={handleClose} variant="contained" color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ProductDetailModal;

const infoContainer = {
    display: 'flex',
    alignItems: 'center',
    paddingY: '10px',
};

const infoHeading = {
    minWidth: '150px',
    fontWeight: 'bold',
};

const infoValue = {
    textAlign: 'left',
};
