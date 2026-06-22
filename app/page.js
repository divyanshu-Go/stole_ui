// app/page.js
import FeaturedElements from "@/components/FeaturedElements";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import { getStatsFromDB } from "@/lib/server/stats";

export default async function Home() {
  const { elementCount, userCount } = await getStatsFromDB();

  return (
    <>
      <HeroSection />
      <StatsSection elementCount={elementCount} userCount={userCount} />
      <FeaturedElements />
    </>
  );
}

