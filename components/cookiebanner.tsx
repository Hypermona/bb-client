"use client";

import Link from "next/link";
import { getLocalStorage, setLocalStorage } from "@/lib/storageHelper";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";

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
];

export default function CookieBanner() {
  const [cookieConsent, setCookieConsent] = useState(getLocalStorage("cookie_consent", null));

  useEffect(() => {
    if (typeof window.gtag !== "undefined") {
      const newValue = cookieConsent ? "granted" : "denied";

      window.gtag("consent", "update", {
        analytics_storage: newValue,
      });

      setLocalStorage("cookie_consent", cookieConsent);
    }
    //For Testing
    // console.log("Cookie Consent: ", cookieConsent);
  }, [cookieConsent]);

  if (cookieConsent) {
    return null;
  }
  return (
    <div
      className={`my-10 mx-auto max-w-max md:max-w-screen-lg
                        fixed bottom-0 left-0 right-0 
                        flex px-3 md:px-4 py-3 justify-between items-center flex-col sm:flex-row gap-4  
                         bg-gray-700 rounded-lg shadow`}
    >
      <div className="text-center">
        <p>
          We use <span className="font-bold text-sky-400">cookies</span> to make sure you have the
          best experience on our website. If you keep using this site, we&apos;ll assume you&apos;re
          happy with it.
          {footerLinks.map((fl) => (
            <Link
              key={fl.link}
              href={fl.link}
              target={fl.target}
              rel={fl.rel}
              className="underline underline-offset-2 text-gray-300 m-1"
            >
              {fl.name}
            </Link>
          ))}
        </p>
      </div>

      <div className="flex gap-2">
        <Button className="..." onClick={() => setCookieConsent(true)}>
          Allow Cookies
        </Button>
      </div>
    </div>
  );
}
