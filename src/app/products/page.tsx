import React from 'react'
import ProductTable from '../component/productTable'
import { fetchProducts } from '../lib/api';
import Header from '../component/header/Header';
import Sidebar from '../component/sidebar';

export default async function ProductList() {
    const ProductData = await getData()
    return (
      <>
        <Header />
        <Sidebar />
        <div className="flex justify-center items-center bg-white rounded-2xl">
          <ProductTable data={ProductData} />
        </div>
      </>
    );
}

async function getData() {
    const res = await fetchProducts()
    return res;
}