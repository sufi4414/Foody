import React, { useRef } from 'react';
import { Text } from "@/components/Themed";
import { Button, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
// import { Search, MoreHorizontal, Heart, MessageSquare, Bookmark } from "lucide-react";
import { Link } from 'expo-router';


// *********************************** EDIT CATEGORIES & IMAGES HERE (refer to categories-page) *********************************** //

const categories = [
  { name: "Cafe", image: "https://images.squarespace-cdn.com/content/v1/56120223e4b0e1ea7533e421/529ded8c-6383-4a7a-88dd-7beaa6cb12b1/DSC02063.jpg" },
  { name: "Seafood", image: "https://www.cameronsseafood.com/wp-content/uploads/2019/01/seafoodhealthy.jpg" },
  { name: "Pasta", image: "https://hips.hearstapps.com/hmg-prod/images/marry-me-pasta-index-65b7c910a7bbf.jpg?crop=0.6663926565282915xw:1xh;center,top&resize=1200:*" },
  { name: "Hotpot", image: "https://thewoksoflife.com/wp-content/uploads/2020/11/hot-pot-at-home-10.jpg" },
  { name: "Zi Char", image: "https://d3uwoey2rd901c.cloudfront.net/wp-content/uploads/2019/08/ricemedia_fourheavenlykings_photo-10-1024x683.jpg" },
];

// *********************************** END OF EDITING CATEGORIES & IMAGES *********************************** //

export const CategoriesTab = () => {
  return (
    
    // Adjust the padding of the sides px-4
    <div className="mt-4 px-4">  
      <div className="flex justify-between items-center mb-2">
        {/***************** Top Categories (text) *****************/}
        <h2 className="font-semibold">Top Categories</h2>
        {/***************** See all (button) *****************/}
        <button className="text-blue-500 text-sm" >
          <Link href="/categories">See all</Link>
        </button>
      </div>

      {/***************** Rounded shapes of the images *****************/}
      <div className="flex gap-4 overflow-x-auto whitespace-nowrap scroll-smooth scrollbar-hide">
        {categories.map((category, index) => (
          // Without Scrollable Bar - flex flex-col items-center
          <div key={index} className="flex flex-col items-center min-w-[80px]">
            {/************* Adjusting size of each individual category **********/}
            <img src={category.image} alt={category.name} className="w-20 h-20 rounded-xl bg-gray-200 overflow-hidden" />
            <span className="text-sm mt-1">{category.name}</span>
          </div>
        ))}
      </div>

    </div>
  );
};
