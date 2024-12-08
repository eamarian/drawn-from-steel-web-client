import "./footer.scss";
import { Typography } from "@mui/material";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="main-footer">
      <span className="main-footer-section">
        <a
          href="https://www.mcdmproductions.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            className="pbds-logo"
            src="/powered-by-draw-steel.png"
            alt="Powered by Draw Steel"
            height={395}
            width={1000}
          ></Image>
        </a>
        <Typography>
          DRAWN FROM STEEL is an independent product published under the DRAW
          STEEL Creator License and is not affiliated with MCDM Productions, LLC
        </Typography>
      </span>
      <span className="main-footer-section">
        <Typography>DRAW STEEL © 2024 MCDM Productions, LLC</Typography>
      </span>
      <span className="main-footer-section">
        <Typography>
          Designed by Kevin Osborne. Built by Evan Marian.
        </Typography>
      </span>
    </footer>
  );
}
