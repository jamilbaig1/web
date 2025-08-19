import FooterClient from "./FooterClient";
import LogoServer from "./LogoServer";


export default function Footer() {

  return (
    <footer className="main-footer bg-gradient-to-r from-[#2563eb] to-[#1e40af] text-white pt-12 pb-0 mt-10 w-full">
      <div className="main-footer-inner grid grid-cols-1 md:grid-cols-3 gap-10 pb-8 mx-auto px-2">
        {/* Column 1 */}
        <div>
          {/* <h3 className="text-2xl font-bold mb-2">The Local Loop FL</h3> */}
          <LogoServer/>
          <p className="text-base text-white/90 max-w-xs">Your guide to Winter Garden, Florida. Discover local events, business and stories.</p>
        </div>
        <FooterClient/>
      </div>
      <div className="border-t border-gray-200/40 mt-4 pt-4 pb-6 text-center">
        <span className="text-white text-sm">&copy; 2025 The Local Loop FL. All Rights Reserved.</span>
      </div>
    </footer>
  );
}
