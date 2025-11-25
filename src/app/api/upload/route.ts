import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export const runtime = "nodejs"; // ✅ Required for Cloudinary

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { message: "No file uploaded" },
        { status: 400 }
      );
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { message: "Only images allowed" },
        { status: 400 }
      );
    }

    if (file.size > 5 * 1024 * 1024) {
        return NextResponse.json(
            { message: "File too large (max 5MB)" },
            { status: 400 }
        );
    }


    const buffer = Buffer.from(await file.arrayBuffer());

    const uploadResult = await new Promise<any>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          { folder: "blog-images" },
          (err, result) => (err ? reject(err) : resolve(result))
        )
        .end(buffer);
    });

    return NextResponse.json({ url: uploadResult.secure_url });
  } catch (error) {
    console.error("Upload Error:", error);
    return NextResponse.json(
      { message: "Upload failed" },
      { status: 500 }
    );
  }
}