// /app/api/stats/elements/route.js
import DbConnect from "@/lib/Db/DbConnect";
import Element from "@/models/element";
import { NextResponse } from "next/server";

export async function GET() {
  await DbConnect();
  const count = await Element.countDocuments();
  return NextResponse.json({ count });
}
