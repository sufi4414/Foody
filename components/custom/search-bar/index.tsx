import React, { useRef } from 'react';
import { Text } from "@/components/Themed";
import { Button, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Link } from 'expo-router';
import { useRouter } from 'next/router';

export const SearchBar = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push('/(tabs)'); // Change '/search' to your desired destination
  };

  return (
    
    <div 
      className="flex items-center gap-2 border-2 border-blue-300 p-2 rounded-full mt-3 shadow-sm focus-within:ring-2 focus-within:ring-blue-500 bg-white cursor-pointer"
      onClick={handleClick}
    >
      <SearchIcon className="w-5 h-5 text-gray-500" />
      <input
        type="text" 
        placeholder="Search menu, restaurant or etc" 
        className="w-full bg-white focus:outline-none"
        readOnly // Prevents typing since clicking redirects
      />
    </div>
  );
}

// Old Search bar without any link (type format)
    {/* <div className="flex items-center gap-2 border-2 border-blue-300 p-2 rounded-full mt-3 shadow-sm focus-within:ring-2 focus-within:ring-blue-500">
        <SearchIcon className="w-5 h-5 text-gray-500" />
        <input
        type="text" 
        placeholder="Search menu, restaurant or etc" 
        className="w-full bg-transparent focus:outline-none"
        />
      </div> */}