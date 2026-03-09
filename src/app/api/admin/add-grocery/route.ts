import { auth } from "@/auth";
import uploadOnCloudinary from "@/lib/cloudinary";
import connectDb from "@/lib/mongodb";
import Grocery from "@/models/grocery.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectDb();
    const session = await auth();

    // 1. Admin Check: If NOT admin, return error
    if (session?.user?.role !== "admin") {
      return NextResponse.json(
        { message: "Unauthorized: Admin access required" },
        { status: 403 },
      );
    }

    const formData = await req.formData();
    const name = formData.get("name") as string;
    const category = formData.get("category") as string;
    const unit = formData.get("unit") as string;
    const price = formData.get("price") as string;
    const file = formData.get("image") as Blob | null;

    // 2. Handle Image Upload strictly
    if (!file) {
      return NextResponse.json(
        { message: "Image is required" },
        { status: 400 },
      );
    }

    const imageUrl = await uploadOnCloudinary(file);

    // 3. Ensure imageUrl is not null before DB Save
    if (!imageUrl) {
      return NextResponse.json(
        { message: "Image upload failed" },
        { status: 500 },
      );
    }

    const grocery = await Grocery.create({
      name,
      category,
      price,
      unit,
      image: imageUrl, 
    });

    return NextResponse.json(grocery, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: `Add grocery error: ${error}` },
      { status: 500 },
    );
  }
}
