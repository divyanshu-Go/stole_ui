import { getUser } from "@/lib/auth/getUser";
import DbConnect from "@/lib/Db/DbConnect";
import User from "@/models/user";
import Element from "@/models/element";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    await DbConnect();

    const user = await getUser(request);
    if (!user) {
      return NextResponse.json({ message: "Unauthorized", status: 401 });
    }

    // Find the user and populate likedElements
    const dbUser = await User.findById(user._id).populate("likedElements");

    if (!dbUser) {
      return NextResponse.json({ message: "User not found", status: 404 });
    }

    return NextResponse.json({ likedElements: dbUser.likedElements },{
      status: 200
    });
  } catch (error) {
    console.error("FETCH LIKED ELEMENTS ERROR:", error);
    return new Response(JSON.stringify({ message: "Server error" }), {
      status: 500,
    });
  }
}
