import { verifyToken } from "@/lib/auth/token";
import DbConnect from "@/lib/Db/DbConnect";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    // Get token from cookie
    const authCookie = req.cookies.get("auth_token");
    if (!authCookie) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const token = authCookie.value;
    // Verify token
    const payload = await verifyToken(token);
    if (!payload) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }
    
    // Connect to database
    await DbConnect();

    // Fetch user data (excluding password)
    const user = await User.findById(payload.userId).select("-password");
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error("Profile fetch error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
