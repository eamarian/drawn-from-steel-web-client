"use server";

import HeroClass from "@/app/models/hero-class";

export default async function getHeroClasses(): Promise<HeroClass[]> {
  const fetchUrl: URL = new URL("api/HeroClass", process.env.API_BASE_URL!);
  const response: Response = await fetch(fetchUrl);
  if (response.ok) {
    const heroClasses: HeroClass[] = await response.json();
    return heroClasses;
  } else {
    throw new Error(response.statusText);
  }
}
