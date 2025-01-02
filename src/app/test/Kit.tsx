import Kit from "@/app/models/kit";
import { Card, CardContent, CardHeader, Typography } from "@mui/material";

export default function KitCard(kit: Kit) {
  <Card>
    <CardHeader>{kit.name}</CardHeader>
    <CardContent>
      <Typography>{kit.description}</Typography>
    </CardContent>
  </Card>;
}
