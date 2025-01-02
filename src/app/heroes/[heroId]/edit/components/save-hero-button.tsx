"use client";

import saveHero from "../save-hero";
import Hero from "@/app/models/hero";
import { Button } from "@mui/material";

export default function saveHeroButton({ hero: hero }: { hero: Hero }) {
  return (
    <Button variant="contained" onClick={() => saveHero(hero)}>
      Save
    </Button>
  );
}
