import { Box } from "@mui/material";
import Hero from "@/app/models/hero";
import getHero from "../../components/get-hero";
import { Session } from "next-auth";
import { getNextServerSession } from "@/app/auth/auth";
import EditHeroForm from "@/app/heroes/[heroId]/edit/components/edit-hero-form";

export default async function EditHeroPage({
  params,
}: {
  params: Promise<{ heroId: number }>;
}) {
  const heroId: number = (await params).heroId;
  const session: Session | null = await getNextServerSession();
  const userId: number = Number.parseInt(session?.user?.id ?? "");
  console.log(`Hero ID: ${heroId}`);
  console.log(`User ID: ${userId}`);
  const hero: Hero | null = await getHero(userId, heroId);

  return hero == null ? (
    <Box>Loading...</Box>
  ) : (
    <EditHeroForm initialHero={hero} />
  );
}
