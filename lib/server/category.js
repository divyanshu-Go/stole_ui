import { cache } from "react";
import DbConnect from "@/lib/Db/DbConnect";
import Category from "@/models/category";
import { serializeForClient } from "@/lib/server/utils";

export const getCategoriesFromDB = cache(async function getCategoriesFromDB() {
  await DbConnect();
  const categories = await Category.find().lean();
  return serializeForClient(categories);
});
