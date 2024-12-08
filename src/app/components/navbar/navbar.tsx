"use client";

import Link from "next/link";
import { Session } from "next-auth";
import { Box, AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import Account from "./account";
import "./navbar.scss";

interface NavbarProps {
  session: Session | null;
}

export default function Navbar(props: NavbarProps) {
  return (
    <AppBar color="transparent" position="static">
      <Box paddingX={2}>
        <Toolbar>
          <Link href="/">
            <IconButton size="large">
              <HomeIcon />
            </IconButton>
          </Link>
          <Typography marginLeft={4} flexGrow={1} variant="h1">
            Drawn From Steel
          </Typography>
          <Account session={props.session} />
        </Toolbar>
      </Box>
    </AppBar>

    // <nav className="main-nav">
    //   <span className="title">
    //     <Link href="/">
    //       <Image
    //         className="logo"
    //         src="/logo.svg"
    //         alt="Drawn From Steel Logo"
    //         height={800}
    //         width={800}
    //       ></Image>
    //     </Link>
    //     <Typography variant="h1">Drawn From Steel</Typography>
    //   </span>
    //   <span className="main-nav-section">
    //     <Avatar className="avatar"></Avatar>
    //   </span>
    // </nav>
  );
}
