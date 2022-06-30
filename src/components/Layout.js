import { Menu, Notes, StickyNote2 } from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import { purple } from "@mui/material/colors";
import { makeStyles } from "@mui/styles";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import moment from 'moment'

const drawerWidth = 240;

const useStyles = makeStyles((theme) => {
  return {
    page: {
      backgroundColor: "#f9f9f9",
      width: "100%",
    },
    drawer: {
      width: drawerWidth,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    root: {
      display: "flex",
    },
    active: {
      background: "#f4f4f4",
    },
    title: {
      padding: theme.spacing(2)
    },
    toolbar: theme.mixins.toolbar,
    avatar: {
      marginLeft: theme.spacing(2)
    }
  };
});

export default function Layout({ children }) {
  const classes = useStyles();
  const navigation = useNavigate();
  const location = useLocation();

  const menuItem = [
    {
      text: "My Notes",
      icon: <Notes />,
      url: "/",
    },
    {
      text: "Create Note",
      icon: <StickyNote2 />,
      url: "/create",
    },
  ];

  return (
    <div className={classes.root}>
      <AppBar 
      position="fixed" 
      sx={{width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`}} 
      elevation={0}
      color="inherit" 
      >
        <Toolbar variant="dense">
          <Typography sx={{flexGrow: 1}}>
            {moment(new Date()).format('MMMM Do Y')}
          </Typography>
          <Typography>
            Abdullah
          </Typography>
          <Avatar src="https://cdn.vuetifyjs.com/images/john.jpg" className={classes.avatar}></Avatar>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        anchor="left"
        classes={{ paper: classes.drawerPaper }}
      >
        <div>
          <Typography variant="h4" className={classes.title}>Notes Ninja</Typography>
          <Divider/>
          <List>
            {menuItem.map((item, index) => {
              return (
                <ListItem
                  selected={location.pathname === item.url}
                  button
                  key={index}
                  onClick={() => {
                    navigation(item.url);
                  }}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItem>
              );
            })}
          </List>
        </div>
      </Drawer>

      <div className={classes.page}>
        <div className={classes.toolbar}></div>
        {children}
      </div>
    </div>
  );
}
