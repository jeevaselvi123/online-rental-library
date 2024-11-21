'use client'
import Link from "next/link";
import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";

export default function Header() {
    const [search_term, set_search_term] = useState<string>('');
    const handle_search = (e: React.ChangeEvent<HTMLInputElement>) => {
        set_search_term(e.target.value);
    }
    
    return (
      <header className="bg-gray-100 p-4 flex justify-between items-center">
        <div className="flex flex-row w-1/2">
          <Link href='/'>
            <h2 className="font-bold text-pretty text-2xl px-4 ml-4">
              𝐵𝑜𝑜𝓀𝒾𝓈𝒽𝐵𝓁𝒾𝓈𝓈
            </h2>
          </Link>
          <div className="relative flex w-1/2">
            <input
              type="text"
              placeholder="What are you looking for?"
              value={search_term}
              onChange={handle_search}
              className="border border-gray-300 hover:border-blue-700 rounded-xl shadow-md p-2 pl-4 w-full"
            />
            <SearchIcon className="absolute right-3 top-2.5 text-gray-400" />
          </div>
        </div>
        <div className="flex items-center ">
          <Link href="/login">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-4 rounded">
              Login
            </button>
          </Link>
          <Link href="/sign-up">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-4 rounded">
              Sign Up
            </button>
          </Link>
        </div>
      </header>
    );
}
