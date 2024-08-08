'use client'
import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import AccordionPanel from '../accordion';
import sidebarData from '../../lib/mock.json'
const SidebarContainer = styled('div')<{ isOpen: boolean }>`
  width: ${(props) => (props.isOpen ? '270px' : '0')};
  height: 100%;
  background-color: white;
  color: white;
  overflow: hidden;
  transition: width 0.3s;
  position: fixed;
  top: 110px; // Adjust based on header height
  left: 0;
  bottom: 0;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.5);
  padding: ${(props) => (props.isOpen ? '0px' : '0')};
`;

const Sidebar: React.FC<{ isOpen: boolean; onToggle: () => void }> = ({ isOpen, onToggle }) => {
  const [expanded, setExpanded] = useState<string | true>(true);

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : true);
  };

  return (
    <SidebarContainer isOpen={isOpen}>
      {sidebarData.map((panel) => (
        <AccordionPanel key={panel.id} panel={panel} expanded={expanded} onChange={handleChange} />
      ))}
    </SidebarContainer>
  );
};

export default Sidebar;

