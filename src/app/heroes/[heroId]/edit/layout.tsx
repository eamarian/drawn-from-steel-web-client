import { Box, Typography } from "@mui/material";
import HorizontalNonLinearStepper from "./components/horizontal-nonlinear-stepper";
import Hero from "@/app/models/hero";
import SaveHeroButton from "./components/save-hero-button";
import getHero from "../../components/get-hero";
import { Session } from "next-auth";
import { getNextServerSession } from "@/app/auth/auth";

const steps: string[] = [
  "Think",
  "Ancestry",
  "Culture",
  "Career",
  "Class",
  "Kit",
  "Add Free Strikes",
  "Complication",
  "Determine Details",
  "Make Connections",
];

type EditHeroLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ heroId: number }>;
};

export default async function EditHeroLayout({
  children,
  params,
}: EditHeroLayoutProps) {
  const heroId: number = (await params).heroId;
  const session: Session | null = await getNextServerSession();
  const userId: number = Number.parseInt(session?.user?.id ?? "");
  console.log(`Hero ID: ${heroId}`);
  console.log(`User ID: ${userId}`);
  const hero: Hero | null = await getHero(userId, heroId);

  return hero == null ? (
    <></>
  ) : (
    <Box>
      <HorizontalNonLinearStepper steps={steps} />
      <Typography>{heroId}</Typography>
      {children}
      <SaveHeroButton hero={hero} />
    </Box>
  );
}
