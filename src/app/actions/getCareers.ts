"use server";

import Career from "@/app/models/career";
import { EntityMap } from "@/app/utility/utility";

export default async function getCareers(): Promise<Map<number, Career>> {
  const fetchUrl: URL = new URL("api/Career", process.env.API_BASE_URL!);
  const response: Response = await fetch(fetchUrl);
  if (response.ok) {
    const careers: Career[] = await response.json();
    return EntityMap(careers, "id");
  } else {
    throw new Error(response.statusText);
  }
}
