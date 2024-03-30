import PostCard from "@/components/PostCard";
import { ServerPagination } from "@/components/ServerPagination";
import { getPostsByPage } from "@/lib/dataservices";

interface Props {
  searchParams: { page: string };
}

export default async function Home({ searchParams }: Readonly<Props>) {
  const { posts, prev } = await getPostsByPage(searchParams?.page);
  return (
    <main className="p-1 sm:p-5">
      <div className="flex flex-wrap gap-4 justify-center sm:gap-y-20 mt-5">
        {posts?.resources?.map((p: any, i: any) => (
          <PostCard key={i} metaData={p} />
        ))}
        <ServerPagination nextPage={posts?.next_cursor ?? ""} prev={prev} />
      </div>
    </main>
  );
}
