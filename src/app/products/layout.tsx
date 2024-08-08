'use client'
import React, { useState } from 'react';
import styled from '@emotion/styled';
import Sidebar from '../component/dashboard/sidemenu';
import Header from '../component/dashboard/header';

const MainContent = styled('div')<{ isSidebarOpen: boolean }>`
  margin-top: 64px; 
  margin-left: ${(props) => (props.isSidebarOpen ? '270px' : '0')};
  transition: margin-left 0.3s;
  padding: 16px;
  width: 100%;
`;

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const handleSidebarToggle = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar isOpen={isSidebarOpen} onToggle={handleSidebarToggle} />
      <MainContent isSidebarOpen={isSidebarOpen}>
        <Header onSidebarToggle={handleSidebarToggle} />
        {children}
      </MainContent>
    </div>
  );
};


export default Layout;
