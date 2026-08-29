import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShopContext } from '../context/shopContext';
import CartTotal from '../components/CartTotal';

const Cart = () => {
  const { products, cartItems, updateQuantity, currency } = useContext(ShopContext);

  // Build a flat list of cart rows, matching cartItems keys to product documents
  const cartRows = [];
  for (const itemId in cartItems) {
    const product = products.find(p => p._id === itemId);
    if (!product) continue; // skip if product was deleted from DB
    for (const size in cartItems[itemId]) {
      const qty = cartItems[itemId][size];
      if (qty > 0) {
        cartRows.push({ product, size, qty, itemId });
      }
    }
  }

  if (cartRows.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center min-h-[60vh] gap-4 border-t pt-14'>
        <p className='text-xl text-gray-500'>Your cart is empty.</p>
        <Link to='/collection'>
          <button className='bg-black text-white px-6 py-2 text-sm'>SHOP NOW</button>
        </Link>
      </div>
    );
  }

  return (
    <div className='border-t pt-14'>

      <div className='text-2xl mb-3'>
        <p className='text-gray-700 font-medium'>YOUR CART</p>
      </div>

      {/* Cart Items */}
      <div>
        {cartRows.map(({ product, size, qty, itemId }, index) => (
          <div
            key={`${itemId}-${size}-${index}`}
            className='py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_1fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4'
          >
            {/* Product info */}
            <div className='flex items-start gap-4 sm:gap-6'>
              <img
                src={product.image?.[0] || ''}
                alt={product.name}
                className='w-16 sm:w-20 object-cover'
              />
              <div>
                <p className='text-xs sm:text-lg font-medium'>{product.name}</p>
                <div className='flex items-center gap-3 mt-2 flex-wrap'>
                  <p>{currency}{product.price}</p>
                  {size !== '' && (
                    <p className='px-2 sm:px-3 sm:py-1 border bg-slate-50 text-xs sm:text-sm'>{size}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Quantity controls */}
            <div className='flex items-center border border-gray-300 w-fit'>
              <button
                onClick={() => updateQuantity(itemId, size, qty - 1)}
                className='w-8 h-8 flex items-center justify-center hover:bg-gray-100 text-base select-none'
                aria-label='Decrease quantity'
              >
                −
              </button>
              <span className='w-8 h-8 flex items-center justify-center border-x text-sm'>{qty}</span>
              <button
                onClick={() => updateQuantity(itemId, size, qty + 1)}
                className='w-8 h-8 flex items-center justify-center hover:bg-gray-100 text-base select-none'
                aria-label='Increase quantity'
              >
                +
              </button>
            </div>

            {/* Remove */}
            <button
              onClick={() => updateQuantity(itemId, size, 0)}
              className='text-gray-400 hover:text-red-500 text-xl font-bold justify-self-end'
              aria-label='Remove item'
              title='Remove item'
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {/* Cart Total section */}
      <div className='flex justify-end my-16'>
        <div className='w-full sm:w-[450px]'>
          <CartTotal />
        </div>
      </div>

    </div>
  );
};

export default Cart;
