// app/other_pages/layout.tsx
import React from "react";
import TopBannerSections from '.././components/TopBannerSections';
import MiddelBanner from '.././components/MiddelBanner';
import SideBar from '.././components/SideBar';

import { fetchTopBanner } from '@/lib/fetchTopBanner';
import { fetchMiddleBanner } from '@/lib/fetchMiddleBanner';
import { fetchSideBar } from '@/lib/fetchSidebar';

export default async function Layout({

  children,
}: {
  
  children: React.ReactNode;
}) {
  const topBanner = await fetchTopBanner();
  const middleBanner = await fetchMiddleBanner();
  const topBannerTitle = topBanner?.text || '';
  const topBannerImg = topBanner?.imageUrl || '';
  const topBannerlink = topBanner?.buttonLink || '';
  
  const middleBannerTitle = middleBanner?.text || '';
  const middleBannerImg = middleBanner?.imageUrl || '';
  const middleBannerlink = middleBanner?.buttonLink || '';
  
   const sidebar = await fetchSideBar();
  return( 
    <>
      {/*Top banner Section  */}
      <section className="container mx-auto px-5">
        <TopBannerSections bgImage={topBannerImg} text={topBannerTitle} viewLink={topBannerlink} />
      </section>
            <div className="main-content flex flex-col lg:flex-row gap-5">
              {/* Main Content */}
              <div className="flex-1 w-[100%] lg:w-[65%]">
                {children}
              </div>
      
              {/* Sidebar */}
              <div className="w-full max-h-230 lg:w-70 overflow-y-auto">
                <SideBar  sidebar = { sidebar }  />
              </div>
            </div>

      {/* Middle Banner Section */}
      <section className="container mx-auto px-5 mt-5">
        <MiddelBanner bgImage={middleBannerImg} text={middleBannerTitle}  viewLink={middleBannerlink}/>
      </section>
    </>
  );
}
