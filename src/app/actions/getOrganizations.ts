"use server";

import Organization from "@/app/models/organization";
import { EntityMap } from "@/app/utility/utility";

export default async function getOrganizations(): Promise<
  Map<number, Organization>
> {
  const fetchUrl: URL = new URL("api/Organization", process.env.API_BASE_URL!);
  const response: Response = await fetch(fetchUrl);
  if (response.ok) {
    const organizations: Organization[] = await response.json();
    return EntityMap(organizations, "id");
  } else {
    throw new Error(response.statusText);
  }
}
