"use client";
import { Fab } from "@mui/material";

import PersonAddIcon from "@mui/icons-material/PersonAdd";

import createNewHero from "./create-new-hero";
import { usePathname } from "next/navigation";

interface NewHeroCardProps {
  userId: string;
}

export default function NewHeroCard(props: NewHeroCardProps) {
  const pathName: string = usePathname();
  return (
    <Fab
      color="primary"
      aria-label="add"
      onClick={() =>
        createNewHero(
          {
            id: 0,
            userId: Number.parseInt(props.userId),
            name: "",
            ancestryId: null,
            organizationId: null,
            environmentId: null,
            upbringingId: null,
            careerId: null,
            heroClassId: null,
            level: 1,
            image: null,
          },
          pathName
        )
      }
    >
      <PersonAddIcon />
    </Fab>
  );
}
