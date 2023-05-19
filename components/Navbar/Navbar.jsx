import * as React from "react";

import axios from "axios";

import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";

import { NavAdmin } from "./NavAdmin";
import { NavUser } from "./NavUser";

import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../redux/user";

import { message } from "antd";
import { styled, useTheme } from "@mui/material/styles";
import {
  Drawer as MuiDrawer,
  AppBar as MuiAppBar,
  Toolbar,
  List,
  CssBaseline,
  Divider as DividerIcon,
  IconButton,
} from "@mui/material";
import {
  Menu as MenuIcon,
  ChevronLeft,
  ChevronRight,
} from "@mui/icons-material";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

//Navbar

export function Navbar() {
  const user = useSelector((store) => store.user);
  const router = useRouter();
  const dispatch = useDispatch();

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleLogout = () => {
    axios
      .post("/api/auth/logout", {}, { withCredentials: true })
      .then(() => {
        dispatch(logOut());
        message.success("Sesión Finalizada");
        router.push("/login");
      })
      .catch((error) => {
        message.error(error);
      });
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      {!user.id ? null : (
        <>
          <CssBaseline />
          <AppBar position="fixed" open={open}>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{
                  marginRight: 5,
                  ...(open && { display: "none" }),
                  background: "#0571DF",
                }}
              >
                <MenuIcon />
              </IconButton>
              <Link href="/">
                <Image
                  src="/Performance Feedback Blue.png"
                  alt="Performance Feedback Logo"
                  width={200}
                  height={70}
                  priority
                  style={{ cursor: "pointer" }}
                />
              </Link>
            </Toolbar>
          </AppBar>
          <Drawer variant="permanent" open={open}>
            <DrawerHeader>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === "rtl" ? <ChevronRight /> : <ChevronLeft />}
              </IconButton>
            </DrawerHeader>
            <DividerIcon />
            <List>
              {user.isAdmin ? (
                <NavAdmin handleLogout={handleLogout} open={open} />
              ) : (
                <NavUser handleLogout={handleLogout} open={open} />
              )}
            </List>
          </Drawer>
        </>
      )}
    </>
  );
}
