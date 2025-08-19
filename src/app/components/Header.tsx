import LogoServer from "../components/LogoServer";
import HeaderClient from "../components/HeaderClient";

export default async function Header() {
  return (
    <header className="main-header py-4 shadow-md sticky top-0 z-50 bg-[#20293a]">
      <div className="main-header-inner flex items-center justify-between relative ">
        <div className="flex items-center space-x-4">
          <LogoServer />
        </div>

        {/* Client-only part */}
        <HeaderClient />
      </div>
    </header>
  );
}
