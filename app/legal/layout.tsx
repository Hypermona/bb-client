import "./style.css";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div className="mx-[5vw] sm:mx-[15vw]">{children}</div>;
}
