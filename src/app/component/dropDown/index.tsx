'use client'
import React, { useState } from 'react';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Box, Chip, FormControl, InputLabel, MenuItem, OutlinedInput } from '@mui/material';

const TagsCell = ({ value }: { value: string[] }) => {
    const [tags, setTags] = React.useState<string>();
    const [open, setOpen] = React.useState(false);

    const handleChange = (event: SelectChangeEvent<typeof tags>) => {
        setTags(event.target.value);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    return (
        <FormControl fullWidth>
            <InputLabel id="demo-controlled-open-select-label">Tags</InputLabel>
            <Select
                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                open={open}
                defaultValue={value[0]}
                onClose={handleClose}
                onOpen={handleOpen}
                value={tags}
                onChange={handleChange}
                input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
            >
                {value.map((name) => (
                    <MenuItem
                        key={name}
                        value={name}
                    >
                        {name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default TagsCell;
