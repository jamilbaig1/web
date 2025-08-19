import React from 'react'
import DirectorySection from '../../components/DirectorySection'
import { fetchDirectory } from "../../../lib/fetchDirectory";
import { fetchDirectoryCategory } from "../../../lib/fetchDirectoryCategories";
import { FiLayers } from "react-icons/fi";




const DirectoryPage = async () => {
  const allDirectories = await fetchDirectory();
  const directoryCategories = await fetchDirectoryCategory();

  return (
    <>
      <div className="main-content mx-auto px-5 py-16 text-black max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          {/* Icon */}
          <div className="flex justify-center mb-4">
            <div className="flex justify-center mb-4">
                <FiLayers className="h-15 w-15 text-orange-500" />
            </div>
          </div>
          {/* Title */}
          <h2 className="text-4xl font-bold text-orange-500">
            The Local Loop Directory
          </h2>
        </div>

        <DirectorySection 
          allDirectories={allDirectories} 
          categories={directoryCategories} 
          all={true} 
        />
      </div>
    </>
  )
}

export default DirectoryPage
