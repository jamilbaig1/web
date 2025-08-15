"use client";
import { Spotlight } from "../../types/spotlight";
import { SpotlightCategory } from "../../types/spotlight";
import SpotlightListWithLoadMore from "./SpotlightListWithLoadMore";

export default function SpotlightSection({ allSpotlights, categories , all }: { allSpotlights: Spotlight[], categories: SpotlightCategory[] , all: boolean  }) {
  return <SpotlightListWithLoadMore allSpotlights={allSpotlights} categories={categories} all={all} />;
}
