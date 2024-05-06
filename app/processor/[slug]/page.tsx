import { getData, getProcessorPost, getRelatedPost } from "@/lib/dataservices";
import "./style.css";
import ProductCard from "@/components/ProductCard";
import { Metadata } from "next";
import RelatedPosts from "@/components/RelatedPosts";
import { PROCESSOR_LINK } from "@/lib/helpers";

export async function generateStaticParams() {
  const posts = await getData(PROCESSOR_LINK, true);
  return posts.map((post: any) => ({
    slug: post?.value,
  }));
}

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const post: ProductFields = await getProcessorPost(params.slug);
  return {
    title: post.title,
  };
}

// Multiple versions of this page will be statically generated
// using the `params` returned by `generateStaticParams`
export default async function Page({ params }: Readonly<{ params: { slug: string } }>) {
  const { slug } = params;
  const post = await getProcessorPost(slug);
  const related = await getRelatedPost(slug);
  return (
    <div className="sm:flex">
      <div className="sm:w-[700px] mx-3 sm:mr-auto sm:ml-[12vw] my-5">
        <h1 className="PlaygroundEditorTheme__h1">{post?.title}</h1>
        {post?.shortDescription && (
          <p className="text-lg text-muted-foreground mt-5">{post?.shortDescription}</p>
        )}
        {post?.productCards.map((product: resProductFields, i: number) => (
          <ProductCard product={product} index={i} key={product?.id} />
        ))}
      </div>
      <RelatedPosts to="processor" related={related} />
    </div>
  );
}
