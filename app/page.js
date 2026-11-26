// app/page.js
import FeaturedElements from "@/components/FeaturedElements";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import { getStatsFromDB } from "@/lib/server/stats";

export const revalidate = 300;

export const metadata = {
  title: "Free CSS & UI Components",
  description:
    "Browse free, community-made CSS and UI components. Find inspiration, preview designs, and explore reusable code.",
  alternates: {
    canonical: "/",
  },
};

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

