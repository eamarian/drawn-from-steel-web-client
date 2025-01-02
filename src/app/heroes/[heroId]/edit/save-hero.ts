import Hero from "@/app/models/hero";

export default async function saveHero(hero: Hero | null): Promise<boolean> {
  return hero == null;
}
