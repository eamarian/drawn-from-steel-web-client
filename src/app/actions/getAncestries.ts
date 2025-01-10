"use server";

import Ancestry from "@/app/models/ancestry";
import { EntityMap } from "@/app/utility/utility";

export default async function getAncestries(): Promise<Map<number, Ancestry>> {
  const fetchUrl: URL = new URL("api/Ancestry", process.env.API_BASE_URL!);
  const response: Response = await fetch(fetchUrl);
  if (response.ok) {
    const ancestries: Ancestry[] = await response.json();
    return EntityMap(ancestries, "id");
  } else {
    throw new Error(response.statusText);
  }
}
