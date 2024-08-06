'use client'
import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

interface ModalProps {
    open: boolean; 
    onClose: () => void;
    reviewContent: string; 
}

const Modal: React.FC<ModalProps> = ({ open, onClose, reviewContent }) => {
    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Review</DialogTitle>
            <DialogContent>
                <Typography variant="body1">{reviewContent}</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default Modal;
