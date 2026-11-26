import DbConnect from "@/lib/Db/DbConnect";
import Category from "@/models/category";
import Element from "@/models/element";

export async function getSitemapDataFromDB() {
  await DbConnect();

  const [categories, elements] = await Promise.all([
    Category.find().select("href updatedAt").lean(),
    Element.find({ status: "approved" }).select("_id updatedAt").lean(),
  ]);

  return {
    categories: categories.map((category) => ({
      slug: category.href.split("/").pop(),
      lastModified: category.updatedAt,
    })),
    elements: elements.map((element) => ({
      id: element._id.toString(),
      lastModified: element.updatedAt,
    })),
  };
}
