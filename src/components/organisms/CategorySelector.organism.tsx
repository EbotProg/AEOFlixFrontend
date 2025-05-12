import React from "react";

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
  return (
    <div className="w-screen overflow-auto scrollbar-hide">
      <div className="flex flex-row bg-gray-100 rounded-4xl w-fit">
        {categories.map((item) => (
          <p
            onClick={() => handleCategorySelect(item.id)}
            key={item.id}
            className={`${item.selected ? "text-white bg-black rounded-4xl" : ""} px-8 py-1 text-black hover:cursor-pointer text-nowrap`}
          >
            {item.name}
          </p>
        ))}
      </div>
    </div>
  );
};

export default CategorySelector;
