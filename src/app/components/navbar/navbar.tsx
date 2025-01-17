"use client";

import NextLink from "next/link";
import {
  Box,
  AppBar,
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

  let pathNameMatch: [string, string] | null = null;
  for (const [key, value] of breadcrumbMap.entries()) {
    if (pathName.startsWith(key)) {
      pathNameMatch = [key, value];
      break;
    }
  }

  return (
    <AppBar color="transparent" position="static">
      <Box paddingX={2}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Breadcrumbs separator="">
            <MUILink
              component={NextLink}
              underline="none"
              sx={{ display: "flex", alignItems: "center" }}
              color="inherit"
              href="/"
            >
              <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
              <Typography variant="h2">Drawn From Steel</Typography>
            </MUILink>
            {pathNameMatch && (
              <MUILink
                component={NextLink}
                underline="none"
                color="inherit"
                href={pathNameMatch[0]}
              >
                <Typography variant="h4">{pathNameMatch[1]}</Typography>
              </MUILink>
            )}
          </Breadcrumbs>
          <SessionProvider>
            <Account />
          </SessionProvider>
        </Toolbar>
      </Box>
    </AppBar>
  );
}
