import { getNextServerSession } from "../auth/auth";
import { Grid2 as Grid } from "@mui/material";
import HeroCard from "./components/hero-card";
import NewHeroCard from "./components/new-hero-card";

import Hero from "@/app/models/hero";
import Ancestry from "@/app/models/ancestry";
import Career from "@/app/models/career";
import HeroClass from "@/app/models/hero-class";

import getHeroes from "./components/get-heroes";
import getAncestries from "@/app/actions/getAncestries";
import getCareers from "@/app/actions/getCareers";
import getHeroClasses from "@/app/actions/getHeroClasses";
import { EntityMap } from "../utility/utility";

export default async function HeroesPage() {
  const maxHeroes: number = 10;
  const session = await getNextServerSession();
  const userId: string = session?.user?.id ?? "";
  const heroes: Hero[] = await getHeroes(userId);
  const ancestries: Ancestry[] = await getAncestries();
  const careers: Career[] = await getCareers();
  const heroClasses: HeroClass[] = await getHeroClasses();

  return (
    <Grid
      container
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
    >
      {heroes.map((hero: Hero) => {
        return (
          <Grid size={4} key={hero.id}>
            <HeroCard
              hero={hero}
              ancestries={EntityMap(ancestries, "id")}
              careers={EntityMap(careers, "id")}
              heroClasses={EntityMap(heroClasses, "id")}
            />
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
