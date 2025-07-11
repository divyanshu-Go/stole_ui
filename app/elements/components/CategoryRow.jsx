import Link from "next/link";
import ElementCard from "./ElementCard";
import { ArrowRight } from "lucide-react";

const CategoryRow = ({user, category, elements }) => {
  const displayElements = elements.slice(0, 4);

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between px-6">
        <h2 className="text-3xl font-semibold text-slate-200 capitalize">
          {category}
        </h2>
        <Link
          href={`/elements/${category.toLowerCase()}`}
          className="group text-sm font-medium text-violet-400 hover:text-violet-300 flex items-center gap-1 transition-colors"
        >
          View All
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
        </Link>
      </div>

      {displayElements.length === 0 ? (
        <p className="text-sm text-slate-500">No elements in this category.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {displayElements.map((element, index) => (

            <div
              key={element._id}
              className="opacity-0 animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <ElementCard user={user} element={element} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default CategoryRow;
