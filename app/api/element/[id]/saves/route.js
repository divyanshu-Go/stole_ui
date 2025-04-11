// app/api/element/[id]/saves/route.js

import { getUser } from "@/lib/auth/getUser";
import DbConnect from "@/lib/Db/DbConnect";
import Element from "@/models/element";
import User from "@/models/user"; // ✅ Import user model

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
    if (!element) {
      return new Response(JSON.stringify({ message: "Element not found" }), {
        status: 404,
      });
    }

    const dbUser = await User.findById(user._id); // ✅ Get full user doc
    const hasSaved = element.saves.includes(user._id);

    if (hasSaved) {
      element.saves.pull(user._id);
      dbUser.savedElements.pull(elementId); // ✅ Remove from user
    } else {
      element.saves.push(user._id);
      dbUser.savedElements.push(elementId); // ✅ Add to user
    }

    await element.save();
    await dbUser.save(); // ✅ Save changes to user

    return new Response(
      JSON.stringify({
        saved: !hasSaved,
        savesCount: element.saves.length,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("SAVE ERROR:", error);
    return new Response(JSON.stringify({ message: "Server error" }), {
      status: 500,
    });
  }
}
