import { HeroHeader } from "../models/hero";

export const MockHeaders: HeroHeader[] = [
  new HeroHeader(
    "123",
    "Bobby",
    "Elf (High)",
    "Criminal",
    "Shadow",
    { label: "Shadow College", value: "College of the Harlequin Mask" },
    4,
    ["Sniper"]
  ),
  new HeroHeader(
    "456",
    "Steve",
    "Hakaan",
    "Soldier",
    "Tacticitan",
    { label: "Tactical Doctrine", value: "Insurgent" },
    1,
    ["Mountain", "Ranger"]
  ),
  new HeroHeader("789", "", "", "", "", undefined, 0, []),
];
