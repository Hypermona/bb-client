import React from "react";
import Image from "next/image";
import { Card } from "./ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import Link from "next/link";
import NoImage from "./NoImage";

interface Data {
  title?: string;
  description?: string;
  image?: string;
}

async function PostCard({ metaData }: { metaData: any }) {
  return (
    metaData && (
      <Card className="w-[350px] border-none">
        <div>
          <Link href={`/posts/${metaData?.filename.split(".")[0]}`}>
            {metaData?.context?.poster! ? (
              <Image
                //   className="rounded-t-lg"
                src={metaData?.context?.poster!}
                alt={metaData?.context?.title!}
                width={350}
                height={220}
              />
            ) : (
              <NoImage width={350} height={220} />
            )}
          </Link>
          <div className="p-3 flex items-start space-x-4">
            <Avatar>
              <AvatarImage src="https://miro.medium.com/v2/resize:fill:110:110/1*uP3MtIkSjfBDNVO7RRRAuw.jpeg" />
              <AvatarFallback>MS</AvatarFallback>
            </Avatar>
            <div>
              <Link href={`/posts/${metaData?.filename.split(".")[0]}`}>
                <p className="mb-4 text-lg font-semibold tracking-tight">
                  {metaData?.context?.title!}
                </p>
              </Link>
              <p className="text-sm font-medium leading-none">Mohana S</p>
              <p className="text-sm text-muted-foreground">{`last updated: ${new Date(
                metaData.uploaded_at
              ).toLocaleDateString()}`}</p>
            </div>
          </div>
        </div>
      </Card>
    )
  );
}

export default PostCard;
