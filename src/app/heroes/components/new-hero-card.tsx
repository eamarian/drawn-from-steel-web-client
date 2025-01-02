"use client";

import { Card, CardHeader, CardContent, CardActionArea } from "@mui/material";
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
            level: 1,
            image: null,
          },
          pathName
        )
      }
    >
      <PersonAddIcon />
    </Fab>
    // <Card>
    //   <CardActionArea onClick={() => createNewHero(props.userId)}>
    //     <CardHeader title={`Add New Hero: ${props.userId}`} />
    //     <CardContent>
    //       <PersonAddIcon />
    //     </CardContent>
    //   </CardActionArea>
    // </Card>
  );
}
