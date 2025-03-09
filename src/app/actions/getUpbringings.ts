"use server";

import Upbringing from "@/app/models/environment";

export default async function getUpbringings(): Promise<Upbringing[]> {
  const fetchUrl: URL = new URL("api/Upbringing", process.env.API_BASE_URL!);
  const response: Response = await fetch(fetchUrl);
  if (response.ok) {
    const upbringings: Upbringing[] = await response.json();
    return upbringings;
  } else {
    throw new Error(response.statusText);
  }
}
