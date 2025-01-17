"use server";

import Hero from "@/app/models/hero";

export default async function saveHero(hero: Hero): Promise<boolean> {
  try {
    const fetchUrl: URL = new URL(
      `api/Hero/${hero.userId}/${hero.id}`,
      process.env.API_BASE_URL!
    );
    const response: Response = await fetch(fetchUrl, {
      method: "PUT",
      body: JSON.stringify(hero),
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      throw new Error("Failed to save hero.");
    } else {
      return true;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
}
