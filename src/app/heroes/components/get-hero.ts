"use server";
import Hero from "@/app/models/hero";

export default async function getHero(
  userId: number,
  heroId: number
): Promise<Hero | null> {
  const fetchUrl: URL = new URL(
    `api/Hero/${userId}/${heroId}`,
    process.env.API_BASE_URL!
  );
  const response: Response = await fetch(fetchUrl);
  if (response.ok) {
    const data = await response.json();
    const hero: Hero = data;
    return hero;
  } else {
    return null;
  }
}
