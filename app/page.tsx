import PostCard from "@/components/PostCard";
import { getAllPosts, getData } from "@/lib/dataservices";

export default async function Home() {
  const posts = await getAllPosts();
  return (
    <main className="p-1 sm:p-5">
      <div className="flex flex-wrap gap-4 justify-center sm:gap-y-20 mt-5">
        {posts?.map((p: any, i: any) => (
          <PostCard key={i} metaData={p} />
        ))}
      </div>
    </main>
  );
}
