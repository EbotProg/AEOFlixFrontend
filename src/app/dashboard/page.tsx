"use client";
import CategorySelector from "@/components/organisms/CategorySelector.organism";
import Videos from "@/components/organisms/Videos.organism";
import React, { useState } from "react";

const page = () => {
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
    <div className="p-4 flex flex-col gap-4 w-full">
      <div className="w-full">
        <CategorySelector
          categories={categories}
          handleCategorySelect={handleCategorySelect}
        />
      </div>

      <Videos />
    </div>
  );
};

export default page;
