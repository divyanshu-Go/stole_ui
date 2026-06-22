import { cache } from "react";
import DbConnect from "@/lib/Db/DbConnect";
import Element from "@/models/element";
import User from "@/models/user";

export const getStatsFromDB = cache(async function getStatsFromDB() {
  await DbConnect();
  const elementCount = await Element.countDocuments();
  const userCount = await User.countDocuments();

  return {
    elementCount,
    userCount,
  };
});
