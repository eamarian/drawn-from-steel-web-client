"use client";

import { Stack, Button, Stepper, Step, StepButton } from "@mui/material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { StepComponentProps } from "./edit-hero-form";

export enum StepStatus {
  NONE = "None",
  ERROR = "Error",
  COMPLETE = "Complete",
}

interface EditHeroStepperProps {
  steps: {
    label: string;
    status: StepStatus;
    component: React.FC<StepComponentProps> | null;
  }[];
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}

export default function EditHeroStepper({
  steps,
  activeStep,
  setActiveStep,
}: EditHeroStepperProps) {
  const minStep: number = 0;
  const maxStep: number = steps.length - 1;

  const handleBack = () => {
    setActiveStep((prevActiveStep) => Math.max(minStep, prevActiveStep - 1));
  };
  const handleNext = () => {
    setActiveStep((prevActiveStep) => Math.min(maxStep, prevActiveStep + 1));
  };

  return (
    <Stack direction="row">
      <Button
        onClick={handleBack}
        disabled={activeStep <= minStep}
        startIcon={<NavigateBeforeIcon />}
      >
        Back
      </Button>
      <Stepper
        sx={{ flexGrow: 1 }}
        nonLinear
        activeStep={activeStep}
        alternativeLabel
      >
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepButton color="inherit" onClick={() => setActiveStep(index)}>
              {step.label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <Button
        onClick={handleNext}
        disabled={activeStep >= maxStep}
        endIcon={<NavigateNextIcon />}
      >
        Next
      </Button>
    </Stack>
  );
}
