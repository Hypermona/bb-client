import { getAllPosts } from "@/lib/dataservices";
import { url } from "inspector";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts();
  return posts.map((post: any) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/posts/${post?.filename.split(".")[0]}`,
    lastModified: new Date(post.uploaded_at),
  }));
}
