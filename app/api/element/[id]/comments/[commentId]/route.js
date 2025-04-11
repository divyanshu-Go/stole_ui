import { getUser } from "@/lib/auth/getUser";
import DbConnect from "@/lib/Db/DbConnect";
import Element from "@/models/element";
import { NextResponse } from "next/server";

// Delete a comment
export async function DELETE(req, { params }) {
  try {
    await DbConnect();
    const user = await getUser(req);
    if (!user)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id: elementId, commentId } = await params;

    const element = await Element.findById(elementId);
    if (!element) {
      return NextResponse.json({ error: "Element not found" }, { status: 404 });
    }

    const comment = element.comments.id(commentId);
    if (!comment) {
      return NextResponse.json({ error: "Comment not found" }, { status: 404 });
    }

    // Allow comment author or admin to delete
    const isAuthor = comment.author.toString() === user._id.toString();
    const isAdmin = user.role === "admin";

    if (!isAuthor && !isAdmin) {
      return NextResponse.json(
        { error: "Unauthorized action" },
        { status: 403 }
      );
    }

    element.comments.pull(commentId);
    await element.save();

    return NextResponse.json(
      { message: "Comment deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching comments:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
