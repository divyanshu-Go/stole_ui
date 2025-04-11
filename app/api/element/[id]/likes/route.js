import { getUser } from "@/lib/auth/getUser";
import DbConnect from "@/lib/Db/DbConnect";
import Element from "@/models/element";
import User from "@/models/user";

export async function PATCH(request, { params }) {
  await DbConnect();
  const elementId = (await params).id;

  try {
    const user = await getUser(request);
    if (!user) {
      return new Response(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
      });
    }

    const element = await Element.findById(elementId);
    const dbUser = await User.findById(user._id);

    if (!element || !dbUser) {
      return new Response(JSON.stringify({ message: "Element or user not found" }), {
        status: 404,
      });
    }

    const hasLiked = element.likes.includes(user._id);

    if (hasLiked) {
      // Remove like
      element.likes.pull(user._id);
      dbUser.likedElements.pull(element._id);
    } else {
      // Add like
      element.likes.push(user._id);
      dbUser.likedElements.push(element._id);
    }

    await element.save();
    await dbUser.save();

    return new Response(
      JSON.stringify({
        liked: !hasLiked,
        likesCount: element.likes.length,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("LIKE ERROR:", error);
    return new Response(JSON.stringify({ message: "Server error" }), {
      status: 500,
    });
  }
}
