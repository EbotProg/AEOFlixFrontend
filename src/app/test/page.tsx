"use client";
import CategorySelector from "@/components/organisms/CategorySelector.organism";
import Video from "@/components/organisms/Video.organism";
import React, { useState } from "react";

const Test = () => {
  const categs = [
    {
      name: "All",
      id: "1",
      selected: true,
    },
    {
      name: "New",
      id: "2",
      selected: false,
    },
    {
      name: "Old",
      id: "3",
      selected: false,
    },
    {
      name: "Popular",
      id: "4",
      selected: false,
    },
    {
      name: "Trending",
      id: "5",
      selected: false,
    },
    {
      name: "Top Rated",
      id: "6",
      selected: false,
    },
  ];
  const [categories, setCategories] = useState(categs);

  const handleCategorySelect = (id: string) => {
    setCategories((prev) => {
      return prev.map((item) => {
        if (item.id === id) {
          return { ...item, selected: true };
        } else {
          return { ...item, selected: false };
        }
      });
    });
  };
  return (
    <div className="p-2">
      <CategorySelector
        categories={categories}
        handleCategorySelect={handleCategorySelect}
      />

      <div className="p-2"></div>
    </div>
  );
};

export default Test;
