export const currencyFormatter = (value: string) => {
  let price: number = Number.isInteger(value) ? Number.parseInt(value) : Number.parseFloat(value);
  return price.toLocaleString("en-IN", {
    maximumFractionDigits: 2,
    style: "currency",
    currency: "INR",
  });
};
