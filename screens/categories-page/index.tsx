import React, { useRef, useState } from 'react';
import { Text } from "@/components/Themed";
import { Button, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { FeedCard } from '../../components/custom/feedcard';
import { Link } from 'expo-router';
import { Grid, GridItem} from '@/components/ui/grid';

export const Categories = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);


// *********************************** EDIT CATEGORIES & IMAGES HERE *********************************** //

  const categories = [
    { name: "Cafe", image: "https://images.squarespace-cdn.com/content/v1/56120223e4b0e1ea7533e421/529ded8c-6383-4a7a-88dd-7beaa6cb12b1/DSC02063.jpg" },
    { name: "Seafood", image: "https://www.cameronsseafood.com/wp-content/uploads/2019/01/seafoodhealthy.jpg" },
    { name: "Pasta", image: "https://hips.hearstapps.com/hmg-prod/images/marry-me-pasta-index-65b7c910a7bbf.jpg?crop=0.6663926565282915xw:1xh;center,top&resize=1200:*" },
    { name: "Hotpot", image: "https://thewoksoflife.com/wp-content/uploads/2020/11/hot-pot-at-home-10.jpg" },
    { name: "Zi Char", image: "https://d3uwoey2rd901c.cloudfront.net/wp-content/uploads/2019/08/ricemedia_fourheavenlykings_photo-10-1024x683.jpg" },
    { name: "Bar", image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.onboitquoicesoir.fr%2Fbar-cocktails-soirees%2F&psig=AOvVaw2p3pvSywKTFbW3Aj62ZNGC&ust=1739525039649000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCKCcvfSpwIsDFQAAAAAdAAAAABAJ" },
    { name: "Fine Dining", image: "https://www.saintpierre.com.sg/wp-content/uploads/2023/11/Brittany-Purple-Artichoke-1-scaled.jpg" },
    { name: "Indian", image: "https://photos.smugmug.com/Asia/India/i-Pf4hCQr/0/d3d38770/X2/indian-food-dosa-X2.jpg" },
    { name: "Korean Desserts", image: "https://cdn.ubitto.com/content/uploads/2022/06/image-5-7.png" },
    { name: "Mookata", image: "https://eatbook.sg/wp-content/uploads/2017/08/Affordable-Mookata-888-Mookata.jpg" },
    { name: "Steak", image: "https://thebigmansworld.com/wp-content/uploads/2023/07/sirloin-steak-recipe.jpg" },
    { name: "Healthier Choice", image: "https://ch-api.healthhub.sg/api/public/content/2534118f690b4d4d8191831d743cb8c7?v=886c3102" },
    { name: "Kid Friendly", image: "https://www.meghantelpner.com/wp-content/uploads/2024/01/Silly-Face-Hummus-Toasts-1.jpg" },
    { name: "Mexican", image: "https://i0.wp.com/blog.vibeadventures.com/wp-content/uploads/2022/08/pexels-sergio-arreola-208344354-24182335-1.jpg?resize=1024%2C715&ssl=1" },
    { name: "Korean BBQ", image: "https://thecalmchronicle.com/wp-content/uploads/2020/12/Go.jpg" },
    { name: "Waffles", image: "https://www.pumpkinnspice.com/wp-content/uploads/2021/07/end-of-june-401.jpg" },
    { name: "Ice Cream & Yoghurt", image: "https://sugarfreelondoner.com/wp-content/uploads/2023/08/sugar-free-frozen-yogurt-1200.jpg" },
    { name: "Dim Sum", image: "https://getgo.sg/wp-content/uploads/2024/10/dim-sum-singapore.jpg" },
    { name: "Halal", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Halal_logo.svg/1200px-Halal_logo.svg.png" },
    { name: "Burger", image: "https://cdn.shopify.com/s/files/1/0274/9503/9079/files/burger_resized_a725fa6e-c278-4520-868b-8b61a33540bd.jpg?v=1723657774" },
    { name: "Date Night", image: "https://hips.hearstapps.com/hmg-prod/images/tea-light-candles-on-table-for-romantic-dinner-on-royalty-free-image-1640719462.jpg?crop=0.535xw:1.00xh;0.0656xw,0&resize=980:*" },
    { name: "Craft Beer", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcXZVJa0U2mLoFB4ZSn8_IQYiwx3iV3Mtvmg&s" },
    { name: "Supper", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTx3Ih_70WvRQJvprXLtdz3E5EdkGJ5xg1Gww&s" },
    { name: "Breakfast & Brunch", image: "https://blog.sothebysrealty.co.uk/hs-fs/hubfs/The%20Best%20Brunch%20in%20London-jpg.jpeg?width=1800&height=1200&name=The%20Best%20Brunch%20in%20London-jpg.jpeg" },
  ];

// *********************************** END OF EDITING CATEGORIES & IMAGES *********************************** //

  const toggleCategory = (name) => {
    setSelectedCategories((prev) =>
      prev.includes(name) ? prev.filter((cat) => cat !== name) : [...prev, name]
    );
  };

  return (
    <div className="flex flex-col items-center p-6 min-h-screen bg-white">

{/**********************************************************************************************************************************/}

      {/****************** Header with Back Button & Skip Button ******************/}
      <div className="flex justify-between w-full">
        <Link href="/tabs/(tabs)" className="text-gray-500">&larr;</Link>
        {/* <button className="text-gray-500">Skip</button> */}
      </div>

      {/************************* Title ****************************/}
      <h1 className="text-2xl font-bold mb-6">All Categories</h1>

      {/***************************** Scrollable Categories Section *****************************/}
      {/* NOTE: Need to fix grid + scroll (might be override by other code; need check) */}
      <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-md"> {/* 3 columns */}
        {categories.map((category, index) => (
          <GridItem 
          _extra={{
            className: "col-span-1", // Each item takes 1 column out of 3
          }}
          key={index}>
            <div
            className="flex flex-col items-center cursor-pointer"
            onClick={() => toggleCategory(category.name)}
            >
              <div
              className={`w-24 h-24 rounded-full overflow-hidden border-4 transition-all duration-300 ${
                selectedCategories.includes(category.name)
                ? "border-blue-500 scale-110"
                : "border-gray-300"
              }`}>
                <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover" />

              </div>
              <span className="text-sm mt-2 text-center font-medium">
              {category.name}
            </span>
            </div>
          </GridItem>       
        ))}

      </Grid>
      {/* <div className="grid grid gap-6 max-w-md">
        {categories.map((category, index) => (
          <div
          key={index}
          className="flex flex-col items-center cursor-pointer"
          onClick={() => toggleCategory(category.name)}
          >
            <div
            className={`w-24 h-24 rounded-full overflow-hidden border-4 transition-all duration-300 ${
              selectedCategories.includes(category.name)
              ? "border-blue-500 scale-110"
              : "border-gray-300"
            }`}
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-sm mt-2 text-center font-medium">
              {category.name}
            </span>
          </div>
        ))}
      </div> */}

{/**********************************************************************************************************************************/}

    </div>    
  );
};
