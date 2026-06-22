// app/elements/[category]/page.jsx
import { notFound } from "next/navigation";
import { getApprovedElements, getCategory, getUserProfile } from "@/lib/api";
import ElementCard from "@/app/elements/components/ElementCard";
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";


export default async function CategoryPage({ params }) {
  const categories = await getCategory();
  const categoryParam = params.category;
  const category = categories.find(
    (cat) => cat.href === categoryParam || cat.name.toLowerCase() === categoryParam
  );

  if (!category) {
    notFound(); // shows 404
  }

  const categoryName = category.name;
  const user = await getUserProfile();

  let approvedElements = [];
  try {
    const allApproved = await getApprovedElements();
    approvedElements = allApproved.filter((el) => el.category === categoryName);
  } catch (err) {
    console.error("Fetch error:", err);
    return (
      <div className="min-h-screen bg-zinc-900 text-white flex items-center justify-center">
        <div className="text-red-400">Failed to load elements for this category.</div>
      </div>
    );
  }

  if (approvedElements.length === 0) {
    return (
      <div className="min-h-screen bg-zinc-900 text-white">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-white mb-8 capitalize">
            {categoryName} Elements
          </h1>
          <p className="text-zinc-400 text-center mt-4">
            🚫 No {categoryName} elements found. Check back later!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-transparent min-h-screen">
      <div className="container mx-auto space-y-4 py-8">
        <CardHeader>
          <CardTitle className="text-4xl m-0 text-slate-300 font-bold capitalize">
            {categoryName} Elements
          </CardTitle>
          <CardDescription className="card-text-xl m-0 text-slate-400">
            Open-Source UI {categoryName} elements made with CSS
          </CardDescription>
        </CardHeader>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-4">
          {approvedElements.map((element, index) => (
            <div
              key={element._id}
              className="opacity-0 animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <ElementCard user={user} element={element} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
