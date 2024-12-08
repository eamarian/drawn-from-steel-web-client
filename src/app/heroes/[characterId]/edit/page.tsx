import { Box, Typography } from "@mui/material";
import HorizontalNonLinearStepper from "./components/horizontal-nonlinear-stepper";

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

export default async function EditHeroPage({
  params,
}: {
  params: Promise<{ characterId: string }>;
}) {
  return (
    <Box>
      <HorizontalNonLinearStepper steps={steps} />
      <Typography>{(await params).characterId}</Typography>
    </Box>
  );
}
