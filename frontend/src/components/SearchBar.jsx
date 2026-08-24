import React, { useContext, useEffect, useState } from 'react';
import { assets } from '../assets/assets';
import { ShopContext } from '../context/shopContext';
import { useLocation } from 'react-router-dom';

const SearchBar = () => {
    const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
    const [Visible, setVisible] = useState(false);
    const location = useLocation();

    useEffect(() => {
        setVisible(location.pathname.includes('collection') && showSearch);
    }, [location, showSearch]);

    return showSearch && Visible ? (
        <div className="border-t border-b bg-gray-50 text-center">
            <div className="inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2">
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="flex-1 outline-none bg-inherit text-sm"
                    type="text"
                    placeholder={`Search ${
                        location.pathname.includes('collection') ? 'Collection' : ''
                    }`}
                    aria-label="Search"
                />
                {assets.search_icon ? (
                    <img className="w-4" src={assets.search_icon} alt="Search" />
                ) : (
                    <span className="text-red-500">Icon Missing</span>
                )}
            </div>
            <img
                onClick={() => setShowSearch(false)}
                className="inline w-4 cursor-pointer"
                src={assets.cross_icon || ""}
                alt="Close"
                aria-label="Close"
            />
        </div>
    ) : null;
};

export default SearchBar;
