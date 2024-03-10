import { getRelatedPosts } from "@/lib/dataservices";
import React from "react";
import { Badge } from "./ui/badge";
import Image from "next/image";
import NoImage from "./NoImage";
import Link from "next/link";

type Props = {
  slug: string;
  post: any;
};

async function RelatedPosts({ slug, post }: Props) {
  const related = await getRelatedPosts(slug, post?.type, post?.priceCategory, post?.tags);

  return (
    <div>
      {related?.length > 1 && (
        <div className="sm:m-20 p-5 bg-slate-200 dark:bg-slate-900 rounded-md w-[90vw] sm:w-[40vw]">
          <h2 className="text-2xl font-semibold m-2 mb-4">
            Related Posts <Badge className="bg-[#d4ff32]">New</Badge>
          </h2>
          <hr />
          {related.map((r: any) => (
            <div className="my-3 flex" key={r?.asset_id}>
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
      )}
    </div>
  );
}

export default RelatedPosts;
