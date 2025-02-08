import DbConnect from "@/lib/Db/DbConnect";
import User from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

// GET: List all users
export async function GET(request) {
  try {

    // Authenticate user
    // const user = await authenticateUser(request);

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



// POST: Create a new user (registration)
// export async function POST(req) {
//   try {
//     await DbConnect();

//     const body = await req.json();

//     // Validate input
//     const { name, email, password } = body;
//     if (!name || !email || !password) {
//       return NextResponse.json(
//         { message: "Name, email, and password are required" },
//         { status: 400 }
//       );
//     }

//     // Check if user already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return NextResponse.json(
//         { message: "User with this email already exists" },
//         { status: 409 }
//       );
//     }

//     // Hash password
//     const saltRounds = 10;
//     const passwordHash = await bcrypt.hash(password, saltRounds);

//     // Create new user
//     const newUser = new User({
//       name,
//       email,
//       passwordHash,
//       role: body.role || "user",
//     });

//     await newUser.save();

//     // Generate JWT token
//     const token = generateToken(newUser);

//     // Prepare response
//     const userResponse = newUser.toObject();
//     delete userResponse.passwordHash;

//     // Set token in HTTP-only cookie
//     const response = NextResponse.json(
//       { userResponse, token },
//       { status: 201 }
//     );
//     response.cookies.set("token", token, {
//       httpOnly: true,
//       maxAge: 86400, // 1 day
//     });
//     return response;
//   } catch (error) {
//     return NextResponse.json(
//       {
//         message: "Error creating user",
//         error: error instanceof Error ? error.message : "Unknown error",
//       },
//       { status: 500 }
//     );
//   }
// }
