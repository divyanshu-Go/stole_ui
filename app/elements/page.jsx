// ✅ This is now a Server Component
import CategoryRow from "./components/CategoryRow";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getApprovedElements } from "@/lib/api";

// Element categories to group by
const CATEGORIES = ["Button", "Card", "Loader", "Switch", "Form", "Pattern", "Other"];

export default async function ElementsPage() {
  const elements = await getApprovedElements();

  const elementsByCategory = CATEGORIES.reduce((acc, category) => {
    acc[category] = elements.filter((el) => el.category === category);
    return acc;
  }, {});


  return (
    <div className="min-h-screen bg-transparent text-white">
      <div className="container mx-auto space-y-16">
        <CardHeader>
          <CardTitle className="text-4xl m-0 text-slate-300 font-bold capitalize ">
            Explore UI Elements
          </CardTitle>
          <CardDescription className="card-text-xl m-0 text-slate-400 ">
            Discover open-source CSS UI components organized by categories.
            These elements are ready to use and fully customizable.
          </CardDescription>
        </CardHeader>

        {CATEGORIES.map((category) => (
          <CategoryRow
            key={category}
            category={category}
            elements={elementsByCategory[category] || []}
          />
        ))}
      </div>
    </div>
  );
}
