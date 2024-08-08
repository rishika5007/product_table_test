import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, List, ListItem, ListItemText, Box, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Image from 'next/image';
import styled from '@emotion/styled';

const StyledAccordion = styled(Accordion)`
  box-shadow: none;
  margin-inline: 20px;
  &.MuiAccordion-root:before {
    display: none;
  }
`;

const AccordionPanel: React.FC<{ panel: any; expanded: string | true; onChange: (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => void }> = ({ panel, expanded, onChange }) => {
  return (<>
    <StyledAccordion
      expanded={expanded === panel.id}
      onChange={onChange(panel.id)}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`${panel.id}-content`}
        id={`${panel.id}-header`}
      >
        <Box sx={{ display: "flex", alignItems: "center", columnGap: "12px", flexGrow: 1 }}>
          <Image src={panel.icon} alt={panel.title} width={23} height={24} />
          <Typography noWrap sx={{ fontSize: "14px" }}>{panel.title}</Typography>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <List>
          {panel.items.map((item: any, index: number) => (
            <ListItem key={index} sx={{ display: "flex", columnGap: "30px" }}>
              <Image src={item.icon} alt={item.text} width={23} height={24} />
              <ListItemText sx={{ fontSize: "14px" }} primary={item.text} />
            </ListItem>
          ))}
        </List>
      </AccordionDetails>
    </StyledAccordion>
    <Box
     sx={{
       backgroundColor: "#E0E0E0",
       height: "1px",
       width: "215px",
       marginBlock: "6px",
       marginInline: '20px'
     }}
   ></Box>
 </> );
};

export default AccordionPanel;
