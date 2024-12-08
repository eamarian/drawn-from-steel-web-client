"use server";

import { redirect } from "next/navigation";

export default async function createNewHero(userId: string) {
  const heroId: number = 789; // TODO: Update this with actual mutation

  redirect(`/heroes/${heroId}/edit`);
}
