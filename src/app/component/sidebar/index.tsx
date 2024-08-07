"use client";

import React, { useState } from "react";
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
  IconButton,
} from "@mui/material";
import {
  ExpandMore as ExpandMoreIcon,
  Settings as SettingsIcon,
  People as PeopleIcon,
  Info as InfoIcon,
  LocalOffer as LocalOfferIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import Image from "next/image";

const Sidebar = () => {
  const [expanded, setExpanded] = useState<string | false>("panel2");
  const [open, setOpen] = useState<boolean>(true);

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const toggleSidebar = () => {
    setOpen(!open);
  };

  return (
    <>
      <IconButton
        onClick={toggleSidebar}
        sx={{ position: "absolute", top: 14, left: 248, zIndex: 1200 }}
      >
        <Box
          sx={{
            backgroundColor: "#DAE7F9",
            height: "36px",
            width: "36px",
            borderRadius: "8px",
          }}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          {open ? (
            <CloseIcon sx={{ fontSize: "15px" }} />
          ) : (
            <Image src="/images/dashes.svg" alt="bell" width={13} height={15} />
          )}
        </Box>
      </IconButton>

      <Box
        sx={{
          width: 284,
          bgcolor: "#fff",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          borderRight: "1px solid #ddd",
          pr: "20px",
          position: "fixed",
          top: 0,
          left: 0,
          transform: `translateX(${open ? "0" : "-100%"})`,
          transition: "transform 0.3s ease",
          marginTop: "79px",
          paddingTop: "20px",
          paddingInline: "20px",
        }}
      >
        {/* Accordion Item 1 */}
        <Accordion
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
          sx={{
            boxShadow: "none",
            marginInline: "20px",
            "&:before": {
              display: "none",
            },
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            sx={{
              padding: "0", // Remove default padding
              width: "100%",
              display: "flex",
              alignItems: "center",

              boxSizing: "border-box",
              overflow: "hidden", // Prevents content from overflowing
            }}
          >
            <Box
              sx={{ display: "flex", alignItems: "center", columnGap: "12px" }}
            >
              <Image
                src="/images/analytics.svg"
                alt="bell"
                width={23}
                height={24}
              />
              <Typography noWrap sx={{ fontSize: "14px" }}>
                Analytics
              </Typography>{" "}
              {/* Prevent text overflow */}
            </Box>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              padding: "8px 16px",
              boxSizing: "border-box", // Ensure padding and border are included in the width
            }}
          >
            <List sx={{ paddingLeft: "12px" }}>
              <ListItem>
                <ListItemIcon>
                  <InfoIcon />
                </ListItemIcon>
                <ListItemText sx={{ fontSize: "14px" }} primary="Overview" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <PeopleIcon />
                </ListItemIcon>
                <ListItemText sx={{ fontSize: "14px" }} primary="Users" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <SettingsIcon />
                </ListItemIcon>
                <ListItemText sx={{ fontSize: "14px" }} primary="Settings" />
              </ListItem>
            </List>
          </AccordionDetails>
        </Accordion>

        <Box
          sx={{
            backgroundColor: "#E0E0E0",
            height: "1px",
            width: "244px",
            marginBlock: "6px",
          }}
        ></Box>

        {/* Accordion Item 2 */}
        <Accordion
          expanded={expanded === "panel2"}
          onChange={handleChange("panel2")}
          sx={{
            boxShadow: "none",
            marginInline: "20px",
            "&:before": {
              display: "none",
            },
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
            sx={{
              padding: "0", // Remove default padding
              width: "100%", // Ensure it fits within container
              display: "flex",
              alignItems: "center",

              boxSizing: "border-box",
              overflow: "hidden", // Prevents content from overflowing
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                columnGap: "12px",
                flexGrow: 1,
              }}
            >
              <Image
                src="/images/earth.svg"
                alt="bell"
                width={23}
                height={24}
              />
              <Typography noWrap sx={{ fontSize: "14px" }}>
                Project
              </Typography>{" "}
              {/* Prevent text overflow */}
            </Box>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              padding: "8px 16px",
              boxSizing: "border-box", // Ensure padding and border are included in the width
            }}
          >
            <List sx={{ pl: "20px" }}>
              <ListItem sx={{ display: "flex", columnGap: "30px" }}>
                <Image
                  src="/images/add-project.svg"
                  alt="bell"
                  width={23}
                  height={24}
                />
                <ListItemText sx={{ fontSize: "14px" }} primary="Add Project" />
              </ListItem>
              <ListItem sx={{ display: "flex", columnGap: "30px" }}>
                <Image
                  src="/images/earth.svg"
                  alt="bell"
                  width={23}
                  height={24}
                />
                <ListItemText
                  sx={{ fontSize: "14px" }}
                  primary="Project Table"
                />
              </ListItem>
              <ListItem sx={{ display: "flex", columnGap: "30px" }}>
                <Image
                  src="/images/delete.svg"
                  alt="bell"
                  width={23}
                  height={24}
                />
                <ListItemText sx={{ fontSize: "14px" }} primary="Deleted" />
              </ListItem>
            </List>
          </AccordionDetails>
        </Accordion>

        <Box
          sx={{
            backgroundColor: "#E0E0E0",
            height: "1px",
            width: "244px",
            marginBlock: "6px",
          }}
        ></Box>

        {/* Accordion Item 3 */}
        <Accordion
          expanded={expanded === "panel3"}
          onChange={handleChange("panel3")}
          sx={{
            boxShadow: "none",
            marginInline: "20px",
            "&:before": {
              display: "none",
            },
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3a-content"
            id="panel3a-header"
            sx={{
              padding: "0", // Remove default padding
              width: "100%", // Ensure it fits within container
              display: "flex",
              alignItems: "center",

              boxSizing: "border-box",
              overflow: "hidden", // Prevents content from overflowing
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                columnGap: "12px",
                flexGrow: 1,
              }}
            >
              <Image
                src="/images/property.svg"
                alt="bell"
                width={23}
                height={24}
              />
              <Typography noWrap sx={{ fontSize: "14px" }}>
                Property
              </Typography>{" "}
              {/* Prevent text overflow */}
            </Box>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              padding: "8px 16px",
              boxSizing: "border-box", // Ensure padding and border are included in the width
            }}
          >
            <List sx={{ pl: "20px" }}>
              <ListItem>
                <ListItemIcon>
                  <PeopleIcon />
                </ListItemIcon>
                <ListItemText
                  sx={{ fontSize: "14px" }}
                  primary="Profile Settings"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <SettingsIcon />
                </ListItemIcon>
                <ListItemText
                  sx={{ fontSize: "14px" }}
                  primary="System Settings"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <LocalOfferIcon />
                </ListItemIcon>
                <ListItemText sx={{ fontSize: "14px" }} primary="Preferences" />
              </ListItem>
            </List>
          </AccordionDetails>
        </Accordion>

        <Box
          sx={{
            backgroundColor: "#E0E0E0",
            height: "1px",
            width: "244px",
            marginBlock: "6px",
          }}
        ></Box>

        {/* Accordion Item 4 */}
        <Accordion
          expanded={expanded === "panel4"}
          onChange={handleChange("panel4")}
          sx={{
            boxShadow: "none",
            marginInline: "20px",
            "&:before": {
              display: "none",
            },
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel4a-content"
            id="panel4a-header"
            sx={{
              padding: "0", // Remove default padding
              width: "100%", // Ensure it fits within container
              display: "flex",
              alignItems: "center",

              boxSizing: "border-box",
              overflow: "hidden", // Prevents content from overflowing
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                columnGap: "12px",
                flexGrow: 1,
              }}
            >
              <Image
                src="/images/problem.svg"
                alt="bell"
                width={23}
                height={24}
              />
              <Typography noWrap sx={{ fontSize: "14px" }}>
                Problem Reports
              </Typography>{" "}
              {/* Prevent text overflow */}
            </Box>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              padding: "8px 16px",
              boxSizing: "border-box", // Ensure padding and border are included in the width
            }}
          >
            <List sx={{ pl: "20px" }}>
              <ListItem>
                <ListItemIcon>
                  <PeopleIcon />
                </ListItemIcon>
                <ListItemText
                  sx={{ fontSize: "14px" }}
                  primary="Profile Settings"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <SettingsIcon />
                </ListItemIcon>
                <ListItemText
                  sx={{ fontSize: "14px" }}
                  primary="System Settings"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <LocalOfferIcon />
                </ListItemIcon>
                <ListItemText sx={{ fontSize: "14px" }} primary="Preferences" />
              </ListItem>
            </List>
          </AccordionDetails>
        </Accordion>

        <Box
          sx={{
            backgroundColor: "#E0E0E0",
            height: "1px",
            width: "244px",
            marginBlock: "6px",
          }}
        ></Box>

        {/* Accordion Item 5 */}
        <Accordion
          expanded={expanded === "panel5"}
          onChange={handleChange("panel5")}
          sx={{
            boxShadow: "none",
            borderBottom: "none",
            marginInline: "20px",
            "&:before": {
              display: "none",
            },
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel5a-content"
            id="panel5a-header"
            sx={{
              padding: "0", // Remove default padding
              width: "100%", // Ensure it fits within container
              display: "flex",
              alignItems: "center",

              boxSizing: "border-box",
              overflow: "hidden", // Prevents content from overflowing
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                columnGap: "12px",
                flexGrow: 1,
              }}
            >
              <Image
                src="/images/sidebar-settings.svg"
                alt="bell"
                width={23}
                height={24}
              />
              <Typography noWrap sx={{ fontSize: "14px" }}>
                Settings
              </Typography>{" "}
              {/* Prevent text overflow */}
            </Box>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              // padding: "8px 16px",
              boxSizing: "border-box", // Ensure padding and border are included in the width
            }}
          >
            <List sx={{ pl: "20px" }}>
              <ListItem>
                <ListItemIcon>
                  <PeopleIcon />
                </ListItemIcon>
                <ListItemText
                  sx={{ fontSize: "14px" }}
                  primary="Profile Settings"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <SettingsIcon />
                </ListItemIcon>
                <ListItemText
                  sx={{ fontSize: "14px" }}
                  primary="System Settings"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <LocalOfferIcon />
                </ListItemIcon>
                <ListItemText sx={{ fontSize: "14px" }} primary="Preferences" />
              </ListItem>
            </List>
          </AccordionDetails>
        </Accordion>
      </Box>
    </>
  );
};

export default Sidebar;
