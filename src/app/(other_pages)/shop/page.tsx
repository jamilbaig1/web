import React from 'react';
import ShopSection from '../../components/ShopSection';
import { fetchShopItems } from "@/lib/fetchShopItem";

const Page = async () => {
  const shopItems = await fetchShopItems();
  return (
    <>
        <ShopSection shopItems={shopItems} />
    </>
  );
}

export default Page;
