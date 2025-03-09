"use server";

import Career from "@/app/models/career";

export default async function getCareers(): Promise<Career[]> {
  const fetchUrl: URL = new URL("api/Career", process.env.API_BASE_URL!);
  const response: Response = await fetch(fetchUrl);
  if (response.ok) {
    const careers: Career[] = await response.json();
    return careers;
  } else {
    throw new Error(response.statusText);
  }
}
