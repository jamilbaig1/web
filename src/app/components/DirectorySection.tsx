'use client';
import { Directory } from "../../lib/fetchDirectory";
import { DirectoryCategory } from "../../lib/fetchDirectoryCategories";
import DirectoryListWithLoadMore from "./DirectorySectionLoadMore";

export default function DirectorySection({ 
  allDirectories, 
  categories, 
  all 
}: { 
  allDirectories: Directory[], 
  categories: DirectoryCategory[], 
  all: boolean 
}) {
  return (
    <DirectoryListWithLoadMore 
      allDirectories={allDirectories} 
      categories={categories} 
      all={all} 
    />
  );
}
