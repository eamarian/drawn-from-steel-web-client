"use client";

import { useState, MouseEvent, MouseEventHandler } from "react";
import { useRouter } from "next/navigation";
import { Session } from "next-auth";
import Link from "next/link";
import { Button, IconButton, Avatar, Menu, MenuItem } from "@mui/material";

interface AccountProps {
  session: Session | null;
}

export default function Account(props: AccountProps) {
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

  return props.session?.user ? (
    <div>
      <IconButton onClick={openMenu}>
        <Avatar
          alt={props.session.user.name ?? ""}
          src={props.session.user.image ?? ""}
        />
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem>Profile</MenuItem>
        <MenuItem>My account</MenuItem>
        <MenuItem onClick={logOut}>Sign out</MenuItem>
      </Menu>
    </div>
  ) : (
    <Link href="/api/auth/signin">
      <Button variant="contained">Sign in</Button>
    </Link>
  );
}
