import React from 'react';
import ProductList from '../component/layout';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const DashboardPage: React.FC = () => {
   const cookieStore = cookies();
   const token = cookieStore.get("authToken");

   if (!token) {
     redirect("/");
   }
  return <ProductList />;
};

export default DashboardPage;
