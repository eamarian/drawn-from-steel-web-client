"use server";

import Environment from "@/app/models/environment";

export default async function getEnvironments(): Promise<Environment[]> {
  const fetchUrl: URL = new URL("api/Environment", process.env.API_BASE_URL!);
  const response: Response = await fetch(fetchUrl);
  if (response.ok) {
    const environments: Environment[] = await response.json();
    return environments;
  } else {
    throw new Error(response.statusText);
  }
}
