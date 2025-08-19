
import { client } from '../../lib/sanity';
import Image from 'next/image';
import Link from 'next/link';
import { fetchEvents } from '../../lib/queries';
import { EventItem } from '../../types/event';
import EventSection from "./components/EventSection";
import { fetchCategories } from "../lib/fetchCategories";
import { fetchBlogs } from "../lib/fetchBlogs";
import { fetchBlogCategories } from "../lib/fetchBlogCategories";
import BlogSection from "./components/BlogSection";
import { fetchSpotlights } from "../lib/fetchSpotlights";
import { fetchSpotlightCategories } from "../lib/fetchSpotlightCategories";
import SpotlightSection from "./components/SpotlightSection";
import TopBannerSections from './components/TopBannerSections';
import MiddelBanner from './components/MiddelBanner';
import BottomBanner from './components/BottomBanner';
import SideBar from './components/SideBar';
import { fetchTopBanner } from '@/lib/fetchTopBanner';
import { fetchMiddleBanner } from '@/lib/fetchMiddleBanner';
import { fetchSideBar } from '@/lib/fetchSidebar';
import NewsletterBox from './components/NewsLetterBox';

type BannerData = {
  backgroundImage?: {
    asset?: {
      url?: string;
    };
  };
  heading?: string;
  subHeading?: string;
  buttonOneText?: string;
  buttonOneLink?: string;
  buttonTwoText?: string;
  buttonTwoLink?: string;
};

async function getBannerData(): Promise<BannerData> {
  const query = `*[_type == "bannerSection"][0]{
    backgroundImage{asset->{url}},
    heading,
    subHeading,
    buttonOneText,
    buttonOneLink,
    buttonTwoText,
    buttonTwoLink
  }`;
  return await client.fetch(query);
}

export default async function HomePage() {
  const banner = await getBannerData();
  const allEvents: EventItem[] = await fetchEvents();
  const categories = await fetchCategories();
  const allBlogs = await fetchBlogs();
  const blogCategories = await fetchBlogCategories();
  const allSpotlights = await fetchSpotlights();
  const spotlightCategories = await fetchSpotlightCategories();
  const topBanner = await fetchTopBanner();
  const middleBanner = await fetchMiddleBanner();
  const sidebar = await fetchSideBar();
  const bgImage = banner?.backgroundImage?.asset?.url || '';

  const topBannerTitle = topBanner?.text || '';
  const topBannerImg = topBanner?.imageUrl || '';
  const topBannerlink = topBanner?.buttonLink || '';
  
  const middleBannerTitle = middleBanner?.text || '';
  const middleBannerImg = middleBanner?.imageUrl || '';
  const middleBannerlink = middleBanner?.buttonLink || '';
  
  // Hydrate events on client for pagination
  // Use a wrapper ClientComponent for event list
  return (
    <div className="main-content-area">

      {/*Top banner Section  */}
      <section className="container mx-auto px-5">
        <TopBannerSections bgImage={topBannerImg} text={topBannerTitle} viewLink={topBannerlink} />
      </section>

      {/* Banner Section */}
      <section
        className="hero-bg-image flex items-center justify-center text-white px-5 relative overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(90deg,#F97316 0%,#FACC15 100%), url(${bgImage})`,
          backgroundBlendMode: 'multiply',
        }}
      >
        {/* Gradient overlay for better contrast */}
        <div aria-hidden="true" className="absolute inset-0 z-0 pointer-events-none" style={{background: 'linear-gradient(90deg,#F97316 0%,#FACC15 100%)', opacity: 0.7}} />
        <div className="relative z-10 max-w-4xl text-center px-4">
          <h1 className="text-4xl font-bold mb-4">{banner?.heading}</h1>
          <p className="text-lg mb-6">{banner?.subHeading}</p>
          <div className="flex flex-wrap justify-center gap-4">
            {banner?.buttonOneText && banner?.buttonOneLink && (
              <a
                href={banner.buttonOneLink}
                className="bg-white text-black px-5 py-2 rounded font-medium"
              >
                {banner.buttonOneText}
              </a>
            )}
            {banner?.buttonTwoText && banner?.buttonTwoLink && (
              <a
                href={banner.buttonTwoLink}
                className="bg-transparent border border-white px-5 py-2 rounded font-medium"
              >
                {banner.buttonTwoText}
              </a>
            )}
            <NewsletterBox/>
          </div>
        </div>
      </section>

      <div className="main-content flex flex-col lg:flex-row gap-5">
        {/* Main Content */}
        <div className="flex-1">

          {/* Events Section */}
          <section className="py-12 px-0 w-full bg-white text-black">
            <div className="main-content mx-auto px-5">
              <h2 className="text-3xl font-semibold mb-6 text-center">Events</h2>
              <EventSection allEvents={allEvents} categories={categories} />
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="w-full max-h-165 lg:w-70  mt-0 lg:mt-26 overflow-y-auto">
          <SideBar  sidebar = { sidebar }  />
        </div>
      </div>

          {/* Middle Banner Section */}
          <section className="container mx-auto px-5 mt-5">
            <MiddelBanner bgImage={middleBannerImg} text={middleBannerTitle}  viewLink={middleBannerlink}/>
          </section>

      {/* Blog Section */}
          <section className="py-12 px-0 w-full bg-gray-50 text-black">
            <div className="main-content mx-auto px-5">
              <h2 className="text-3xl font-semibold mb-6 text-center">Blog</h2>
              <BlogSection allBlogs={allBlogs} categories={blogCategories} all={false} />
            </div>
          </section> 

          {/* Spotlight Section */}
          <section className="py-12 px-0 w-full bg-white text-black">
            <div className="main-content mx-auto px-5">
              <h2 className="text-3xl font-semibold mb-6 text-center">Local Spotlight</h2>
              <SpotlightSection
                allSpotlights={allSpotlights}
                categories={spotlightCategories}
                all={false}
              />
            </div>
          </section>

          {/* Bottom Banner Section */}
          <section className="container mx-auto px-5 flex  text-black">
            <div className="main-content mx-auto px-5 flex justify-center items-center  rounded-xl bg-gradient-to-r from-[#F97316] to-[#FACC15]">
              <BottomBanner />
            </div>
          </section>
    </div>
  );
}
