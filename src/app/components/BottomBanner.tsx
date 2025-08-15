"use client";
import React from "react";
import Script from "next/script";

export interface BottomBannerProps {
  iframeWidth?: string;
  iframeHeight?: string;
}

const BottomBanner: React.FC<BottomBannerProps> = ({
  iframeWidth = "660px",
  iframeHeight = "415px",
}) => {
  return (
    <>
      <iframe
        src="https://subscribe-forms.beehiiv.com/7714b0d6-2799-48b3-add9-8f38209814af"
        className="beehiiv-embed"
        data-test-id="beehiiv-embed"
        style={{
          width: iframeWidth,
          height: iframeHeight,
          margin: "0",
          borderRadius: "0px",
          backgroundColor: "transparent",
          boxShadow: "0 0 #0000",
          maxWidth: "100%",
          display: "block",
        }}
        allow="clipboard-write"
        title="Subscribe Form"
      ></iframe>

      {/* Beehiiv embed script */}
      <Script
        src="https://subscribe-forms.beehiiv.com/embed.js"
        strategy="lazyOnload"
      />
    </>
  );
};

export default BottomBanner;
