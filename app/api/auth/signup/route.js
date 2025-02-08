import { setAuthCookie } from "@/lib/auth/cookies";
import { hashPassword } from "@/lib/auth/password";
import { generateToken } from "@/lib/auth/token";
import DbConnect from "@/lib/Db/DbConnect";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();

    // Validate email and password
    if (
      !name ||
      !email ||
      !email.includes("@") ||
      !password ||
      password.length < 8
    ) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    await DbConnect();

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 409 }
      );
    }

    // Hash password and create user
    const hashedPassword = await hashPassword(password);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "user",
    });

    // Generate token and set cookie
    const token = await generateToken(user._id.toString());

    // Create response with cookie
    const response = NextResponse.json(
      {
        message: "User created successfully",
        user: {
          id: user._id,
          email: user.email,
          role: user.role,
        },
      },
      { status: 201 }
    );

    // Set the cookie using NextResponse
    response.cookies.set(setAuthCookie(token));

    return response;
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
