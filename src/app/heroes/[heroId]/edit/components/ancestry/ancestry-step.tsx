import { StepComponentProps } from "../edit-hero-form";
import ChooseAncestry from "./choose-ancestry";
import AncestryDetail from "./ancestry-detail";

export default function AncestryStep({
  hero,
  setHeroProperty,
  ancestries,
}: StepComponentProps) {
  return hero.ancestryId ? (
    <AncestryDetail />
  ) : (
    <ChooseAncestry
      hero={hero}
      setHeroProperty={setHeroProperty}
      ancestries={ancestries}
    />
  );
}
