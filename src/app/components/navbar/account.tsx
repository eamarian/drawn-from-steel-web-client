"use client";

import { useState, MouseEvent, MouseEventHandler } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Button, IconButton, Avatar, Menu, MenuItem } from "@mui/material";

export default function Account() {
  const { data: session } = useSession();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const openMenu: MouseEventHandler<HTMLButtonElement> = (
    event: MouseEvent<HTMLButtonElement>
  ) => {
    setAnchorEl(event.currentTarget);
  };
  const logOut = () => {
    handleClose();
    router.push("/api/auth/signout");
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  console.log(session);
  return session === undefined ? (
    <></>
  ) : session === null ? (
    <Link href="/api/auth/signin">
      <Button variant="contained">Sign in</Button>
    </Link>
  ) : (
    <div>
      <IconButton onClick={openMenu}>
        <Avatar alt={session.user.name ?? ""} src={session.user.image ?? ""} />
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem>Profile</MenuItem>
        <MenuItem>My account</MenuItem>
        <MenuItem onClick={logOut}>Sign out</MenuItem>
      </Menu>
    </div>
  );
}
