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
