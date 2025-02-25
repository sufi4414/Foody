import React, { useRef } from 'react';
import { Text } from "@/components/Themed";
import { Button, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { CategoriesTab } from '@/components/custom/categories-tab';
import { FeedCard } from '@/components/custom/feedcard';
import { SearchIcon } from '@/components/ui/icon';
import { Link } from 'expo-router';
import SearchBar from '@/components/custom/search-bar';


export const Home = () => {
  return (
    <div className="max-w-md mx-auto p-4">

{/**********************************************************************************************************************************/}

      {/******************** Header Foodie Icon ********************/}
      {/* <div className="flex justify-center items-center">
        <img src="/path-to-your-logo.png" alt="Foodie Logo" className="w-12 h-12" />
      </div> */}
      {/* Temporary Header */}
      <div className="flex justify-center items-center text-2xl font-bold">
        FODDY
      </div>

      {/************************ Search Bar ************************/}
      <div className="flex items-center gap-2 border-2 border-blue-300 p-2 rounded-full mt-3 shadow-sm focus-within:ring-2 focus-within:ring-blue-500">
        <SearchIcon className="w-5 h-5 text-gray-500" />
        <input
        type="text" 
        placeholder="Search menu, restaurant or etc" 
        className="w-full bg-transparent focus:outline-none"
        />
      </div>
      {/* <SearchBar /> */}


      {/***** Categories - Refer to @/components/custom/categories *****/}
      <CategoriesTab />

      {/******* Feedcard - Refer to @/components/custom/feedcard *******/}
      {/* <FeedCard /> */}


{/**********************************************************************************************************************************/}

    </div>
  );
}
