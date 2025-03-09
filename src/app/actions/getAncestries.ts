"use server";

import Ancestry from "@/app/models/ancestry";

export default async function getAncestries(): Promise<Ancestry[]> {
  const fetchUrl: URL = new URL("api/Ancestry", process.env.API_BASE_URL!);
  const response: Response = await fetch(fetchUrl);
  if (response.ok) {
    const ancestries: Ancestry[] = await response.json();
    return ancestries;
  } else {
    throw new Error(response.statusText);
  }
}
