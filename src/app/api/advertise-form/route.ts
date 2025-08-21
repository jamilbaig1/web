import { NextResponse } from "next/server";
import { writeClient } from "@/lib/sanity";

export async function POST(req: Request) {
  try {
    const { name, businessName, email, message } = await req.json();

    if (!name || !businessName || !email || !message) {
      return NextResponse.json(
        { success: false, error: "All fields are required" },
        { status: 400 }
      );
    }

    const doc = {
      _type: "advertiseFormSubmission",
      name,
      businessName,
      email,
      message,
      createdAt: new Date().toISOString(),
    };

    const result = await writeClient.create(doc);

    return NextResponse.json({ success: true, id: result._id });
  } catch (err: unknown) {
    console.error("Sanity form submission error:", err);

    let message = "Something went wrong";
    if (err instanceof Error) {
      message = err.message;
    }

    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
