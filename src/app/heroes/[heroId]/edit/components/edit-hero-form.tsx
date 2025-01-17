"use client";
import Hero from "@/app/models/hero";
import { ChangeEvent, useState, useEffect } from "react";
import Form from "next/form";
import saveHero from "../actions/saveHero";
import {
  Stack,
  Box,
  TextField,
  Slider,
  Typography,
  Button,
  Snackbar,
  SnackbarCloseReason,
  Alert,
} from "@mui/material";
import HeroPropertyCombobox from "./hero-property-combobox";

import getAncestries from "@/app/actions/getAncestries";
import getCareers from "@/app/actions/getCareers";
import getHeroClasses from "@/app/actions/getHeroClasses";
import getOrganizations from "@/app/actions/getOrganizations";
import getEnvironments from "@/app/actions/getEnvironments";
import getUpbringings from "@/app/actions/getUpbringings";

import { EntityMapConvert } from "@/app/utility/utility";

import Ancestry, { formattedAncestryName } from "@/app/models/ancestry";
import Career from "@/app/models/career";
import HeroClass from "@/app/models/hero-class";
import Organization from "@/app/models/organization";
import Environment from "@/app/models/environment";
import Upbringing from "@/app/models/upbringing";

const SNACK_BAR_AUTO_HIDE_DURATION: number = 3000;

// const organizations = new Map<number, string>([
//   [1, "Anarchic"],
//   [2, "Bureaucratic"],
//   [3, "Communal"],
// ]);

// const environments = new Map<number, string>([
//   [1, "Nomadic"],
//   [2, "Rural"],
//   [3, "Secluded"],
//   [4, "Urban"],
//   [5, "Wilderness"],
// ]);

// const upbringings = new Map<number, string>([
//   [1, "Academic"],
//   [2, "Creative"],
//   [3, "Illegal"],
//   [4, "Labor"],
//   [5, "Martial"],
//   [6, "Noble"],
// ]);

const levels: { value: number; label: string }[] = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
].map((i) => {
  return { value: i, label: `${i}` };
});

type EditHeroFormProps = {
  initialHero: Hero;
};

export default function EditHeroForm({ initialHero }: EditHeroFormProps) {
  const [hero, setHero] = useState<Hero>(initialHero);
  const [ancestries, setAncestries] = useState<Map<number, Ancestry> | null>(
    null
  );
  const [careers, setCareers] = useState<Map<number, Career> | null>(null);
  const [heroClasses, setHeroClasses] = useState<Map<number, HeroClass> | null>(
    null
  );
  const [organizations, setOrganizations] = useState<Map<
    number,
    Organization
  > | null>(null);
  const [environments, setEnvironments] = useState<Map<
    number,
    Environment
  > | null>(null);
  const [upbringings, setUpbringings] = useState<Map<
    number,
    Upbringing
  > | null>(null);

  useEffect(() => {
    const fetchAncestries = async () => {
      setAncestries(await getAncestries());
    };
    const fetchCareers = async () => {
      setCareers(await getCareers());
    };
    const fetchHeroClasses = async () => {
      setHeroClasses(await getHeroClasses());
    };
    const fetchOrganizations = async () => {
      setOrganizations(await getOrganizations());
    };
    const fetchEnvironments = async () => {
      setEnvironments(await getEnvironments());
    };
    const fetchUpbringings = async () => {
      setUpbringings(await getUpbringings());
    };

    fetchAncestries();
    fetchCareers();
    fetchHeroClasses();
    fetchOrganizations();
    fetchEnvironments();
    fetchUpbringings();
  }, []);

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
      <Stack spacing={3} width="50%">
        <TextField
          id="hero-name"
          label="Name"
          value={hero.name}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setHeroProperty<string>("name", event.target.value)
          }
        />
        <Box>
          <Typography>Level</Typography>
          <Slider
            defaultValue={1}
            valueLabelDisplay="auto"
            shiftStep={1}
            step={1}
            marks={levels}
            min={1}
            max={10}
            value={hero.level}
            onChange={(event: Event, value: number | number[]) =>
              setHeroProperty<number>("level", value as number)
            }
          />
        </Box>
        {ancestries && (
          <HeroPropertyCombobox
            label="Ancestry"
            propertyId={hero.ancestryId}
            options={EntityMapConvert(
              Array.from(ancestries.values()),
              "id",
              (ancestry) => formattedAncestryName(ancestry)
            )}
            setHeroProperty={(id: number | null) =>
              setHeroProperty<number | null>("ancestryId", id)
            }
          />
        )}
        {organizations && (
          <HeroPropertyCombobox
            label="Organization"
            propertyId={hero.organizationId}
            options={EntityMapConvert(
              Array.from(organizations.values()),
              "id",
              (organization) => organization.name
            )}
            setHeroProperty={(id: number | null) =>
              setHeroProperty<number | null>("organizationId", id)
            }
          />
        )}
        {environments && (
          <HeroPropertyCombobox
            label="Environment"
            propertyId={hero.environmentId}
            options={EntityMapConvert(
              Array.from(environments.values()),
              "id",
              (environment) => environment.name
            )}
            setHeroProperty={(id: number | null) =>
              setHeroProperty<number | null>("environmentId", id)
            }
          />
        )}
        {upbringings && (
          <HeroPropertyCombobox
            label="Upbringing"
            propertyId={hero.upbringingId}
            options={EntityMapConvert(
              Array.from(upbringings.values()),
              "id",
              (upbringing) => upbringing.name
            )}
            setHeroProperty={(id: number | null) =>
              setHeroProperty<number | null>("upbringingId", id)
            }
          />
        )}
        {careers && (
          <HeroPropertyCombobox
            label="Career"
            propertyId={hero.careerId}
            options={EntityMapConvert(
              Array.from(careers.values()),
              "id",
              (career) => career.name
            )}
            setHeroProperty={(id: number | null) =>
              setHeroProperty<number | null>("careerId", id)
            }
          />
        )}
        {heroClasses && (
          <HeroPropertyCombobox
            label="Class"
            propertyId={hero.heroClassId}
            options={EntityMapConvert(
              Array.from(heroClasses.values()),
              "id",
              (heroClasses) => heroClasses.name
            )}
            setHeroProperty={(id: number | null) =>
              setHeroProperty<number | null>("heroClassId", id)
            }
          />
        )}
        <Button type="submit" variant="contained">
          Save
        </Button>
      </Stack>
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
    </Form>
  );
}
