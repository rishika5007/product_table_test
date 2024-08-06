"use client"
import React, { useCallback } from "react";
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  ExpandMore as ExpandMoreIcon,
  Settings as SettingsIcon,
  People as PeopleIcon,
  Info as InfoIcon,
  LocalOffer as LocalOfferIcon,
} from "@mui/icons-material";
import Image from "next/image";

const Sidebar = () => {
  const [expanded, setExpanded] = React.useState<string | false>("panel2"); // Set default to 'panel2'

  const handleChange = useCallback(
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    },
    []
  );

  return (
    <Box
      sx={{
        width: 284,
        bgcolor: "#fff",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        borderRight: "1px solid #ddd",
        pr: "20px",
      }}
    >
      {/* Accordion Item 1 */}
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
        sx={{
          boxShadow: "none",
          borderBottom: "1px solid #ddd",
          "&:before": {
            display: "none",
          },
          "& .MuiAccordionSummary-root": {
            minHeight: 0,
            padding: 0,
          },
          "& .MuiAccordionSummary-content": {
            margin: 0,
            alignItems: "center",
            padding: "24px 16px",
          },
          "& .MuiAccordionDetails-root": {
            padding: 0,
          },
          "&.Mui-expanded": {
            margin: 0,
          },
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Box sx={{ display: "flex", columnGap: "12px" }}>
            <Image
              src="/images/analytics.svg"
              alt="bell"
              width={23}
              height={24}
            />
            <Typography>Analytics</Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <List sx={{ paddingLeft: "12px" }}>
            <ListItem>
              <ListItemIcon>
                <InfoIcon />
              </ListItemIcon>
              <ListItemText primary="Overview" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="Users" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItem>
          </List>
        </AccordionDetails>
      </Accordion>

      {/* Accordion Item 2 */}
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
        sx={{
          boxShadow: "none",
          borderBottom: "1px solid #ddd",
          "&:before": {
            display: "none",
          },
          "& .MuiAccordionSummary-root": {
            minHeight: 0,
            padding: 0,
          },
          "& .MuiAccordionSummary-content": {
            margin: 0,
            alignItems: "center",
            padding: "24px 16px",
          },
          "& .MuiAccordionDetails-root": {
            padding: 0,
          },
          "&.Mui-expanded": {
            margin: 0,
          },
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Box sx={{ display: "flex", columnGap: "12px" }}>
            <Image src="/images/earth.svg" alt="bell" width={23} height={24} />
            <Typography>Project</Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <List sx={{ pl: "20px" }}>
            <ListItem sx={{ display: "flex", columnGap: "30px" }}>
              <Image
                src="/images/add-project.svg"
                alt="bell"
                width={23}
                height={24}
              />
              <ListItemText primary="Add Project" />
            </ListItem>
            <ListItem sx={{ display: "flex", columnGap: "30px" }}>
              <Image
                src="/images/earth.svg"
                alt="bell"
                width={23}
                height={24}
              />
              <ListItemText primary="Project Table" />
            </ListItem>
            <ListItem sx={{ display: "flex", columnGap: "30px" }}>
              <Image
                src="/images/delete.svg"
                alt="bell"
                width={23}
                height={24}
              />
              <ListItemText primary="Deleted" />
            </ListItem>
          </List>
        </AccordionDetails>
      </Accordion>

      {/* Accordion Item 3 */}
      <Accordion
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
        sx={{
          boxShadow: "none",
          borderBottom: "1px solid #ddd",
          "&:before": {
            display: "none",
          },
          "& .MuiAccordionSummary-root": {
            minHeight: 0,
            padding: 0,
          },
          "& .MuiAccordionSummary-content": {
            margin: 0,
            alignItems: "center",
            padding: "24px 16px",
          },
          "& .MuiAccordionDetails-root": {
            padding: 0,
          },
          "&.Mui-expanded": {
            margin: 0,
          },
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Box sx={{ display: "flex", columnGap: "12px" }}>
            <Image
              src="/images/property.svg"
              alt="bell"
              width={23}
              height={24}
            />
            <Typography>Property</Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <List sx={{ pl: "20px" }}>
            <ListItem>
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="Profile Settings" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="System Settings" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <LocalOfferIcon />
              </ListItemIcon>
              <ListItemText primary="Preferences" />
            </ListItem>
          </List>
        </AccordionDetails>
      </Accordion>

      {/* Accordion Item 4 */}
      <Accordion
        expanded={expanded === "panel4"}
        onChange={handleChange("panel4")}
        sx={{
          boxShadow: "none",
          borderBottom: "1px solid #ddd",
          "&:before": {
            display: "none",
          },
          "& .MuiAccordionSummary-root": {
            minHeight: 0,
            padding: 0,
          },
          "& .MuiAccordionSummary-content": {
            margin: 0,
            alignItems: "center",
            padding: "24px 16px",
          },
          "& .MuiAccordionDetails-root": {
            padding: 0,
          },
          "&.Mui-expanded": {
            margin: 0,
          },
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4a-content"
          id="panel4a-header"
        >
          <Box sx={{ display: "flex", columnGap: "12px" }}>
            <Image
              src="/images/problem.svg"
              alt="bell"
              width={23}
              height={24}
            />
            <Typography>Problem Reports</Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <List sx={{ pl: "20px" }}>
            <ListItem>
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="Profile Settings" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="System Settings" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <LocalOfferIcon />
              </ListItemIcon>
              <ListItemText primary="Preferences" />
            </ListItem>
          </List>
        </AccordionDetails>
      </Accordion>

      {/* Accordion Item 5 */}
      <Accordion
        expanded={expanded === "panel5"}
        onChange={handleChange("panel5")}
        sx={{
          boxShadow: "none",
          borderBottom: "none", // No border for the last accordion
          "&:before": {
            display: "none",
          },
          "& .MuiAccordionSummary-root": {
            minHeight: 0,
            padding: 0,
          },
          "& .MuiAccordionSummary-content": {
            margin: 0,
            alignItems: "center",
            padding: "24px 16px",
          },
          "& .MuiAccordionDetails-root": {
            padding: 0,
          },
          "&.Mui-expanded": {
            margin: 0,
          },
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel5a-content"
          id="panel5a-header"
        >
          <Box sx={{ display: "flex", columnGap: "12px" }}>
            <Image
              src="/images/sidebar-settings.svg"
              alt="bell"
              width={23}
              height={24}
            />
            <Typography>Settings</Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <List sx={{ pl: "20px" }}>
            <ListItem>
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="Profile Settings" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="System Settings" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <LocalOfferIcon />
              </ListItemIcon>
              <ListItemText primary="Preferences" />
            </ListItem>
          </List>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default Sidebar;
