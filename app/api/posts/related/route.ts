import { v2 as cloudinary } from "cloudinary";
import { NextRequest } from "next/server";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export async function GET(req: NextRequest) {
  const price = req.nextUrl.searchParams.get("price");
  const filename = req.nextUrl.searchParams.get("filename");
  let posts = Array;
  return cloudinary.search
    .expression("folder:bb-admin/blogs/*")
    .expression(`context.price<=${(Number(price) || 0) + 5000} AND -filename=${filename}.json`)
    .sort_by("public_id", "desc")
    .max_results(5)
    .with_field("context")
    .execute()
    .then((result) => {
      console.log("77777777777777777777", typeof result?.resources);
      posts = result?.resources;
      return new Response(JSON.stringify(posts), {
        status: 200,
      });
    })
    .catch((err) => {
      // console.log(err);
    });
}
