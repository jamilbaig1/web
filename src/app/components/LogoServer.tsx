import { fetchSiteLogo } from "@/lib/fetchLogo";
import { urlFor } from "@/lib/sanity";
import LogoClient from "../components/LogoClient";

export default async function LogoServer() {
  const logo = await fetchSiteLogo();
  return <LogoClient logo={logo} />;
}