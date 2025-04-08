import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

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
          {categories.map((category) => (
            <div
              key={category.value}
              className={`flex flex-col items-center justify-center p-4 rounded-lg border cursor-pointer transition-all duration-200
                          ${
                            selectedCategory.value === category.value
                              ? "border-blue-500 bg-blue-500/20"
                              : "border-gray-600 hover:border-gray-400 hover:bg-gray-700"
                          }`}
              onClick={() => {
                setSelectedCategory(category);
                setElement((prev) => ({ ...prev, category: category.value }));
              }}
            >
              {category.icon}
              <span className="mt-2 text-sm">{category.label}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
