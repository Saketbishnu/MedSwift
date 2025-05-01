import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/shopContext'

const BestSeller = () => {
    const { products } = useContext(ShopContext);
    const [bestseller , setBestSeller] = useState([]);
    
    useEffect(() => {
        const bestProduct = products.filter((item)=>(item.bestseller));
        setBestSeller(bestProduct.slice(0,5));

    },[])
  return (
    <div className ='my-10'>
        <div className='text-center text-3xl py-8'>
            <Title text1={'BEST'} text2={'SELLERS'}/>
            <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
            "Our Best Sellers Trusted by Thousands!" Explore our top-selling medicines, chosen by customers for their effectiveness and reliability. From essential healthcare solutions to must-have wellness products, these bestsellers are trusted by many for their quality and affordability. Get yours today at unbeatable prices  starting from ₹XX!
            </p>
      </div>
    </div>
  )
}

export default BestSeller
