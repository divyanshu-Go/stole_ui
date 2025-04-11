// app/api/user/saved-elements/route.js

import { getUser } from "@/lib/auth/getUser";
import DbConnect from "@/lib/Db/DbConnect";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function GET(request) {
  await DbConnect();

  try {
    const user = await getUser(request);
    if (!user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    const dbUser = await User.findById(user._id).populate("savedElements"); // ✅ Populate saved elements

    return NextResponse.json({ savedElements: dbUser.savedElements }, {
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching saved elements:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
}
