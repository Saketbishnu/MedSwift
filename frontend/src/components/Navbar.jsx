import React, { useState } from 'react';
import { assets } from '../assets/assets';
import { Link, NavLink } from 'react-router-dom';
import { ShopContext } from '../context/shopContext';
import { useContext } from 'react';

const Navbar = () => {
  const[visible,setVisible] = useState(false);
  const {setShowSearch} = useContext(ShopContext);


   

  return (
    <div className='flex items-center justify-between py-5 font-medium'>
      <Link to='/'> <img src={assets.logo} className='w-36' alt=""/></Link>
      
      {/* Navigation Links */}
      <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
        <NavLink to='/' className='flex flex-col items-center gap-1'>
          <p>HOME</p>
          <hr className='w-1/2 border-none h-[1.5px] bg-blue-500 mx-auto hidden'/>
        </NavLink>
        <NavLink to='/collection' className='flex flex-col items-center gap-1'>
          <p>COLLECTION</p>
          <hr className='w-1/2 border-none h-[1.5px] bg-blue-500 mx-auto hidden'/>
        </NavLink>
        <NavLink to='/about' className='flex flex-col items-center gap-1'>
          <p>ABOUT</p>
          <hr className='w-1/2 border-none h-[1.5px] bg-blue-500 mx-auto hidden'/>
        </NavLink>
        <NavLink to='/contact' className='flex flex-col items-center gap-1'>
          <p>CONTACT</p>
          <hr className='w-1/2 border-none h-[1.5px] bg-blue-500 mx-auto hidden'/>
        </NavLink>
      </ul>

      {/* Search Icon & Profile Icon */}
      <div className='flex items-center gap-6'>
        {/* Search Icon */}
        <img onClick={()=>setShowSearch(true)} src={assets.search_icon} className='w-5 cursor-pointer' alt="Search Icon"/>

        {/* Profile Icon with Dropdown */}
        <div className='group relative'>
          <img className='w-5 cursor-pointer' src={assets.profile_icon} alt="Profile Icon"/>
          <div className='group-hover:block hidden absolute right-0 pt-4'>
            <div className='flex flex-col gap-2 w-36 py-2 px-5 bg-slate-100 text-gray-500 rounded shadow-lg'>
              <p className='cursor-pointer hover:text-black'>My Profile</p>
              <p className='cursor-pointer hover:text-blue-500'>Orders</p>
              <p className='cursor-pointer hover:text-black'>Logout</p>
            </div>
          </div>
        </div>
        <Link to='/cart' className='relative'>
        <img src={assets.cart_icon} className='w-5 min-w-5' alt="Cart Icon"/>
        <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-blue-500 text-white aspect-square rounded-full text-[8px]'>2</p>
        </Link>


      </div>

    </div>
  );
};

export default Navbar;
