import PostCard from "@/components/PostCard";
import { getData } from "@/lib/dataservices";

export default async function Home() {
  const posts = await getData("/api/posts");
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
