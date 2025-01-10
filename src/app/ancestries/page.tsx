import Ancestry from "../models/ancestry";
import { Grid2 as Grid } from "@mui/material";
import AncestryCard from "./components/AncestryCard";
import getAncestries from "../actions/getAncestries";

export default async function AncestriesPage() {
  const ancestries: Map<number, Ancestry> = await getAncestries();
  return (
    <Grid container spacing={5}>
      {Array.from(ancestries.values()).map((ancestry: Ancestry) => (
        <Grid key={ancestry.id} size={4}>
          <AncestryCard {...{ ancestry: ancestry }} />
        </Grid>
      ))}
    </Grid>
  );
}
