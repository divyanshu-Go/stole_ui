import { cache } from "react";
import DbConnect from "@/lib/Db/DbConnect";
import Element from "@/models/element";
import { serializeForClient } from "@/lib/server/utils";

export async function getApprovedElementsFromDB() {
  await DbConnect();
  const elements = await Element.find({ status: "approved" }).lean();
  return serializeForClient(elements);
}

export const getTopLikedElementsFromDB = cache(async function getTopLikedElementsFromDB(limit = 10) {
  await DbConnect();
  const elements = await Element.find({ status: "approved" })
    .sort({ likes: -1 })
    .limit(limit)
    .lean();
  return serializeForClient(elements);
});

// Fetch approved elements for a specific category directly from the database
export async function getApprovedElementsByCategoryFromDB(category) {
  if (!category) return [];
  await DbConnect();
  const elements = await Element.find({ status: "approved", category })
    .populate("authorId", "name")
    .sort({ createdAt: -1 })
    .lean();
  return serializeForClient(elements);
}
