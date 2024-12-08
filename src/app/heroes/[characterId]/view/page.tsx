import { getServerSession } from "next-auth";
import { Box, Typography } from "@mui/material";

export default async function HeroPage({
  params,
}: {
  params: Promise<{ characterId: string }>;
}) {
  const session = await getServerSession();
  const userId: string = session!.user!.email!;
  return (
    <Box>
      <Typography>User ID: {userId}</Typography>
      <Typography>Character ID: {(await params).characterId}</Typography>
    </Box>
  );
}
