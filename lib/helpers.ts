import AmazonLogo from "../public/logos/amazon.png";
import FlipkartLogo from "../public/logos/flipkart.png";

export const PROCESSOR_LINK = `https://res.cloudinary.com/hypermona/raw/upload/v1710527909/${process.env.MAIN_FOLDER}/features/feature__processors.json`;

export const currencyFormatter = (value: string) => {
  let price: number = Number.isInteger(value) ? Number.parseInt(value) : Number.parseFloat(value);
  return price.toLocaleString("en-IN", {
    maximumFractionDigits: 2,
    style: "currency",
    currency: "INR",
  });
};

export const brands = {
  AMAZON: {
    icon: AmazonLogo.src,
    label: "Amazon",
  },
  FLIPKART: {
    icon: FlipkartLogo.src,
    label: "Flipkart",
  },
};
const capitalized = (word: string) => (word ? word.charAt(0).toUpperCase() + word.slice(1) : "");

export const unslugify = (slug: string) =>
  slug
    ?.split("-")
    .map((s) => capitalized(s))
    .join(" ");
