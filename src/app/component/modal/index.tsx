'use client';
import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box, Card, CardContent, Rating } from '@mui/material';
import { Product } from '@components/app/lib/interface';

interface ProductDetailModalProps {
    open: boolean;
    onClose: () => void;
    product: Product | null;
}

function formatDate(date: Date): string {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
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
            <DialogTitle sx={infoHeading}>
                {product ? product.title : 'Product Details'}
                <Typography variant="body1" sx={infoValue}>
                    {product ? product.description : ''}
                </Typography>
            </DialogTitle>
            <DialogContent dividers sx={infoContainer}>
                {product && product.reviews.length > 0 ? (
                    product.reviews.map((review, index) => (
                        <Card key={index} sx={{ marginBottom: '16px' }}>
                            <CardContent>
                                <Typography variant="h6" sx={infoHeading}>
                                    Review {index + 1}
                                </Typography>
                                <Typography variant="body1" sx={infoValue}>
                                    <strong>{'Review Name: '}</strong>{review.reviewerName || 'NA'}
                                </Typography>
                                <Typography variant="body1" sx={infoValue}>
                                    <strong>{'Review Email: '}</strong>{review.reviewerEmail || 'NA'}
                                </Typography>
                                <Typography variant="body1" sx={infoValue}>
                                    <strong>{'Rating: '}</strong>
                                    <Rating
                                        name={`rating-${index}`}
                                        value={review.rating || 0}
                                        readOnly
                                        precision={0.5}
                                    />
                                </Typography>
                                <Typography variant="body1" sx={infoValue}>
                                    <strong>{'Date: '}</strong>{formatDate(new Date(review.date)) || 'NA'}
                                </Typography>
                                <Typography variant="body1" sx={infoValue}>
                                    <strong>{'Comment: '}</strong>{review.comment || 'NA'}
                                </Typography>
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <Typography>No reviews available.</Typography>
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

const infoHeading = {
    minWidth: '150px',
    textAlign: 'center',
    fontWeight: 'bold',
    paddingY: '10px',
};

const infoValue = {
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    paddingY: '5px',
    paddingLeft: '2px',
    alignItems: 'center',
    gap: '8px',
};

const infoContainer = {
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
}