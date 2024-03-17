"use client";
import Image from "next/image";
import React, { useState } from "react";
import { brands, currencyFormatter } from "@/lib/helpers";
import {
  CameraIcon,
  CaretSortIcon,
  ClipboardIcon,
  ComponentNoneIcon,
  DoubleArrowDownIcon,
  DoubleArrowUpIcon,
  LapTimerIcon,
  LightningBoltIcon,
  MarginIcon,
  MobileIcon,
  Share1Icon,
  StackIcon,
  StarFilledIcon,
  ValueNoneIcon,
} from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Badge } from "./ui/badge";
import NoImage from "./NoImage";
import NetworkIcon from "./icons/NetworkIcon";
import Link from "next/link";

type Props = { product: ProductFields; index: number };

const features = {
  display: "(6.1-inch) Super Retina XDR display",
  network: "Superfast 5G cellular",
  processor: "A15 Bionic chip with 5-core GPU",
  OS: "iOS 16",
  camera: "4K Dolby Vision up to 30 fps",
};

const topFeatrues = ["100X Optical Zoom", "Worlds Number 1 Chip"];

const logos: any = {
  display: <MobileIcon />,
  battery: <ClipboardIcon className="rotate-90" />,
  connectivity: <Share1Icon />,
  charger: <ComponentNoneIcon />,
  network: <NetworkIcon />,
  chip: <MarginIcon />,
  os: <StackIcon />,
  camera: <CameraIcon />,
  FEAT: <LightningBoltIcon color="#FFD700" />,
  standBy: <LapTimerIcon />,
};

const cons = ["No Audio Jack", "No charger at the Box", "No Fast Charging", "No call recording"];

const getRatings = (ratings: { rating: number; brand: string; reviewCount: number }[]) => {
  const avgRating = ratings.reduce((accumulator, curr) => accumulator + +curr.rating, 0);
  return (
    <Popover>
      <PopoverTrigger>
        <Badge className="flex items-center text-sm underline">
          {(avgRating / ratings.length).toFixed(1)} <StarFilledIcon color="#CD853F" />
        </Badge>
      </PopoverTrigger>
      <PopoverContent>
        {ratings.map((r) => (
          <p key={r.brand} className="flex items-center text-sm">
            {r.brand} - {r.rating} <StarFilledIcon color="#CD853F" /> - ({r.reviewCount})
          </p>
        ))}
      </PopoverContent>
    </Popover>
  );
};

const LaunchBage = (date: string) => {
  const newDate = new Date(date);
  const timestamp = new Date().getTime() - 30 * 24 * 60 * 60 * 1000;
  const show = newDate.getTime() > timestamp;
  const yetTolaunch = newDate.getTime() > new Date().getTime();
  if (show) {
    return (
      <div
        className={
          "text-xs sm:mb-[-10px] px-1 rounded-sm w-fit" +
          (yetTolaunch ? " bg-fuchsia-700" : " bg-emerald-700")
        }
      >
        {yetTolaunch ? `Launching on ${newDate.toDateString()}` : "New Launch"}
      </div>
    );
  } else {
    return null;
  }
};

const ProductCard = ({ product, index }: Props) => {
  const [expand, setExpand] = useState(false);
  return (
    <div className="my-10">
      {LaunchBage(product?.launchDate)}
      <div className="flex sm:mt-3 mb-2 sm:mb-3">
        <p className={"sm:text-xl font-semibold tracking-tight ml-1"}>{product.title}</p>
        {!!product.ratings?.length && <span className="ml-1">{getRatings(product.ratings)}</span>}
      </div>
      <div className="flex mx-1 sm:mx-3 relative ">
        {/* <p className="custom-stroke absolute left-[-20px] top-[-40px] text-[6rem] text-black">
          {index + 1}
        </p> */}
        {product.image ? (
          <Image
            width={200}
            height={300}
            className="rounded-md w-[150px] h-[200px] sm:w-[250px] sm:h-[300px] object-cover"
            src={product.image}
            alt="image"
          />
        ) : (
          <NoImage width={200} height={300} />
        )}
        <div className="ml-3 sm:ml-10">
          <p className="text-muted-foreground">
            {currencyFormatter(product.price)}{" "}
            <span className="text-sm text-muted-foreground">Starting price</span>
          </p>
          <div
            className="mt-3 text-sm"
            style={{ minHeight: expand ? 300 : 200, transition: "all .5s ease" }}
          >
            {product.standouts?.slice(0, expand ? undefined : 4)?.map((f, i: any) => (
              <div key={f[0]} className="flex items-center jus sm:my-1 w-[200px] sm:w-[75%]">
                <span className="mr-2">{logos["FEAT"]}</span>
                <p
                  className={
                    "text-sm" + (expand ? "" : " overflow-hidden whitespace-nowrap text-ellipsis")
                  }
                >
                  {f}
                </p>
              </div>
            ))}
            {Object.entries(product.features)
              ?.filter((f) => f[1])
              ?.slice(0)
              ?.map((f, i: any) => (
                <p key={f[0]} className="flex items-start sm:my-1 text-sm w-[200px] sm:w-[75%] ">
                  <span className="mr-2 text-white">{logos[f[0]]}</span>
                  <span className={expand ? "" : "overflow-hidden whitespace-nowrap text-ellipsis"}>
                    {typeof f[1] === "object" ? f[1]?.label : f[1]}
                  </span>
                </p>
              ))}
            {product?.cons?.slice(0, expand ? undefined : 3)?.map((c, i) => (
              <div key={c} className="flex items-start w-[200px] sm:w-[75%] ">
                <ValueNoneIcon color="red" />
                <span
                  className={
                    "ml-2" + (expand ? "" : " overflow-hidden whitespace-nowrap text-ellipsis")
                  }
                >
                  {c}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="w-full my-2">
        <Button variant={"link"} className="w-full" onClick={() => setExpand((prev) => !prev)}>
          {expand ? <DoubleArrowUpIcon /> : <DoubleArrowDownIcon />}
          <p className="ml-2">{expand ? "View Less..." : "View more..."}</p>
        </Button>
        <div className="flex justify-around gap-1">
          {product?.Links?.map((link) => (
            <Button className="w-full" key={link.brand}>
              <Avatar>
                <AvatarImage src={brands[link.brand].icon} />
                <AvatarFallback>{link.brand}</AvatarFallback>
              </Avatar>{" "}
              <Link href={link.link} target="_blank" className="underline">
                {brands[link.brand].label}
              </Link>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
