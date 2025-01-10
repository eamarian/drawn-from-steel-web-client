export default interface Hero {
  id: number;
  userId: number;
  name: string;
  ancestryId: number | null;
  organizationId: number | null;
  environmentId: number | null;
  upbringingId: number | null;
  careerId: number | null;
  heroClassId: number | null;
  level: number;
  image: string | null;
}
