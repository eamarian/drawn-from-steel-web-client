import { Box, TextField } from "@mui/material";
import CharacterAvatar from "./components/character-avatar";

export default function ThinkPage() {
  return (
    <Box component="form" autoComplete="off">
      <CharacterAvatar />
      <TextField
        required
        label="Hero Name"
        defaultValue="Unnamed Hero"
      ></TextField>
    </Box>
  );
}
