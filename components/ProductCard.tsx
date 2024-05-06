import Image from "next/image";
import { brands, currencyFormatter } from "@/lib/helpers";
import { ValueNoneIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import NoImage from "./NoImage";
import Link from "next/link";
import { GetRatings, LaunchBage, RenderFeatures, logos } from "./ProductHelpers";
import ProductPopUp from "./ProductPopUp";

type Props = { product: ProductFields; index: number };

const ProductCard = ({ product, index }: Props) => {
  return (
    <div className="my-10">
      <LaunchBage date={product?.launchDate} />
      <div className="flex sm:mt-3 mb-2 sm:mb-3">
        <p className={"sm:text-xl font-semibold tracking-tight ml-1"}>{product.title}</p>
        {!!product.ratings?.length && (
          <span className="ml-1">
            <GetRatings ratings={product.ratings} />
          </span>
        )}
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
          <div className="mt-3 text-sm">
            {product.standouts?.slice(0)?.map((f, i: any) => (
              <div key={f[0]} className={"flex items-center jus sm:my-1 w-[200px] sm:w-[27vw]"}>
                <span className="mr-2">{logos["FEAT"]}</span>
                <p className={"text-sm overflow-hidden whitespace-nowrap text-ellipsis"}>{f}</p>
              </div>
            ))}
            <RenderFeatures product={product} />
            {Object.entries(product.features ?? {}).length < 4 &&
              product.highlights?.slice(0)?.map((f, i: any) => (
                <div key={f[0]} className={"flex items-center jus sm:my-1 w-[200px] sm:w-[27vw]"}>
                  <span className="mr-2">{logos["HL"]}</span>
                  <p className={"text-sm overflow-hidden whitespace-nowrap text-ellipsis"}>{f}</p>
                </div>
              ))}
            {product?.cons?.slice(0)?.map((c, i) => (
              <div key={c} className={"flex items-start w-[200px] sm:w-[27vw]"}>
                <ValueNoneIcon color="red" />
                <span className={"ml-2 overflow-hidden whitespace-nowrap text-ellipsis"}>{c}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="w-full my-2">
        <ProductPopUp product={product} />
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
