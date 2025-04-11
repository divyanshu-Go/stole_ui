import { getUser } from "@/lib/auth/getUser";
import DbConnect from "@/lib/Db/DbConnect";
import Element from "@/models/element";
import { NextResponse } from "next/server";

// Get all comments
export async function GET(_, { params }) {
  try {
    await DbConnect();
    const elementId = (await params).id;

    const element = await Element.findById(elementId)
      .populate("comments.author", "name email")
      .select("comments");

    if (!element) {
      return NextResponse.json({ error: "Element not found" }, { status: 404 });
    }

    return NextResponse.json({ comments: element.comments });
  } catch (error) {
    console.error("Error fetching comments:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// Post a new comment
export async function POST(req, { params }) {
  try {
    await DbConnect();
    const user = await getUser(req);
    if (!user)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const elementId = (await params).id;
    const { text } = await req.json();

    if (!text || text.trim() === "") {
      return NextResponse.json(
        { error: "Comment text is required" },
        { status: 400 }
      );
    }

    const element = await Element.findById(elementId);
    if (!element) {
      return NextResponse.json({ error: "Element not found" }, { status: 404 });
    }

    const comment = {
      author: user._id,
      text: text.trim(),
      createdAt: new Date(),
    };

    element.comments.push(comment);
    await element.save();

    // Get the last comment with populated author
    const populatedComment = await Element.findById(elementId)
      .select("comments")
      .populate("comments.author", "name")
      .then((el) => el.comments[el.comments.length - 1]);

    return NextResponse.json(
      { comment: populatedComment },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error posting comments:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

