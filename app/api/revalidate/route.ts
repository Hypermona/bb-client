import { revalidatePath } from "next/cache";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const path = request.nextUrl.searchParams.get("path");
  const token = request.nextUrl.searchParams.get("token");
  if (!path) {
    return Response.json({
      revalidated: false,
      now: new Date().toLocaleString(),
      message: "Missing path to revalidate",
    });
  }
  if (token !== process.env.REVALIDATE_TOKEN) {
    return Response.json({
      revalidated: false,
      now: new Date().toLocaleString(),
      message: "Invalid token!",
    });
  }
  revalidatePath(path);
  return Response.json({ revalidated: true, now: new Date().toLocaleString() });
}
