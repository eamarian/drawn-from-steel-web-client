import Image from "next/image";
import Link from "next/link";
import { Typography, Avatar } from "@mui/material";
import "./navbar.scss";

export default function Navbar() {
  return (
    <nav className="main-nav">
      <span className="title">
        <Link href="/">
          <Image
            className="logo"
            src="/logo.svg"
            alt="Drawn From Steel Logo"
            height={800}
            width={800}
          ></Image>
        </Link>
        <Typography variant="h1">Drawn From Steel</Typography>
      </span>
      <span className="main-nav-section">
        <Avatar></Avatar>
      </span>
    </nav>
  );
}
