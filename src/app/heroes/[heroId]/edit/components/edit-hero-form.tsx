"use client";

import React, { useState } from "react";

import Form from "next/form";

import {
  Button,
  Stack,
  Snackbar,
  SnackbarCloseReason,
  Alert,
  Typography,
  TextField,
  Divider,
} from "@mui/material";

import AccountBoxIcon from "@mui/icons-material/AccountBox";

import Hero from "@/app/models/hero";
import Ancestry from "@/app/models/ancestry";
import Career from "@/app/models/career";
import saveHero from "../actions/saveHero";
import HeroClass from "@/app/models/hero-class";
import EditHeroStepper, { StepStatus } from "./edit-hero-stepper";
import AncestryStep from "./ancestry/ancestry-step";

const SNACK_BAR_AUTO_HIDE_DURATION: number = 3000;

export interface StepComponentProps {
  hero: Hero;
  setHeroProperty: <T>(property: string, value: T) => void;
  ancestries: Ancestry[];
}

const steps: {
  label: string;
  status: StepStatus;
  component: React.FC<StepComponentProps> | null;
}[] = [
  { label: "Ancestry", status: StepStatus.NONE, component: AncestryStep },
  { label: "Culture", status: StepStatus.NONE, component: null },
  { label: "Career", status: StepStatus.NONE, component: null },
  { label: "Class", status: StepStatus.NONE, component: null },
  { label: "Complication", status: StepStatus.NONE, component: null },
  { label: "Details", status: StepStatus.NONE, component: null },
];

type EditHeroFormProps = {
  initialHero: Hero;
  ancestries: Ancestry[];
  careers: Career[];
  heroClasses: HeroClass[];
};

export default function EditHeroForm({
  initialHero,
  ancestries,
  careers,
  heroClasses,
}: EditHeroFormProps) {
  const [hero, setHero] = useState<Hero>(initialHero);
  const [activeStep, setActiveStep] = useState<number>(0);
  const Step: React.FC<StepComponentProps> | null = steps[activeStep].component;

  const setHeroProperty = <T,>(property: string, value: T) => {
    if (Object.hasOwn(hero, property)) {
      setHero({ ...hero, [property]: value });
    } else {
      throw new Error(`Failed to set property ${property} on Hero`);
    }
  };

  const handleAction = async () => {
    const success = await saveHero(hero);
    if (success) {
      setOpenSuccess(true);
    } else {
      setOpenFailure(true);
    }
  };
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openFailure, setOpenFailure] = useState(false);

  const handleCloseSuccess = (
    event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSuccess(false);
  };

  const handleCloseFailure = (
    event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenFailure(false);
  };

  return (
    <Form action={handleAction}>
      <Stack spacing={2}>
        <Typography variant="h3">Hero Builder</Typography>
        <EditHeroStepper
          steps={steps}
          activeStep={activeStep}
          setActiveStep={setActiveStep}
        />
        <Stack justifyContent="center" alignItems="center" direction="row">
          <AccountBoxIcon sx={{ fontSize: 200 }} />
          <TextField
            value={hero.name}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setHeroProperty("name", event.target.value)
            }
            label="Name"
          ></TextField>
          <Button sx={{ marginLeft: 3 }} type="submit" variant="contained">
            Save
          </Button>
        </Stack>
        <Divider />
        {Step ? (
          <Step
            hero={hero}
            setHeroProperty={setHeroProperty}
            ancestries={ancestries}
          />
        ) : null}
        <Snackbar
          open={openSuccess}
          onClose={handleCloseSuccess}
          autoHideDuration={SNACK_BAR_AUTO_HIDE_DURATION}
        >
          <Alert severity="success" onClose={handleCloseSuccess}>
            Hero successfully saved
          </Alert>
        </Snackbar>
        <Snackbar
          open={openFailure}
          onClose={handleCloseFailure}
          autoHideDuration={SNACK_BAR_AUTO_HIDE_DURATION}
        >
          <Alert severity="error" onClose={handleCloseFailure}>
            Failed to save hero
          </Alert>
        </Snackbar>
      </Stack>
    </Form>
  );
}
