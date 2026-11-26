// app/elements/[category]/page.jsx
import { notFound } from "next/navigation";
import { getCategoriesFromDB } from "@/lib/server/category";
import { getApprovedElementsByCategoryFromDB } from "@/lib/server/element";
import ElementCard from "@/app/elements/components/ElementCard";
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export const revalidate = 300;

export async function generateStaticParams() {
  const categories = await getCategoriesFromDB();
  return categories.map((category) => ({
    category: category.href.split("/").pop(),
  }));
}

export async function generateMetadata({ params }) {
  const { category: categoryParam } = await params;
  const categories = await getCategoriesFromDB();
  const category = categories.find(
    (item) =>
      item.href.split("/").pop() === categoryParam ||
      item.name.toLowerCase() === categoryParam
  );

  if (!category) {
    return {
      title: "Category Not Found",
      robots: { index: false, follow: false },
    };
  }

  const title = `${category.name} UI Components`;
  const description = `Browse free ${category.name} UI components made with CSS. Preview designs and explore reusable code.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/elements/${category.href.split("/").pop()}`,
    },
    openGraph: {
      title,
      description,
      url: `/elements/${category.href.split("/").pop()}`,
    },
  };
}

export default async function CategoryPage({ params }) {
  const resolvedParams = await params;
  const categories = await getCategoriesFromDB();
  const categoryParam = resolvedParams.category;
  const category = categories.find(
    (cat) =>
      cat.href.split("/").pop() === categoryParam ||
      cat.name.toLowerCase() === categoryParam
  );

  if (!category) {
    notFound(); // shows 404
  }

  const categoryName = category.name;
  const approvedElements = await getApprovedElementsByCategoryFromDB(categoryName);

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
              <ElementCard element={element} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
