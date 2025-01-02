// import Ancestry from "./ancestry";
// import Culture from "./culture";
// import Career from "./career";
// import HeroClass from "./hero-class";
// import Kit from "./kit";
// import Complication from "./complication";

// export interface Subclass {
//   label: string;
//   value: string;
// }

// interface Characteristics {
//   might: number;
//   agility: number;
//   reason: number;
//   intuition: number;
//   presence: number;
// }

// export default class Hero {
//   id: string;
//   name: string;
//   characteristics: Characteristics;
//   ancestry: Ancestry;
//   culture: Culture;
//   career: Career;
//   heroClass: HeroClass;
//   kits: Kit[];
//   complication: Complication;

//   constructor(
//     id: string,
//     name: string,
//     characteristics: Characteristics,
//     ancestry: Ancestry,
//     culture: Culture,
//     career: Career,
//     heroClass: HeroClass,
//     kits: Kit[],
//     complication: Complication
//   ) {
//     this.id = id;
//     this.name = name;
//     this.characteristics = characteristics;
//     this.ancestry = ancestry;
//     this.culture = culture;
//     this.career = career;
//     this.heroClass = heroClass;
//     this.kits = kits;
//     this.complication = complication;
//   }
// }

// export class HeroHeader {
//   id: string;
//   name: string;
//   ancestry: string;
//   career: string;
//   heroClass: string;
//   subclass: Subclass | undefined;
//   level: number;
//   kit: string[];

//   constructor(
//     id: string,
//     name: string,
//     ancestry: string,
//     career: string,
//     heroClass: string,
//     subclass: Subclass | undefined,
//     level: number,
//     kit: string[]
//   ) {
//     this.id = id;
//     this.name = name;
//     this.ancestry = ancestry;
//     this.career = career;
//     this.heroClass = heroClass;
//     this.subclass = subclass;
//     this.level = level;
//     this.kit = kit;
//   }
// }

export default interface Hero {
  id: number;
  userId: number;
  name: string;
  level: number;
  image: string | null;
}
