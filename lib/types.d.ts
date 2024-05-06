interface ProductFields {
  title: string;
  image: string;
  price: string;
  launchDate: string;
  category: string;
  ratings: { rating: number; brand: string; reviewCount: number }[];
  standouts: string[];
  features: Object;
  cons: string[];
  Links: { link: string; brand: "AMAZON" | "FLIPKART" }[];
  highlights: string[];
  shortDescription: string;
}
interface resProductFields extends ProductFields {
  id: string;
}
