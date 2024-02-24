import { getData } from "@/lib/dataservices";
import "./style.css";
import ProductCard from "@/components/ProductCard";
import Image from "next/image";
import Link from "next/link";
import NoImage from "@/components/NoImage";

export async function generateStaticParams() {
  const posts = await getData("/api/posts");
  return posts.map((post: any) => ({
    slug: post?.filename?.split(".")[0],
  }));
}

// Multiple versions of this page will be statically generated
// using the `params` returned by `generateStaticParams`
export default async function Page({ params }: Readonly<{ params: { slug: string } }>) {
  const { slug } = params;
  const post = await getData(
    `https://res.cloudinary.com/hypermona/raw/upload/bb-admin/blogs/${slug}.json`,
    true
  );
  const related = await getData(`/api/posts/related?price=${post?.priceCategory}&filename=${slug}`);

  return (
    <div className="sm:flex">
      <div>
        {post?.type === "BLOG" && (
          <div className="sm:w-[700px] mx-3 sm:mr-auto sm:ml-[12vw] my-5">
            <h1 className="PlaygroundEditorTheme__h1">{post?.title}</h1>
            <p className="text-lg text-muted-foreground mt-5">{post?.shortDescription}</p>
            <div dangerouslySetInnerHTML={{ __html: post?.description }}></div>
          </div>
        )}
        {post?.type === "PRODUCT" && (
          <div className="sm:w-[700px] mx-3 sm:mr-auto sm:ml-[12vw] my-5">
            <h1 className="PlaygroundEditorTheme__h1">{post?.title}</h1>
            <p className="text-lg text-muted-foreground mt-5">{post?.shortDescription}</p>
            {post?.productCards.map((product: ProductFields, i: number) => (
              <ProductCard product={product} index={i} key={product?.id} />
            ))}
          </div>
        )}
      </div>
      <div className="opacity-70">
        <div className="sm:m-20 p-5 bg-slate-200 dark:bg-slate-900  rounded-md">
          <h2 className="text-xl font-semibold">Related Posts</h2>
          {related.map((r: any) => (
            <div className="my-2 flex" key={r?.asset_id}>
              {r?.context?.poster ? (
                <Image
                  alt={r?.context?.title}
                  src={r?.context?.poster}
                  width={170}
                  height={100}
                  quality={50}
                />
              ) : (
                <NoImage width={170} height={100} />
              )}
              <div className="ml-3">
                <Link href={`/posts/${r?.filename.split(".")[0]}`}>
                  <p className="underline underline-offset-4 mb-2">{r?.context?.title}</p>
                </Link>
                <p className="text-sm text-muted-foreground">
                  {new Date(r?.uploaded_at).toDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
