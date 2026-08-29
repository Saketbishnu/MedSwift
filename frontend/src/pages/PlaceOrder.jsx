import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ShopContext } from '../context/shopContext';

const emptyAddress = {
  firstName: '', lastName: '', email: '',
  street: '', city: '', state: '', zipcode: '', country: '', phone: '',
};

const addressToFormData = (address) => ({
  firstName: address.firstName,
  lastName: address.lastName,
  email: address.email,
  street: address.street,
  city: address.city,
  state: address.state,
  zipcode: address.zipcode,
  country: address.country,
  phone: address.phone,
});

const PlaceOrder = () => {
  const {
    backendUrl,
    token,
    setCartItems,
    getCartAmount,
    getOrderItems,
    delivery_fee,
    currency,
    savedAddresses,
    getSavedAddresses,
  } = useContext(ShopContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState(emptyAddress);
  const [selectedAddressId, setSelectedAddressId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (token) getSavedAddresses(token);
  }, [token]); // eslint-disable-line react-hooks/exhaustive-deps

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setSelectedAddressId('manual');
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectAddress = (addressId) => {
    if (addressId === 'manual') {
      setSelectedAddressId('manual');
      setFormData(emptyAddress);
      return;
    }
    const address = savedAddresses.find(a => a._id === addressId);
    if (!address) return;
    setSelectedAddressId(addressId);
    setFormData(addressToFormData(address));
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
    const address = addressToFormData(formData);

    setLoading(true);
    try {
      const response = await axios.post(
        `${backendUrl}/api/order/place`,
        { items, amount, address },
        { headers: { token } }
      );
      if (response.data.success) {
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
  const usingSavedAddress = selectedAddressId && selectedAddressId !== 'manual';

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>

      {/* Left: Delivery Information */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        <div className='text-xl sm:text-2xl my-3'>
          <p className='text-gray-700 font-medium'>
            DELIVERY <span className='text-gray-400 font-medium'>INFORMATION</span>
          </p>
        </div>

        {savedAddresses.length > 0 && (
          <div className='flex flex-col gap-2'>
            <p className='text-sm font-medium text-gray-700'>SAVED ADDRESSES</p>
            {savedAddresses.map(address => (
              <label
                key={address._id}
                className={`flex items-start gap-3 border rounded p-3 cursor-pointer transition-colors ${
                  selectedAddressId === address._id
                    ? 'border-gray-700 bg-gray-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <input
                  type='radio'
                  name='savedAddress'
                  checked={selectedAddressId === address._id}
                  onChange={() => handleSelectAddress(address._id)}
                  className='mt-1 flex-shrink-0'
                />
                <span className='text-sm text-gray-700'>
                  <span className='font-medium text-gray-800'>
                    {address.firstName} {address.lastName}
                  </span>
                  <br />
                  {address.street}, {address.city}, {address.state} {address.zipcode}
                  <br />
                  {address.country} · {address.phone}
                </span>
              </label>
            ))}
            <label
              className={`flex items-center gap-3 border rounded p-3 cursor-pointer transition-colors ${
                selectedAddressId === 'manual'
                  ? 'border-gray-700 bg-gray-50'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <input
                type='radio'
                name='savedAddress'
                checked={selectedAddressId === 'manual'}
                onChange={() => handleSelectAddress('manual')}
              />
              <span className='text-sm text-gray-700'>Enter a different address</span>
            </label>
          </div>
        )}

        {(!savedAddresses.length || selectedAddressId === 'manual' || !selectedAddressId) && (
          <>
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
          </>
        )}

        {usingSavedAddress && (
          <div className='border border-gray-200 rounded p-3 text-sm text-gray-700 bg-gray-50'>
            <p className='font-medium text-gray-800 mb-1'>Delivering to</p>
            <p>{formData.firstName} {formData.lastName}</p>
            <p>{formData.street}, {formData.city}, {formData.state} {formData.zipcode}</p>
            <p>{formData.country}</p>
            <p className='text-gray-500'>{formData.email} · {formData.phone}</p>
          </div>
        )}
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
            disabled={loading || (savedAddresses.length > 0 && !selectedAddressId)}
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
