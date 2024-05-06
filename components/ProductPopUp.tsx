import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";
import NoImage from "./NoImage";
import { FeatureBlock, GetRatings, LaunchBage, logos } from "./ProductHelpers";
import Image from "next/image";
import { brands, currencyFormatter } from "@/lib/helpers";

const BuyButtons = ({ product }: { product: ProductFields }) =>
  product?.Links?.map((link) => (
    <Button className="w-full" key={link.brand}>
      <Avatar>
        <AvatarImage src={brands[link.brand].icon} />
        <AvatarFallback>{link.brand}</AvatarFallback>
      </Avatar>{" "}
      <Link href={link.link} target="_blank" className="underline">
        {brands[link.brand].label}
      </Link>
    </Button>
  ));

export default function ProductPopUp({ product }: Readonly<{ product: ProductFields }>) {
  const standouts = product?.standouts.map((v) => ({ value: v, label: "FEAT", logo: null }));
  const standOutProds = Object.entries(product.features ?? {}) // features having standout flag as true
    ?.filter((f) => f[1]?.standout && f[1]?.value)
    ?.map((f) => ({ label: f[0], value: f[1]?.value, logo: logos["FEAT"] }));
  const normalProds = Object.entries(product.features ?? {})
    ?.filter((f) => !f[1]?.standout && f[1]?.value)
    ?.map((f) => ({ label: f[0], value: f[1]?.value, logo: null }));
  const cons = product?.cons.map((v) => ({ value: v, label: "CONS", logo: null }));
  const heighlights = product?.highlights?.map((v) => ({ value: v, label: "HL", logo: null }));
  const ProductList = [...standouts, ...standOutProds, ...normalProds, ...heighlights, ...cons];
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"link"} className="w-full underline">
          Open View More PopUp
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[70vw] h-[90vh] overflow-x-auto p-1">
        <div className="my-10">
          <div className="flex flex-wrap sm:flex-nowrap justify-center sm:mx-3 relative ">
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
            <div className="sm:ml-10">
              <div className="p-3 pb-1">
                <LaunchBage date={product?.launchDate} />
                <div className="flex sm:mt-3">
                  <p className={"sm:text-xl font-semibold tracking-tight ml-1"}>{product.title}</p>
                  {!!product.ratings?.length && (
                    <span className="ml-1">
                      <GetRatings ratings={product.ratings} />
                    </span>
                  )}
                </div>
              </div>
              <p className="text-muted-foreground p-3 pt-1">
                {currencyFormatter(product.price)}{" "}
                <span className="text-sm text-muted-foreground">Starting price</span>
              </p>
              <div className="flex gap-2 sm:w-[40vw] p-3">
                <BuyButtons product={product} />
              </div>
              <div className="mt-3 text-sm">
                <div className="flex flex-wrap gap-1 sm:gap-2">
                  {ProductList?.slice(0)?.map(({ value, label, logo }, i: any) => (
                    <FeatureBlock key={i} label={label} value={value} logo={logo} />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="p-3 mt-5">
            <p className="text-xl">Summary</p>
            <p className="text-md text-muted-foreground">{product.shortDescription}</p>
          </div>
        </div>
        <div className="grid gap-4 py-4"></div>
        <DialogFooter>
          <DialogClose>
            <Button type="submit" className="p-3">
              Close this
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
