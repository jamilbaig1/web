import Script from "next/script";
import React from "react";

export interface NewsletterProps {
  iframeWidth?: string;
  iframeHeight?: string;
}

const NewsletterBox: React.FC<NewsletterProps> = ({
  iframeWidth = "100%",
  iframeHeight = "",
}) => {
  return (
    <>
      {/* Subscription iframe */}
      <div className="main-content mx-auto px-5 flex justify-center items-center">
        <iframe
          src="https://subscribe-forms.beehiiv.com/28008b0c-4344-46cb-9c32-c2ec0316231e"
          className="beehiiv-embed"
          data-test-id="beehiiv-embed"
          frameBorder={0}
          scrolling="no"
          style={{
            width: iframeWidth,
            height: iframeHeight,
            maxHeight: "60px",
            margin: 0,
            borderRadius: "0px",
            backgroundColor: "transparent",
            boxShadow: "0 0 #0000",
            maxWidth: "100%",
          }}
        />
      </div>

      {/* Beehiiv embed script */}
      <Script
        src="https://subscribe-forms.beehiiv.com/embed.js"
        strategy="lazyOnload"
      />
    </>
  );
};

export default NewsletterBox;
