import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  IconButton,
  Button
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import LogoutIcon from "@mui/icons-material/Logout";

import Navbar from "./Navbar";

const expandedWidth = 220;
const collapsedWidth = 70;

function DashboardLayout({ children }) {

  const navigate = useNavigate();

  const [open, setOpen] = useState(true);

  const toggleSidebar = () => {
    setOpen(!open);
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    navigate("/");
  };

  return (

    <Box sx={{ display: "flex" }}>

      {/* Sidebar */}

      <Drawer
        variant="permanent"
        sx={{
          width: open ? expandedWidth : collapsedWidth,
          flexShrink: 0,

          "& .MuiDrawer-paper": {
            width: open ? expandedWidth : collapsedWidth,
            transition: "0.3s",
            overflowX: "hidden",
            background: "linear-gradient(180deg,#0f172a,#1e293b)",
            color: "white",
            border: "none"
          }
        }}
      >

        {/* Header */}

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: open ? "space-between" : "center",
            p: 2
          }}
        >

          {open && (
            <Typography variant="h6" fontWeight="bold">
              Complaint App
            </Typography>
          )}

          <IconButton onClick={toggleSidebar} sx={{ color: "white" }}>
            <MenuIcon />
          </IconButton>

        </Box>

        {/* Menu */}

        <List>

          <ListItem
            button
            onClick={() => navigate("/complaints")}
            sx={{
              "&:hover": {
                background: "rgba(255,255,255,0.1)"
              }
            }}
          >

            <ListItemIcon sx={{ color: "white" }}>
              <DashboardIcon />
            </ListItemIcon>

            {open && <ListItemText primary="Dashboard" />}

          </ListItem>

          <ListItem
            button
            onClick={() => navigate("/add-complaint")}
            sx={{
              "&:hover": {
                background: "rgba(255,255,255,0.1)"
              }
            }}
          >

            <ListItemIcon sx={{ color: "white" }}>
              <AddCircleOutlineIcon />
            </ListItemIcon>

            {open && <ListItemText primary="Add Complaint" />}

          </ListItem>

        </List>

        {/* Logout */}

        <Box sx={{ p: 2, mt: "auto" }}>

          <Button
            variant="contained"
            color="error"
            fullWidth={open}
            startIcon={<LogoutIcon />}
            onClick={logout}
          >

            {open ? "Logout" : ""}

          </Button>

        </Box>

      </Drawer>

      {/* Main Content */}

      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          background: "#f8fafc"
        }}
      >

        {/* Top Navbar */}

        <Navbar />

        {/* Page Content */}

        <Box sx={{ p: 4 }}>
          {children}
        </Box>

      </Box>

    </Box>

  );

}

export default DashboardLayout;