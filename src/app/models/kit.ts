export default interface Kit {
  id: number;
  name: string;
  description: string;
  // Armor Categories
  // Weapon Categories
  staminaBonusPerEchelon: number;
  speedBonus: number;
  stabilityBonus: number;
  meleeDamageBonus: DamageBonus;
  rangedDamageBonus: DamageBonus;
  rangedDistanceBonus: number;
  meleeDistanceBonus: number;
  disengageBonus: number;
  // Signature Ability
}

export interface DamageBonus {
  tier1: number;
  tier2: number;
  tier3: number;
}
