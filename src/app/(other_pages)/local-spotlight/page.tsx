import React from 'react'
import SpotlightSection from '../../components/SpotlightSection'
import { fetchSpotlights } from "../../../lib/fetchSpotlights";
import { fetchSpotlightCategories } from "../../../lib/fetchSpotlightCategories";
import { PiShootingStarFill } from "react-icons/pi";
import { FaBuilding } from "react-icons/fa6";
import Link from 'next/link';


const LocalSpotlight = async () => {

  const allSpotlights = await fetchSpotlights();
  const spotlightCategories = await fetchSpotlightCategories();
  return (
    <>
        <div className="main-content mx-auto px-5 py-16 text-black max-w-7xl">
        {/* Header */}
            <div className="text-center mb-12">
                <div className="flex justify-center mb-4">
                    <PiShootingStarFill className="h-15 w-15 text-orange-500" />
                </div>
                <h2 className="text-4xl font-bold text-orange-500">
                        Local Business Spotlight
                </h2>
                <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
                    Celebrating the heart of our community: the amazing local businesses that make Winter Garden unique.
                </p>
            </div>
            <SpotlightSection  allSpotlights={allSpotlights}
                categories={spotlightCategories} all={true} />

            {/* Business Featured */}
            <div className="bg-gradient-to-r from-yellow-100 via-white to-orange-100 rounded-lg shadow p-2 py-8 text-center lg:p-8">
                <div className="flex justify-center mb-4">
                    <FaBuilding className="h-10 w-10 text-orange-500" />
                </div>
                <h3 className="text-xl font-bold mb-2">Want Your Business Featured?</h3>
                <p className="text-gray-600 mb-4 max-w-xl mx-auto">
                    We love showcasing local talent and establishments. Reach out to us for sponsorship opportunities or to be considered for a future spotlight. 
                </p>
                <Link href='/contact' className="bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-2 rounded">
                    Learn More & Get in Touch
                </Link>
            </div>
        </div>
    </>
  )
}

export default LocalSpotlight