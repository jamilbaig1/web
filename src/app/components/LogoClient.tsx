"use client";

import Image from "next/image";
import { urlFor } from "@/lib/sanity";

interface LogoData {
  logo?: {
    asset: { _ref: string; _type: "reference" };
    _type: "image";
  };
  alt?: string;
  title?: string;
}

export default function LogoClient({ logo }: { logo: LogoData }) {
  if (!logo?.logo) return null; 

  return (
    <div className="site-logo">
    <Image
        src={urlFor(logo.logo).width(120).url()}
        width={120}
        height={120}
        alt={logo.alt || "Logo"}
        priority
        style={{ height: "auto", width: "100%" }}
    />
    </div>

  );
}
