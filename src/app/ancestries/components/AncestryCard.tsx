"use client";

import Ancestry, { formattedAncestryName } from "@/app/models/ancestry";
import {
  Card,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Chip,
  CardHeader,
  CardContent,
  CardActions,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Field from "@/app/components/field";

interface AncestryCardProps {
  ancestry: Ancestry;
}

function formatRange(start: string, end: string) {
  return `${start} - ${end}`;
}

function formatImperialHeight(inches: number): string {
  const height = toImperialHeight(inches);
  return `${height.feet}'${height.inches}"`;
}

interface ImperialHeight {
  feet: number;
  inches: number;
}

function toImperialHeight(inches: number): ImperialHeight {
  const feet: number = Math.floor(inches / 12);
  return { feet: feet, inches: inches - feet * 12 };
}

export default function AncestryCard(props: AncestryCardProps) {
  const handleClick = () => {};
  //const heightFormatter: Intl.NumberFormat = Intl.NumberFormat();
  const weightFormatter: Intl.NumberFormat = Intl.NumberFormat(undefined, {
    style: "unit",
    unit: "pound",
  });
  const lifeExpectancyFormatter: Intl.NumberFormat = Intl.NumberFormat(
    undefined,
    { style: "unit", unit: "year", unitDisplay: "long" }
  );
  return (
    <Card>
      <CardHeader title={formattedAncestryName(props.ancestry)} />
      <CardContent>
        <Accordion>
          <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
            <Typography>Details</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Field
              label="Height"
              value={formatRange(
                formatImperialHeight(props.ancestry.minHeightInches),
                formatImperialHeight(props.ancestry.maxHeightInches)
              )}
            />
            <Field
              label="Weight"
              value={weightFormatter.formatRange(
                props.ancestry.minWeightPounds,
                props.ancestry.maxWeightPounds
              )}
            />
            <Field
              label="Life Expectancy"
              value={lifeExpectancyFormatter.formatRange(
                props.ancestry.minLifeExpectancyYears,
                props.ancestry.maxLifeExpectancyYears
              )}
            />
            <Field label="Speed" value={props.ancestry.speed.toString()} />
            <Field
              label="Stability"
              value={props.ancestry.stability.toString()}
            />
            <Field label="Points" value={props.ancestry.points.toString()} />
            <Typography>{props.ancestry.description}</Typography>
          </AccordionDetails>
        </Accordion>
      </CardContent>
      <CardActions>
        <Chip
          onClick={handleClick}
          color="primary"
          variant={"outlined"}
          label="select"
        />
      </CardActions>
    </Card>
  );
}
