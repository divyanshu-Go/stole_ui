import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import * as LucideIcons from "lucide-react"; // ✅ make sure you're using the correct alias

export default function CategorySelector({ categories, selectedCategory, setSelectedCategory, setElement }) {
  return (
    <Card className="card-category-selector">
      <CardHeader>
        <CardTitle className="card-title">Select a Category</CardTitle>
        <CardDescription className="card-description">
          Manage your elements that you submit
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {categories.map((category) => {
            const Icon = LucideIcons[category.icon] || LucideIcons.Square;

            return (
              <div
                key={category.name}
                className={`flex flex-col items-center justify-center p-4 rounded-lg border cursor-pointer transition-all duration-200
                            ${
                              selectedCategory.name === category.name
                                ? "border-blue-500 bg-blue-500/20"
                                : "border-gray-600 hover:border-gray-400 hover:bg-gray-700"
                            }`}
                onClick={() => {
                  setSelectedCategory(category);
                  setElement((prev) => ({ ...prev, category: category.name }));
                }}
              >
                <Icon className="w-6 h-6" />
                <span className="mt-2 text-sm">{category.name}</span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
