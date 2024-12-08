import { Grid2 as Grid } from "@mui/material";
import HeroCard from "./components/hero-card";
import NewHeroCard from "./components/new-hero-card";
import { HeroHeader } from "@/app/models/hero";
import { MockHeaders as HeroHeaders } from "@/app/data/hero";

interface HeroesPageProps {
  userId: string;
}

export default async function HeroesPage(props: HeroesPageProps) {
  const maxHeroes: number = 10;
  return (
    <Grid
      container
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
    >
      {HeroHeaders.map((header: HeroHeader) => {
        return (
          <Grid size={4} key={header.id}>
            <HeroCard heroHeader={header} />
          </Grid>
        );
      })}
      {HeroHeaders.length < maxHeroes && (
        <Grid size={4}>
          <NewHeroCard userId={props.userId} />
        </Grid>
      )}
    </Grid>
  );
}
