import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  AppBar,
  Typography
} from "@mui/material";

const drawerWidth = 220;

function Layout() {

  const navigate = useNavigate();

  return (

    <Box sx={{ display: "flex" }}>

      <AppBar
        position="fixed"
        sx={{ zIndex: 1201 }}
      >
        <Toolbar>
          <Typography variant="h6">
            Complaint Management System
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          "& .MuiDrawer-paper": {
            width: drawerWidth
          }
        }}
      >

        <Toolbar/>

        <List>

          <ListItem button onClick={()=>navigate("/complaints")}>
            <ListItemText primary="Dashboard"/>
          </ListItem>

          <ListItem button onClick={()=>navigate("/add-complaint")}>
            <ListItemText primary="Add Complaint"/>
          </ListItem>

        </List>

      </Drawer>

      <Box
        component="main"
        sx={{ flexGrow:1, p:3 }}
      >
        <Toolbar/>
        <Outlet/>
      </Box>

    </Box>

  );

}

export default Layout;