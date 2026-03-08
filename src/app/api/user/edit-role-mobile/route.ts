import { auth } from "@/auth";
import connectDb from "@/lib/mongodb";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

// export async function POST(req: NextRequest) {
//   try {
//     await connectDb();
//     const { role, mobile } = await req.json();
//     const session = await auth();
//     const user = await User.findOneAndUpdate(
//       { email: session?.user?.email },
//       {
//         role,
//         mobile,
//       },
//       { new: true },
//     );
//     if (!user) {
//       return NextResponse.json({ message: "User not found" }, { status: 400 });
//     }
//     return NextResponse.json(user, { status: 200 });
//   } catch (error) {
//     return NextResponse.json(
//       { message: `Edit role and mobile error ${error}` },
//       { status: 500 },
//     );
//   }
// }


// ... imports
export async function POST(req: NextRequest) {
  try {
    await connectDb();
    const { role, mobile } = await req.json();
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json({ message: "Not Authenticated" }, { status: 401 });
    }

    const user = await User.findOneAndUpdate(
      { email: session.user.email },
      { role, mobile },
      { returnDocument: 'after' } // Fixes the Mongoose warning
    );

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Server Error" },
      { status: 500 }
    );
  }
}
