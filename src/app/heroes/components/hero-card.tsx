import {
  Card,
  CardHeader,
  Divider,
  CardContent,
  CardActionArea,
  Typography,
  Box,
} from "@mui/material";

import Link from "next/link";

import { HeroHeader } from "@/app/models/hero";

interface HeroCardProps {
  heroHeader: HeroHeader;
}

interface FieldProps {
  label: string;
  value: string | undefined;
  defaultValue?: string;
}

function Field(props: FieldProps) {
  return (
    <Box marginY={1}>
      <Typography
        paddingInlineEnd={1}
        fontWeight="bold"
        component="span"
        variant="body1"
      >
        {props.label}
      </Typography>
      <Typography component="span" variant="body1">
        {props.value
          ? props.value
          : props.defaultValue
          ? props.defaultValue
          : "None"}
      </Typography>
    </Box>
  );
}

export default function HeroCard(props: HeroCardProps) {
  return (
    <Card>
      <CardActionArea
        component={Link}
        href={`/heroes/${props.heroHeader.id}/view`}
      >
        <CardHeader
          titleTypographyProps={{ textTransform: "uppercase" }}
          title={props.heroHeader.name ? props.heroHeader.name : "Unnamed Hero"}
        ></CardHeader>
        <Divider variant="middle" />
        <CardContent>
          <Field label="Ancestry" value={props.heroHeader.ancestry} />
          <Field label="Career" value={props.heroHeader.career} />
          <Field label="Class" value={props.heroHeader.heroClass} />
          {props.heroHeader.subclass && (
            <Field {...props.heroHeader.subclass} />
          )}
          <Field
            label="Level"
            value={props.heroHeader.level.toString()}
            defaultValue="-"
          />
          <Field label="Kit" value={props.heroHeader.kit.join(", ")} />
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
