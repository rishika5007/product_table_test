import React from 'react'
import ProductTable from '../component/productTable'
import { ColumnDef } from '@tanstack/react-table';
import { Product } from '../lib/interface';
import { fetchProducts } from '../lib/api';
import Header from '../component/header/Header';
import Sidebar from '../component/sidebar';

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
    },
    {
        header: 'Brand',
        accessorKey: 'brand',
    },
];


export default async function ProductList() {
    const ProductData = await getData()
    return (
      <>
        <Header />
        <Sidebar />
        <div className="flex justify-center items-center bg-white rounded-2xl">
          <ProductTable columns={columns} data={ProductData} />
        </div>
      </>
    );
}

async function getData() {
    const res = await fetchProducts()
    return res;
}