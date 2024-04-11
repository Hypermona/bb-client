import Link from "next/link";

function Header() {
  return (
    <div className="flex p-5 border-b sticky top-0 z-10 bg-background">
      <div className="flex-1 text-4xl tracking-tight font-[700] mr-5 ">
        <Link href={"/"}>Best Buyer</Link>
        <span className="text-sm text-muted-foreground"> {" (beta v1.0.1)"}</span>
      </div>
      <span className="mr-2 text-muted-foreground cursor-not-allowed">Login</span>
    </div>
  );
}

export default Header;
