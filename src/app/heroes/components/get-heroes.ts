"use server";
import Hero from "@/app/models/hero";

export default async function getHeroes(userId: string): Promise<Hero[]> {
  const fetchUrl: URL = new URL(
    `api/Hero/${userId}`,
    process.env.API_BASE_URL!
  );
  const response: Response = await fetch(fetchUrl);
  if (response.ok) {
    const data = await response.json();
    const heroes: Hero[] = data;
    return heroes;
  } else {
    return new Array<Hero>();
  }
}
