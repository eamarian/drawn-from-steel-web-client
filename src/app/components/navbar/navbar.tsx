"use client";

import Link from "next/link";
import {
  Box,
  AppBar,
  Button,
  IconButton,
  Link as MUILink,
  Toolbar,
  Typography,
  Breadcrumbs,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import Account from "./account";
import "./navbar.scss";
import { SessionProvider } from "next-auth/react";
import { usePathname } from "next/navigation";

const breadcrumbMap: Map<string, string> = new Map([
  ["/rules", "Rules"],
  ["/heroes", "Heroes"],
  ["/homebrew", "Homewbrew"],
]);

export default function Navbar() {
  const pathName: string = usePathname();
  const pathNames: string[] = pathName.split("/").filter((x) => x);
  console.log(pathName);

  return (
    <AppBar color="transparent" position="static">
      <Box paddingX={2}>
        <Toolbar>
          <Breadcrumbs separator=">">
            <MUILink
              underline="hover"
              sx={{ display: "flex", alignItems: "center" }}
              color="inherit"
              href="/"
            >
              <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
              <Typography variant="h2">Drawn From Steel</Typography>
            </MUILink>
            {pathNames.map((value, index) => {
              const last = index === pathNames.length - 1;
              const to = `/${pathNames.slice(0, index + 1).join("/")}`;
              return last ? (
                <Typography color="inherit" key={to}>
                  {breadcrumbMap.get(to) || "?"}
                </Typography>
              ) : (
                <MUILink underline="hover" color="inherit" href={to} key={to}>
                  {breadcrumbMap.get(to) || "?"}
                </MUILink>
              );
            })}
          </Breadcrumbs>
          <SessionProvider>
            <Account />
          </SessionProvider>
        </Toolbar>
      </Box>
    </AppBar>
  );
}
