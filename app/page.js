import FeaturedElements from "@/components/FeaturedElements";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import { getStats } from "@/lib/api";


export default async function Home() {
  const {elementCount , userCount} = await getStats();

  return (
    <>
      <HeroSection />
      <StatsSection elementCount={elementCount} userCount={userCount} />
      <FeaturedElements />
    </>
  )
}

