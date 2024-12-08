"use server";

import { redirect } from "next/navigation";

// eslint-disable-next-line
export default async function createNewHero(userId: string) {
  const heroId: number = 789; // TODO: Update this with actual mutation

  redirect(`/heroes/${heroId}/edit`);
}
