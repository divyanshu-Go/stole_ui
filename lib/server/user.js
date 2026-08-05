import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth/token";
import DbConnect from "@/lib/Db/DbConnect";
import User from "@/models/user";
import { serializeForClient } from "@/lib/server/utils";

export async function getCurrentUserFromDB() {
  try {
    // Get cookies from request
    const cookieStore = await cookies();
    const authCookie = cookieStore.get("auth_token");
    const token = authCookie?.value;

    if (!token) {
      return null;
    }

    // Verify the token
    const payload = await verifyToken(token);
    if (!payload || !payload.user) {
      return null;
    }

    // Get fresh user data from database
    await DbConnect();
    const userId = payload.user._id || payload.user.id;
    
    if (!userId) {
      return null;
    }

    const user = await User.findById(userId).lean();
    
    if (!user) {
      return null;
    }

    // Serialize for client component
    return serializeForClient(user);
  } catch (error) {
    console.error("getCurrentUserFromDB error:", error);
    return null;
  }
}
