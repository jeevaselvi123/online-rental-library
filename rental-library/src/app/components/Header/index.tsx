'use client';
import Link from "next/link";
import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useRouter } from "next/navigation";

export default function
  Header() {
  const [search_term, set_search_term] = useState<string>('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null); 
  const router = useRouter();
  const handle_search = (e: React.ChangeEvent<HTMLInputElement>) => {
    set_search_term(e.target.value);
  }

  useEffect(() => {
    const isUserLoggedIn = localStorage.getItem('token') !== null;
    setIsLoggedIn(isUserLoggedIn);
  }, []);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);

  };

  const handleLogout
    = () => {
      localStorage.removeItem('token');
      setIsLoggedIn(false);
      setAnchorEl(null);
      router.push('/login');
    };

  return (
    <header className="bg-gray-100 p-4 flex justify-between items-center shadow-md">
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
        {isLoggedIn ? (
          <>
            <AccountCircleIcon
              sx={{ fontSize: '32px', cursor: 'pointer' }}
              color="primary"
              aria-controls={anchorEl ? 'simple-menu' : undefined}
              aria-haspopup={anchorEl ? true : undefined}
              onClick={(event: React.MouseEvent) => { handleOpenMenu(event as React.MouseEvent<HTMLElement>)}}
            />
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleCloseMenu}
              MenuListProps={{
                'aria-labelledby': 'simple-menu',
              }}
            >
              <MenuItem onClick={handleCloseMenu}>Profile</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </>
        ) : (
          <>
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
          </>
        )}
      </div>
    </header>
  );
}