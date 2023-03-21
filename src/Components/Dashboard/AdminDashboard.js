import { signOut } from "firebase/auth";
import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
} from "@material-ui/core";
import {
  Dashboard as DashboardIcon,
  List as ListIcon,
  AddCircleOutline as AddIcon,
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
  ShowChart as ShowChartIcon,
  Menu as MenuIcon,
} from "@material-ui/icons";
import { Link, Outlet, useNavigate } from "react-router-dom";
import auth from './../../firebase.init';
import { toast } from "react-toastify";
import { AddShoppingCart as ShoppingCartIcon } from "@material-ui/icons";


const drawerWidth = 150;

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);

  const handleReportsClick = () => {
    setOpen(!open);
  };

  const logout = () => {
    signOut(auth);
    navigate('/login')
    toast("Logout Successfully")
  };

  const [isDrawerOpen, setIsDrawerOpen] = React.useState(true);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>

          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Admin Dashboard
          </Typography>
          <Button color="inherit" onClick={logout} style={{ marginLeft: 'auto' }}>
            Logout
          </Button>

          <Button color="inherit" onClick={toggleDrawer} sx={{ mr: 2 }}>
            <MenuIcon />
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" sx={{ width: drawerWidth, flexShrink: 0, ...(isDrawerOpen ? {} : { display: "none" }) }}>
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            <ListItem button component={Link} to="/dashboard">
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button component={Link} to="all-user">
              <ListItemIcon>
                <ListIcon />
              </ListItemIcon>
              <ListItemText primary="Users" />
            </ListItem>
            <ListItem button component={Link} to="add-farmers">
              <ListItemIcon>
                <AddIcon />
              </ListItemIcon>
              <ListItemText primary="Add Farmers" />
            </ListItem>
            <ListItem button component={Link} to="tp-permit">
              <ListItemIcon>
                <AddIcon />
              </ListItemIcon>
              <ListItemText primary="Transport Permit" />
            </ListItem>
            <ListItem button component={Link} to="purchase-bale">
              <ListItemIcon>
                <ShoppingCartIcon />
              </ListItemIcon>
              <ListItemText primary="Purchase Bale" />
            </ListItem>
            <ListItem button onClick={handleReportsClick}>
              <ListItemIcon>
                <ShowChartIcon />
              </ListItemIcon>
              <ListItemText primary="Reports" />
              {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem button component={Link} to="production">
                  <ListItemText primary="Production Rate" />
                </ListItem>
                <ListItem button component={Link} to="/admin/gross-revenue">
                  <ListItemText primary="Gross Revenue" />
                </ListItem>
                <ListItem button component={Link} to="/admin/yearly-sales">
                  <ListItemText primary="Yearly Sales" />
                </ListItem>
              </List>
            </Collapse>
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Container maxWidth="lg">
          <Typography variant="h3" component="h1" align="center" gutterBottom>
            Welcome to the Admin Dashboard
          </Typography>
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
};

export default AdminDashboard;


//ev6y1q7NR9RguLTQ