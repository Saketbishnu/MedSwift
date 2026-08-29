import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShopContext } from '../context/shopContext';

const CartTotal = () => {
  const { currency, delivery_fee, getCartAmount } = useContext(ShopContext);

  const subtotal = getCartAmount();
  const shipping = subtotal === 0 ? 0 : delivery_fee;
  const total = subtotal + shipping;

  return (
    <div className='w-full'>
      <div className='text-2xl mb-3'>
        <p className='text-gray-700 font-medium'>CART TOTAL</p>
      </div>

      <div className='flex flex-col gap-2 text-sm text-gray-600'>
        <div className='flex justify-between'>
          <p>Subtotal</p>
          <p>{currency}{subtotal.toFixed(2)}</p>
        </div>
        <hr />
        <div className='flex justify-between'>
          <p>Shipping Fee</p>
          <p>{subtotal === 0 ? 'Free' : `${currency}${delivery_fee}`}</p>
        </div>
        <hr />
        <div className='flex justify-between font-semibold text-base text-gray-800 mt-1'>
          <p>Total</p>
          <p>{currency}{total.toFixed(2)}</p>
        </div>
      </div>

      <div className='w-full text-end mt-8'>
        <Link to='/place-order'>
          <button className='bg-black text-white text-sm px-8 py-3 hover:bg-gray-800 transition-colors'>
            PROCEED TO CHECKOUT
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CartTotal;
