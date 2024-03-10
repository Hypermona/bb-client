import { getAllPosts, getData, getRelatedPosts } from "@/lib/dataservices";
import "./style.css";
import ProductCard from "@/components/ProductCard";
import Image from "next/image";
import Link from "next/link";
import NoImage from "@/components/NoImage";
import { Badge } from "@/components/ui/badge";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import RelatedPosts from "@/components/RelatedPosts";

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post: any) => ({
    slug: post?.filename?.split(".")[0],
  }));
}

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const post: ProductFields = await getData(
    `https://res.cloudinary.com/hypermona/raw/upload/bb-admin/blogs/${params.slug}.json`,
    true
  );
  return {
    title: post.title,
    description: post.shortDescription,
    openGraph: {
      images: [post.image],
    },
  };
}

// Multiple versions of this page will be statically generated
// using the `params` returned by `generateStaticParams`
export default async function Page({ params }: Readonly<{ params: { slug: string } }>) {
  const { slug } = params;
  const post = await getData(
    `https://res.cloudinary.com/hypermona/raw/upload/bb-admin/blogs/${slug}.json`,
    true
  );
  if (post.failed) {
    return notFound();
  }
  const related = await getRelatedPosts(slug, post?.type, post?.priceCategory, post?.tags);
  console.log("SEARCH reasult for", related);
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
      <RelatedPosts related={related} />
    </div>
  );
}
