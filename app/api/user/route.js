import DbConnect from "@/lib/Db/DbConnect";
import User from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

// GET: List all users
export async function GET(request) {
  try {

    await DbConnect();


    // TODO: Implement authentication and admin role check
    const users = await User.find({}).select("-passwordHash");

    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error fetching users",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}


