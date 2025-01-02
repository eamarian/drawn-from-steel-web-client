import { getNextServerSession } from "../auth/auth";
import { Grid2 as Grid } from "@mui/material";
import HeroCard from "./components/hero-card";
import NewHeroCard from "./components/new-hero-card";
import Hero from "@/app/models/hero";
import getHeroes from "./components/get-heroes";

export default async function HeroesPage() {
  const maxHeroes: number = 10;
  const session = await getNextServerSession();
  const userId: string = session?.user?.id ?? "";
  const heroes: Hero[] = await getHeroes(userId);
  return (
    <Grid
      container
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
    >
      {heroes.map((hero: Hero) => {
        return (
          <Grid size={4} key={hero.id}>
            <HeroCard hero={hero} />
          </Grid>
        );
      })}
      {heroes.length < maxHeroes && (
        <Grid
          display="flex"
          justifyContent="center"
          alignItems="center"
          size={4}
        >
          <NewHeroCard userId={userId} />
        </Grid>
      )}
    </Grid>
  );
}
