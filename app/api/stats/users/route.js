// /app/api/stats/users/route.js
import DbConnect from "@/lib/Db/DbConnect";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function GET() {
  await DbConnect();
  const count = await User.countDocuments();
  return NextResponse.json({ count });
}
