"use server";

import { revalidatePath } from "next/cache";

export default async function deleteHero(
  userId: number,
  heroId: number,
  pathName: string
): Promise<boolean> {
  const fetchUrl: URL = new URL(
    `api/Hero/${userId}/${heroId}`,
    process.env.API_BASE_URL!
  );
  const response: Response = await fetch(fetchUrl, { method: "DELETE" });
  if (response.ok) {
    revalidatePath(pathName);
    return true;
  } else {
    return false;
  }
}
