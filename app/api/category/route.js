// app/api/category/route.js 
import DbConnect from "@/lib/Db/DbConnect";
import Category from "@/models/category";
import { getUser } from "@/lib/auth/getUser"; 

export async function POST(request) {
  await DbConnect();

  try {
    const user = await getUser(request);
    if (!user || user.role !== "admin") {
      return new Response(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
      });
    }

    const body = await request.json();

    const category = await Category.create(body);

    return new Response(JSON.stringify(category), {
      status: 201,
    });

  } catch (error) {
    return new Response(JSON.stringify({ message: "Something went wrong", error: error.message }), {
      status: 500,
    });
  }
}


export async function GET() {
  await DbConnect();

  try {
    const categories = await Category.find()// optional: sorted newest first

    return new Response(JSON.stringify(categories), {
      status: 200,
    });

  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Failed to fetch categories", error: error.message }),
      { status: 500 }
    );
  }
}