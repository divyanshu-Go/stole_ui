import { verifyToken } from "@/lib/auth/token";
import DbConnect from "@/lib/Db/DbConnect";
import Element from "@/models/element";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    // Ensure database connection
    await DbConnect();
    const elementId = (await params).id;

    
    // Find element by ID
    const element = await Element.findById(elementId).populate(
      "authorId",
      "name email"
    );

    if (!element) {
      return NextResponse.json(
        {
          success: false,
          message: "Element not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      data: element,
    });
  } catch (error) {
    console.error("Get element error:", error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to fetch element",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    // Ensure database connection
    await DbConnect();
    const elementId = (await params).id;

    const authCookie = req.cookies.get("auth_token");
    if (!authCookie) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const payload = await verifyToken(authCookie.value);
    if (!payload) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const user = await User.findById(payload.user._id).select("-password");

    // Find and delete the element
    const component = await Element.findById(elementId);

    if (!component) {
      return NextResponse.json(
        {
          success: false,
          message: "Element not found",
        },
        { status: 404 }
      );
    }

    if (component.authorId.toString() != payload.user._id && user.role != 'admin') {
      return NextResponse.json(
        { error: "Not authorized to delete this component" },
        { status: 403 }
      );
    }

    await Element.findByIdAndDelete(elementId);

    return NextResponse.json({
      success: true,
      message: "Element deleted successfully",
      data: component,
    });
  } catch (error) {
    console.error("Delete element error:", error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to delete element",
      },
      { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
  try {
    // Ensure database connection
    await DbConnect();
    const id = (await params).id;

    const authCookie = req.cookies.get("auth_token");
    if (!authCookie) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const payload = await verifyToken(authCookie.value);
    if (!payload) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const user = await User.findById(payload.user._id).select("-password");

    // Parse the request body
    const data = await req.json();

    // Find component and verify ownership
    const component = await Element.findById(id);
    if (!component) {
      return NextResponse.json(
        { error: "Component not found" },
        { status: 404 }
      );
    }

    if (component.authorId.toString() !== payload.userId && user.role != 'admin') {
      return NextResponse.json(
        { error: "Not authorized to update this component" },
        { status: 403 }
      );
    }
    // Update the component
    const updatedComponent = await Element.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    }).populate("authorId", "name email");

    return NextResponse.json({ component: updatedComponent });
  } catch (error) {
    console.error("Update element error:", error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to update element",
      },
      { status: 500 }
    );
  }
}



