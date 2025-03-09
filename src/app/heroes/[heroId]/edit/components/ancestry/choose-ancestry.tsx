// TODO: Update hardcoded ruleset value to actually pull from database.

import {
  Card,
  Button,
  Paper,
  Stack,
  Typography,
  Grid2 as Grid,
  Divider,
  CardContent,
  CardActions,
  CardActionArea,
  CardMedia,
} from "@mui/material";

import Image from "next/image";

import Hero from "@/app/models/hero";
import Ancestry, { formattedAncestryName } from "@/app/models/ancestry";
import { Height } from "@mui/icons-material";

interface ChooseAncestryProps {
  hero: Hero;
  setHeroProperty: <T>(property: string, value: T) => void;
  ancestries: Ancestry[];
}

export default function ChooseAncestry({ ancestries }: ChooseAncestryProps) {
  return (
    <Stack>
      <Typography variant="h4">Choose Ancestry</Typography>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {ancestries.map((ancestry: Ancestry) => (
          <Grid size={4} key={ancestry.id}>
            <AncestryCard ancestry={ancestry} />
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
}

interface AncestryCardProps {
  ancestry: Ancestry;
}

function AncestryCard({ ancestry }: AncestryCardProps) {
  const name: string = formattedAncestryName(ancestry);
  return (
    <Card variant="outlined">
      <CardActionArea>
        <CardMedia
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            height: "100%",
            width: "100%",
            zIndex: 1,
          }}
          component="div"
        >
          <Image
            src="/placeholder-image.png"
            alt="ancestry-image"
            fill
            style={{ objectFit: "cover", opacity: 0.1 }}
          />
        </CardMedia>
        <CardContent>
          <Paper sx={{ zIndex: 2 }}>
            <Typography variant="h5">{name}</Typography>
            <Typography variant="caption">Ruleset</Typography>
            <Divider variant="middle" />
            <Typography variant="body1">{ancestry.description}</Typography>
            <Typography variant="h6">{name} Benefits</Typography>
            <Typography variant="body1">
              Benefit 1, Benefit 2, Benefit 3
            </Typography>
          </Paper>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button variant="outlined">View {name} Details</Button>
      </CardActions>
    </Card>
  );
}
