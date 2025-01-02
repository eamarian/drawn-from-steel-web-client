"use server";

import Hero from "@/app/models/hero";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function createNewHero(
  heroRequest: Hero,
  pathName: string,
  redirectToNewHero: boolean = true
) {
  let redirectPath: string | null = null;
  try {
    const fetchUrl: URL = new URL(
      `api/Hero/${heroRequest.userId}`,
      process.env.API_BASE_URL!
    );
    const response: Response = await fetch(fetchUrl, {
      method: "POST",
      body: JSON.stringify(heroRequest),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(
        `Failed to create new character: ${response.status} - ${response.statusText}`
      );
    }
    const data = await response.json();
    const heroResponse: Hero = data;
    const heroId = heroResponse.id;
    redirectPath = redirectToNewHero ? `/heroes/${heroId}/edit/think` : null;
  } catch (error) {
    console.error(error);
    redirectPath = null;
  } finally {
    if (redirectPath) {
      redirect(redirectPath);
    } else {
      revalidatePath(pathName);
    }
  }
}
