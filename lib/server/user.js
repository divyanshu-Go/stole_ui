import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth/token";
import DbConnect from "@/lib/Db/DbConnect";
import User from "@/models/user";
import Element from "@/models/element";
import { serializeForClient } from "@/lib/server/utils";

export async function getCurrentUserFromDB() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) {
    return null;
  }

  const payload = await verifyToken(token);
  const userId = payload?.user?._id || payload?.user?.id;

  if (!userId) {
    return null;
  }

  await DbConnect();
  const user = await User.findById(userId).lean();
  return user ? serializeForClient(user) : null;
}

export async function getUserElementsFromDB(userId) {
  if (!userId) return [];
  await DbConnect();
  const elements = await Element.find({ authorId: userId })
    .select("-htmlCode -cssCode")
    .sort({ createdAt: -1 })
    .lean();
  return serializeForClient(elements);
}
