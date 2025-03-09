"use server";

import Organization from "@/app/models/organization";

export default async function getOrganizations(): Promise<Organization[]> {
  const fetchUrl: URL = new URL("api/Organization", process.env.API_BASE_URL!);
  const response: Response = await fetch(fetchUrl);
  if (response.ok) {
    const organizations: Organization[] = await response.json();
    return organizations;
  } else {
    throw new Error(response.statusText);
  }
}
