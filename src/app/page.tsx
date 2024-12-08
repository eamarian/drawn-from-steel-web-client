import { Grid2 as Grid } from "@mui/material";
import MenuCard from "./components/menu-card/menu-card";

export default function HomePage() {
  return (
    <Grid
      container
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
    >
      <Grid size={4}>
        <MenuCard
          title="Rules Glossary"
          description="Description goes here"
          link={"/rules"}
        />
      </Grid>
      <Grid size={4}>
        <MenuCard
          title="Heroes"
          description="Description goes here"
          link={"/heroes"}
        />
      </Grid>
      <Grid size={4}>
        <MenuCard
          title="Homebrew"
          description="Description goes here"
          link={"/homebrew"}
        />
      </Grid>
    </Grid>
  );
}
