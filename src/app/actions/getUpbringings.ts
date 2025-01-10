"use server";

import Upbringing from "@/app/models/environment";
import { EntityMap } from "@/app/utility/utility";

export default async function getUpbringings(): Promise<
  Map<number, Upbringing>
> {
  const fetchUrl: URL = new URL("api/Upbringing", process.env.API_BASE_URL!);
  const response: Response = await fetch(fetchUrl);
  if (response.ok) {
    const upbringings: Upbringing[] = await response.json();
    return EntityMap(upbringings, "id");
  } else {
    throw new Error(response.statusText);
  }
}
