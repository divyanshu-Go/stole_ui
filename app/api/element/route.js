import { NextResponse } from "next/server";
import Element from "@/models/element"; // Adjust the import path as needed
import DbConnect from "@/lib/Db/DbConnect";
import { verifyToken } from "@/lib/auth/token";

export async function POST(req) {
  try {

    const authCookie = req.cookies.get("auth_token");
    if (!authCookie) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const payload = await verifyToken(authCookie.value);
    if (!payload) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }


    // Ensure database connection
    await DbConnect();

    // Parse the request body
    const data = await req.json();

    // Validate required fields
    const { title, description, htmlCode, cssCode, zoom, category, tags, likes} = data;

    if (
      !htmlCode ||
      !cssCode ||
      !category
    )
    {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required fields",
        },
        { status: 400 }
      );
    }

    // Create new element
    const newElement = new Element({
      title,
      description,
      htmlCode,
      cssCode,
      zoom,
      category,
      authorId: payload.user._id,
      status: "pending", // Default status
      tags: tags || [],
      likes: likes || [],
    });

    // Save the element
    const savedElement = await newElement.save();

    return NextResponse.json(
      {
        success: true,
        data: savedElement,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Element creation error:", error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to create element",
      },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    // Ensure database connection
    await DbConnect();

     // Parse relevant query parameters (only category and authorId are kept)
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const authorId = searchParams.get('authorId');

    // Build query object based on remaining relevant parameters
    let query = {};
    if (category) {
      query.category = category;
    }
    if (authorId) {
      query.authorId = authorId;
    }

    // Fetch components with populated creator information
    const components = await Element.find(query)
      .populate('authorId', 'name email') // Only include name and email from creator
      .sort({ createdAt: -1 });  // Sort by newest first

    return NextResponse.json({ components });


  } catch (error) {
    console.error("Get elements error:", error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to fetch elements",
      },
      { status: 500 }
    );
  }
}
