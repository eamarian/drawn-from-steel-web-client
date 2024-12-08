import {
  Card,
  CardHeader,
  CardContent,
  CardActionArea,
  Typography,
} from "@mui/material";

import Link from "next/link";

interface MenuCardProps {
  title: string;
  description: string;
  link: string;
}

export default function MenuCard(props: MenuCardProps) {
  return (
    <Card>
      <CardActionArea component={Link} href={props.link}>
        <CardHeader title={props.title}></CardHeader>
        <CardContent>
          <Typography variant="body1">{props.description}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
