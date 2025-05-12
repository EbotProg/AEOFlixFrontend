"use client";
import IconRepository from "@/lib/assets/icons/icon.Repository";
import React, { useEffect, useRef, useState } from "react";

type category = {
  name: string;
  id: string;
  selected: boolean;
};

interface CategorySelectorProps {
  categories: category[];
  handleCategorySelect: (id: string) => void;
}

const CategorySelector = ({
  categories,
  handleCategorySelect,
}: CategorySelectorProps) => {
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const categoryScrollElement = useRef<HTMLDivElement>(null);

  const updateScrollButtons = () => {
    if (categoryScrollElement.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        categoryScrollElement.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth);
    }
  };

  const handleScroll = () => {
    updateScrollButtons();
  };

  const handleScrollLeft = () => {
    if (categoryScrollElement.current) {
      categoryScrollElement.current.scrollBy({
        left: -100,
        behavior: "smooth",
      });
    }
  };
  const handleScrollRight = () => {
    if (categoryScrollElement.current) {
      categoryScrollElement.current.scrollBy({
        left: 100,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const container = categoryScrollElement.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      updateScrollButtons(); // Initial check
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <div className="relative max-w-fit">
      {canScrollLeft && (
        <button
          onClick={handleScrollLeft}
          className="p-2 bg-white rounded-full absolute top-0 -left-3"
        >
          <IconRepository.RightIcon />
        </button>
      )}

      <div
        ref={categoryScrollElement}
        className="w-full overflow-auto scrollbar-hide"
      >
        <div className="flex flex-row bg-gray-100 rounded-4xl w-fit">
          {categories.map((item) => (
            <p
              onClick={() => handleCategorySelect(item.id)}
              key={item.id}
              className={`${item.selected ? "text-white bg-black rounded-4xl" : "hover:rounded-4xl hover:bg-gray-200"} px-8 py-1 text-black hover:cursor-pointer text-nowrap`}
            >
              {item.name}
            </p>
          ))}
        </div>
      </div>
      {canScrollRight && (
        <button
          onClick={handleScrollRight}
          className="p-2 bg-white rounded-full absolute -right-2 top-0"
        >
          <IconRepository.LeftIcon />
        </button>
      )}
    </div>
  );
};

export default CategorySelector;
