"use server";

import HeroClass from "@/app/models/hero-class";
import { EntityMap } from "@/app/utility/utility";

export default async function getHeroClasses(): Promise<
  Map<number, HeroClass>
> {
  const fetchUrl: URL = new URL("api/HeroClass", process.env.API_BASE_URL!);
  const response: Response = await fetch(fetchUrl);
  if (response.ok) {
    const heroClasses: HeroClass[] = await response.json();
    return EntityMap(heroClasses, "id");
  } else {
    throw new Error(response.statusText);
  }
}
