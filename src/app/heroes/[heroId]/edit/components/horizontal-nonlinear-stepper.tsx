"use client";

import { useState } from "react";
import {
  Box,
  Stepper,
  Step,
  StepButton,
  Typography,
  Button,
} from "@mui/material";

interface HorizontalNonLinearStepperProps {
  steps: string[];
}

export default function HorizontalNonLinearStepper(
  props: HorizontalNonLinearStepperProps
) {
  const [activeStep, setActiveStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  const totalStepCount = () => props.steps.length;
  const completedStepCount = () => completedSteps.size;
  const isLastStep = () => activeStep === totalStepCount() - 1;
  const allStepsCompleted = () => completedStepCount() === totalStepCount();

  const handleNext = () => {
    const newActiveStep: number =
      isLastStep() && !allStepsCompleted()
        ? props.steps.findIndex((step, i) => !completedSteps.has(i))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    setCompletedSteps((prevCompletedSteps) =>
      prevCompletedSteps.has(activeStep)
        ? prevCompletedSteps.difference(new Set([activeStep]))
        : prevCompletedSteps.add(activeStep)
    );
    handleNext();
  };

  return (
    <Box width={"100%"}>
      <Stepper nonLinear activeStep={activeStep} alternativeLabel>
        {props.steps.map((step, index) => (
          <Step key={step} completed={completedSteps.has(index)}>
            <StepButton onClick={handleStep(index)}>{step}</StepButton>
          </Step>
        ))}
      </Stepper>
      <Box>
        <Typography>Step {activeStep + 1}</Typography>
      </Box>
      <Box display="flex" flexDirection="row">
        <Button disabled={activeStep === 0} onClick={handleBack}>
          Back
        </Button>
        <Box flex="1 1 auto" />
        <Button onClick={handleNext}>Next</Button>
        <Button onClick={handleComplete}>
          {completedSteps.has(activeStep)
            ? "Uncomplete Step"
            : completedStepCount() === totalStepCount() - 1
            ? "Finish"
            : "Complete Step"}
        </Button>
      </Box>
    </Box>
  );
}
