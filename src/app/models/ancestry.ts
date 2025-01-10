export default interface Ancestry {
  id: number;
  type: string;
  subtype: string;
  description: string;
  minHeightInches: number;
  maxHeightInches: number;
  minWeightPounds: number;
  maxWeightPounds: number;
  minLifeExpectancyYears: number;
  maxLifeExpectancyYears: number;
  speed: number;
  stability: number;
  points: number;
}

export function formattedAncestryName(ancestry: Ancestry) {
  return ancestry.subtype.length > 0
    ? `${ancestry.subtype} ${ancestry.type}`
    : ancestry.type;
}
