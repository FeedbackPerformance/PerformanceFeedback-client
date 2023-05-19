import "../styles/globals.css";
import { Providers } from "../redux/provider";
import Head from "next/head";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Navbar } from "../components/Navbar/Navbar";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="icon" type="image/x-icon" href="favicon.ico" />
        <title> Performance Feedback </title>
      </Head>
      <Box sx={{ display: "flex" }}>
        <Providers>
          <Navbar />
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <DrawerHeader />
            <Component {...pageProps} />
          </Box>
        </Providers>
      </Box>
    </>
  );
}

export default MyApp;
