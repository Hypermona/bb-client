import Link from "next/link";
import React from "react";

const footerLinks = [
  {
    name: "Privacy Policy",
    link: "/legal/privacy-policy",
    target: "_blank",
    rel: "external nofollow noopener",
  },
  {
    name: "Cookie Policy",
    link: "/legal/cookie-policy",
    target: "_blank",
    rel: "external nofollow noopener",
  },
  {
    name: "Terms & Conditions",
    link: "/legal/terms-of-use",
    target: "_blank",
    rel: "external nofollow noopener",
  },
];

function Footer() {
  return (
    <div className="flex justify-center items-center mt-16">
      {footerLinks.map((fl) => (
        <Link
          key={fl.link}
          href={fl.link}
          target={fl.target}
          rel={fl.rel}
          className="underline underline-offset-2 text-gray-300 p-5"
        >
          {fl.name}
        </Link>
      ))}
    </div>
  );
}

export default Footer;
