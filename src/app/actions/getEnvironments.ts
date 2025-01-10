"use server";

import Environment from "@/app/models/environment";
import { EntityMap } from "@/app/utility/utility";

export default async function getEnvironments(): Promise<
  Map<number, Environment>
> {
  const fetchUrl: URL = new URL("api/Environment", process.env.API_BASE_URL!);
  const response: Response = await fetch(fetchUrl);
  if (response.ok) {
    const environments: Environment[] = await response.json();
    return EntityMap(environments, "id");
  } else {
    throw new Error(response.statusText);
  }
}
