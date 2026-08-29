import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ShopContext } from '../context/shopContext';

const PlaceOrder = () => {
  const { backendUrl, token, setCartItems, getCartAmount, getOrderItems, delivery_fee, currency } = useContext(ShopContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '',
    street: '', city: '', state: '', zipcode: '', country: '', phone: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setError('');

    if (!token) {
      navigate('/login');
      return;
    }

    const items = getOrderItems();
    if (items.length === 0) {
      setError('Your cart is empty.');
      return;
    }

    const amount = getCartAmount() + delivery_fee;

    setLoading(true);
    try {
      const response = await axios.post(
        `${backendUrl}/api/order/place`,
        { items, amount, address: formData },
        { headers: { token } }
      );
      if (response.data.success) {
        // Backend already cleared cartData in MongoDB; clear frontend state too
        setCartItems({});
        navigate('/orders');
      } else {
        setError(response.data.message || 'Failed to place order. Please try again.');
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const subtotal = getCartAmount();
  const shipping = delivery_fee;
  const total = subtotal + shipping;

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>

      {/* Left: Delivery Information */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        <div className='text-xl sm:text-2xl my-3'>
          <p className='text-gray-700 font-medium'>
            DELIVERY <span className='text-gray-400 font-medium'>INFORMATION</span>
          </p>
        </div>

        <div className='flex gap-3'>
          <input required name='firstName' value={formData.firstName} onChange={onChangeHandler}
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full outline-none'
            type='text' placeholder='First name' />
          <input required name='lastName' value={formData.lastName} onChange={onChangeHandler}
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full outline-none'
            type='text' placeholder='Last name' />
        </div>

        <input required name='email' value={formData.email} onChange={onChangeHandler}
          className='border border-gray-300 rounded py-1.5 px-3.5 w-full outline-none'
          type='email' placeholder='Email address' />

        <input required name='street' value={formData.street} onChange={onChangeHandler}
          className='border border-gray-300 rounded py-1.5 px-3.5 w-full outline-none'
          type='text' placeholder='Street address' />

        <div className='flex gap-3'>
          <input required name='city' value={formData.city} onChange={onChangeHandler}
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full outline-none'
            type='text' placeholder='City' />
          <input required name='state' value={formData.state} onChange={onChangeHandler}
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full outline-none'
            type='text' placeholder='State' />
        </div>

        <div className='flex gap-3'>
          <input required name='zipcode' value={formData.zipcode} onChange={onChangeHandler}
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full outline-none'
            type='text' placeholder='Zipcode' />
          <input required name='country' value={formData.country} onChange={onChangeHandler}
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full outline-none'
            type='text' placeholder='Country' />
        </div>

        <input required name='phone' value={formData.phone} onChange={onChangeHandler}
          className='border border-gray-300 rounded py-1.5 px-3.5 w-full outline-none'
          type='tel' placeholder='Phone number' />
      </div>

      {/* Right: Order Summary + Payment */}
      <div className='mt-8'>

        {/* Totals */}
        <div className='min-w-80'>
          <div className='text-2xl mb-3'>
            <p className='text-gray-700 font-medium'>ORDER TOTAL</p>
          </div>
          <div className='flex flex-col gap-2 text-sm text-gray-600'>
            <div className='flex justify-between'>
              <p>Subtotal</p>
              <p>{currency}{subtotal.toFixed(2)}</p>
            </div>
            <hr />
            <div className='flex justify-between'>
              <p>Shipping Fee</p>
              <p>{currency}{shipping}</p>
            </div>
            <hr />
            <div className='flex justify-between font-semibold text-base text-gray-800 mt-1'>
              <p>Total</p>
              <p>{currency}{total.toFixed(2)}</p>
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div className='mt-12'>
          <p className='text-sm font-medium text-gray-700 mb-4'>PAYMENT METHOD</p>
          <div className='flex items-center gap-3 border border-gray-300 p-3 px-4 rounded bg-gray-50'>
            <div className='w-3.5 h-3.5 border-2 border-gray-500 rounded-full flex items-center justify-center flex-shrink-0'>
              <div className='w-2 h-2 bg-gray-700 rounded-full'></div>
            </div>
            <p className='text-sm font-medium text-gray-700'>Cash on Delivery</p>
          </div>
        </div>

        {/* Inline error */}
        {error && <p className='text-red-500 text-sm mt-4'>{error}</p>}

        {/* Submit */}
        <div className='w-full text-end mt-8'>
          <button
            type='submit'
            disabled={loading}
            className='bg-black text-white px-16 py-3 text-sm hover:bg-gray-800 transition-colors disabled:opacity-60 disabled:cursor-not-allowed'
          >
            {loading ? 'PLACING ORDER...' : 'PLACE ORDER'}
          </button>
        </div>

      </div>
    </form>
  );
};

export default PlaceOrder;
