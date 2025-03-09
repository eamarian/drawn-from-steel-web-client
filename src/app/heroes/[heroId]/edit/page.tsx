import { Session } from "next-auth";
import { getNextServerSession } from "@/app/auth/auth";
import EditHeroForm from "@/app/heroes/[heroId]/edit/components/edit-hero-form";

import Hero from "@/app/models/hero";
import Ancestry from "@/app/models/ancestry";
import Career from "@/app/models/career";
import HeroClass from "@/app/models/hero-class";

import getHero from "@/app/heroes/components/get-hero";
import getAncestries from "@/app/actions/getAncestries";
import getCareers from "@/app/actions/getCareers";
import getHeroClasses from "@/app/actions/getHeroClasses";
import { notFound } from "next/navigation";

export default async function EditHeroPage({
  params,
}: {
  params: Promise<{ heroId: number }>;
}) {
  const heroId: number = (await params).heroId;
  const session: Session | null = await getNextServerSession();
  const userId: number = Number.parseInt(session?.user?.id ?? "");
  const hero: Hero | null = await getHero(userId, heroId);
  const ancestries: Ancestry[] = await getAncestries();
  const careers: Career[] = await getCareers();
  const heroClasses: HeroClass[] = await getHeroClasses();

  return hero ? (
    <EditHeroForm
      initialHero={hero}
      ancestries={ancestries}
      careers={careers}
      heroClasses={heroClasses}
    />
  ) : (
    notFound()
  );
}
