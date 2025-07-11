// app/api/element/top-liked/route.js

import { NextResponse } from "next/server";
import DbConnect from "@/lib/Db/DbConnect";
import Element from "@/models/element";

export async function GET(request) {
  try {
    await DbConnect();

    const topLikedElements = await Element.find()
      .populate("authorId", "name email") // optional: include author info
      .sort({ likes: -1 }) // Mongo can't sort by length of array directly, so we use aggregation instead
      .limit(10)
      .lean();

    // Manually add likesCount to each element (since sorting by likes.length requires aggregation)
    const enriched = topLikedElements
      .map((el) => ({
        ...el,
        likesCount: el.likes?.length || 0,
      }))
      .sort((a, b) => b.likesCount - a.likesCount) // sort in-memory as fallback
      .slice(0, 10); // top 5 only

    return NextResponse.json({ components: enriched });
  } catch (error) {
    console.error("Top liked elements fetch error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch top liked elements" },
      { status: 500 }
    );
  }
}
