import { Box, Typography } from "@mui/material";

interface FieldProps {
  label: string;
  value: string | undefined;
  defaultValue?: string;
}

export default function Field(props: FieldProps) {
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
