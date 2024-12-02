import { Container, Stack, Card, Typography } from "@mui/material";

export default function Page() {
  return (
    <Container>
      <Stack spacing={2}>
        <Card>
          <Typography variant="h2">Rules</Typography>
        </Card>
        <Card>
          <Typography variant="h2">Heroes</Typography>
        </Card>
        <Card>
          <Typography variant="h2">Homebrew</Typography>
        </Card>
      </Stack>
    </Container>
  );
}
