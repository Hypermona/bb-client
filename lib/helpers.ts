import AmazonLogo from "../public/logos/amazon.png";
import FlipkartLogo from "../public/logos/flipkart.png";

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
