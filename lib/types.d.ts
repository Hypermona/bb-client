interface ProductFields {
  id: string;
  title: string;
  image: string;
  price: string;
  launchDate: string;
  category: string;
  ratings: { rating: number; brand: string; reviewCount: number }[];
  standouts: string[];
  features: Object;
  cons: string[];
  links: { link: string; brand: string }[];
  shortDescription: string;
}
