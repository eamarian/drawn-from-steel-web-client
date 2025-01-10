import { Autocomplete, TextField } from "@mui/material";

type HeroPropertyComboboxProps = {
  label: string;
  propertyId: number | null;
  options: Map<number, string>;
  setHeroProperty: (id: number | null) => void;
};

export default function HeroPropertyCombobox({
  label,
  propertyId: id,
  options,
  setHeroProperty,
}: HeroPropertyComboboxProps) {
  return (
    <Autocomplete
      options={[...options.keys()]}
      renderInput={(params) => <TextField {...params} label={label} />}
      value={id}
      getOptionLabel={(option) => options.get(option) ?? `${option}`}
      onChange={(event, value) => setHeroProperty(value)}
    />
  );
}
