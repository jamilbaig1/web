import Link from "next/link";

export default function Footer() {
  return (
    <footer className="main-footer bg-gradient-to-r from-[#2563eb] to-[#1e40af] text-white pt-12 pb-0 mt-10 w-full">
      <div className="main-footer-inner grid grid-cols-1 md:grid-cols-3 gap-10 pb-8 mx-auto">
        {/* Column 1 */}
        <div>
          <h3 className="text-2xl font-bold mb-2">The Local Loop FL</h3>
          <p className="text-base text-white/90 max-w-xs">Your guide to Winter Gardens, Florida. Discover local events, business and stories.</p>
        </div>
        {/* Column 2 */}
        <div>
          <h3 className="text-xl font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-2 mt-2">
            <li><Link href="/" className="hover:underline">Home</Link></li>
            <li><Link href="/newsletter" className="hover:underline">Newsletter</Link></li>
            <li><Link href="/blog" className="hover:underline">Blog</Link></li>
            <li><Link href="/local-spotlight" className="hover:underline">Local Spotlight</Link></li>
            <li><Link href="/shop" className="hover:underline">Shop</Link></li>
            <li><Link href="/advertise" className="hover:underline">Advertise</Link></li>
            <li><Link href="/about" className="hover:underline">About</Link></li>
            <li><Link href="/contact" className="hover:underline">Contact</Link></li>
          </ul>
        </div>
        {/* Column 3 */}
        <div>
          <h3 className="text-xl font-semibold mb-2">Stay Connected</h3>
          <form className="flex flex-col sm:flex-row gap-3 mt-2">
            <input
              type="email"
              placeholder="Your email"
              className="px-4 py-2 rounded border border-gray-200 text-white bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#f97316] flex-1 min-w-0 placeholder-white"
            />
            <button
              type="submit"
              className="px-6 py-2 btn-orange border border-[#f97316] text-white rounded font-semibold text-base flex items-center gap-2 min-w-[120px] justify-center cursor-pointer hover:bg-transparent hover:text-[#f97316] transition-colors duration-200"
            >
              Signup
            </button>
          </form>
          {/* Social Icons */}
          <div className="flex gap-4 mt-4">
            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <svg className="w-6 h-6 transition" fill="white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M240 363.3L240 576L356 576L356 363.3L442.5 363.3L460.5 265.5L356 265.5L356 230.9C356 179.2 376.3 159.4 428.7 159.4C445 159.4 458.1 159.8 465.7 160.6L465.7 71.9C451.4 68 416.4 64 396.2 64C289.3 64 240 114.5 240 223.4L240 265.5L174 265.5L174 363.3L240 363.3z"/></svg>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <svg className="w-6 h-6 transition" fill="white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M320.3 205C256.8 204.8 205.2 256.2 205 319.7C204.8 383.2 256.2 434.8 319.7 435C383.2 435.2 434.8 383.8 435 320.3C435.2 256.8 383.8 205.2 320.3 205zM319.7 245.4C360.9 245.2 394.4 278.5 394.6 319.7C394.8 360.9 361.5 394.4 320.3 394.6C279.1 394.8 245.6 361.5 245.4 320.3C245.2 279.1 278.5 245.6 319.7 245.4zM413.1 200.3C413.1 185.5 425.1 173.5 439.9 173.5C454.7 173.5 466.7 185.5 466.7 200.3C466.7 215.1 454.7 227.1 439.9 227.1C425.1 227.1 413.1 215.1 413.1 200.3zM542.8 227.5C541.1 191.6 532.9 159.8 506.6 133.6C480.4 107.4 448.6 99.2 412.7 97.4C375.7 95.3 264.8 95.3 227.8 97.4C192 99.1 160.2 107.3 133.9 133.5C107.6 159.7 99.5 191.5 97.7 227.4C95.6 264.4 95.6 375.3 97.7 412.3C99.4 448.2 107.6 480 133.9 506.2C160.2 532.4 191.9 540.6 227.8 542.4C264.8 544.5 375.7 544.5 412.7 542.4C448.6 540.7 480.4 532.5 506.6 506.2C532.8 480 541 448.2 542.8 412.3C544.9 375.3 544.9 264.5 542.8 227.5zM495 452C487.2 471.6 472.1 486.7 452.4 494.6C422.9 506.3 352.9 503.6 320.3 503.6C287.7 503.6 217.6 506.2 188.2 494.6C168.6 486.8 153.5 471.7 145.6 452C133.9 422.5 136.6 352.5 136.6 319.9C136.6 287.3 134 217.2 145.6 187.8C153.4 168.2 168.5 153.1 188.2 145.2C217.7 133.5 287.7 136.2 320.3 136.2C352.9 136.2 423 133.6 452.4 145.2C472 153 487.1 168.1 495 187.8C506.7 217.3 504 287.3 504 319.9C504 352.5 506.7 422.6 495 452z"/></svg>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="X">
              <svg className="w-6 h-6 transition" fill="white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M453.2 112L523.8 112L369.6 288.2L551 528L409 528L297.7 382.6L170.5 528L99.8 528L264.7 339.5L90.8 112L236.4 112L336.9 244.9L453.2 112zM428.4 485.8L467.5 485.8L215.1 152L173.1 152L428.4 485.8z"/></svg>
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-200/40 mt-4 pt-4 pb-6 text-center">
        <span className="text-white text-sm">&copy; 2025 The Local Loop FL. All Rights Reserved.</span>
      </div>
    </footer>
  );
}
