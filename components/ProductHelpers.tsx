import {
  CameraIcon,
  ClipboardIcon,
  ComponentNoneIcon,
  ContainerIcon,
  LapTimerIcon,
  LightningBoltIcon,
  MarginIcon,
  MobileIcon,
  Share1Icon,
  StackIcon,
  StarFilledIcon,
  ValueIcon,
  ValueNoneIcon,
} from "@radix-ui/react-icons";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Badge } from "./ui/badge";
import NetworkIcon from "./icons/NetworkIcon";
import Link from "next/link";

export const logos: any = {
  display: <MobileIcon />,
  battery: <ClipboardIcon className="rotate-90" />,
  connectivity: <Share1Icon />,
  charger: <ComponentNoneIcon />,
  network: <NetworkIcon />,
  chip: <ContainerIcon />,
  os: <StackIcon />,
  camera: <CameraIcon />,
  FEAT: <LightningBoltIcon color="#FFD700" />,
  standBy: <LapTimerIcon />,
  HL: <ValueIcon />,
  CONS: <ValueNoneIcon color="red" />,
};

export const GetRatings = ({
  ratings,
}: {
  ratings: { rating: number; brand: string; reviewCount: number }[];
}) => {
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

export const LaunchBage = ({ date }: { date: string }) => {
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

export const ValueComponent = ({ label, value, ellipsis = true }: any) => {
  const renderValue = () => {
    if (label === "chip" && typeof value === "object") {
      return (
        <Link href={`../processor/${value.value}`} className="underline underline-offset-1">
          {value.label}
        </Link>
      );
    } else if (typeof value === "object") {
      return value.label;
    } else {
      return value;
    }
  };

  return (
    <span className={ellipsis ? "overflow-hidden whitespace-nowrap text-ellipsis" : "text-left"}>
      {renderValue()}
    </span>
  );
};

export const RenderFeatures = ({ product }: { product: ProductFields }) => {
  const standOutProds = Object.entries(product.features ?? {})
    ?.filter((f) => f[1]?.standout && f[1]?.value)
    ?.map((f) => ({ label: f[0], value: f[1]?.value }));
  const normalProds = Object.entries(product.features ?? {})
    ?.filter((f) => !f[1]?.standout && f[1]?.value)
    ?.map((f) => ({ label: f[0], value: f[1]?.value }));
  return (
    <div>
      {standOutProds?.map(({ label, value }, i: any) => (
        <p key={label} className={"flex items-start sm:my-1 text-sm w-[200px] sm:w-[27vw]"}>
          <span className="mr-2 text-white">{logos["FEAT"]}</span>
          <ValueComponent label={label} value={value} />
        </p>
      ))}
      {normalProds?.map(({ label, value }, i: any) => (
        <p key={label} className={"flex items-start sm:my-1 text-sm w-[200px] sm:w-[27vw]"}>
          <span className="mr-2 text-white">{logos[label]}</span>
          <ValueComponent label={label} value={value} />
        </p>
      ))}
    </div>
  );
};

export const FeatureBlock = ({ label, value, logo = null }: any) => (
  <div
    key={label}
    className={"flex sm:my-1 w-[47vw] sm:w-[300px] p-3 border border-white-700 rounded-md"}
  >
    <span className="mr-2 mt-1 text-white">{logo || logos[label]}</span>
    <ValueComponent label={label} value={value} ellipsis={false} />
  </div>
);
