"use client";

import { Avatar, Button } from "@mui/material";
import { styled } from "@mui/material/styles";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function CharacterAvatar() {
  return (
    <div>
      <Button component="label">
        <VisuallyHiddenInput
          accept="image/*"
          type="file"
          onChange={(event) => console.log(event.target.files)}
          multiple
        />
        <Avatar variant="square" />
      </Button>
    </div>
  );
}
