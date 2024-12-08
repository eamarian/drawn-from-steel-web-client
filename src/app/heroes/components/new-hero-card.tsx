"use client";

import { Card, CardHeader, CardContent, CardActionArea } from "@mui/material";

import PersonAddIcon from "@mui/icons-material/PersonAdd";

import createNewHero from "./create-new-hero";

interface NewHeroCardProps {
  userId: string;
}

export default function NewHeroCard(props: NewHeroCardProps) {
  return (
    <Card>
      <CardActionArea onClick={() => createNewHero(props.userId)}>
        <CardHeader title={`Add New Hero: ${props.userId}`} />
        <CardContent>
          <PersonAddIcon />
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
