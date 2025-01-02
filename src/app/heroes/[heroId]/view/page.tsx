import { getNextServerSession } from "@/app/auth/auth";
import { Session } from "next-auth";
import { Box, Typography } from "@mui/material";
import Hero from "@/app/models/hero";
import getHero from "../../components/get-hero";
import { error } from "console";

export default async function HeroPage({
  params,
}: {
  params: Promise<{ heroId: number }>;
}) {
  const session: Session | null = await getNextServerSession();
  if (session == null) throw error("unauthorized!!");
  const heroId: number = (await params).heroId;
  const hero: Hero | null = await getHero(
    Number.parseInt(session.user.id),
    heroId
  );
  if (hero == null) throw error("no hero found!!!");
  return (
    <Box>
      <Typography>User ID: {hero.userId}</Typography>
      <Typography>Hero ID: {hero.id}</Typography>
      <Typography>Name: {hero.name}</Typography>
      <Typography>Level: {hero.level}</Typography>
    </Box>
  );
}
