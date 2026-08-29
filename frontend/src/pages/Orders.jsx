import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { ShopContext } from '../context/shopContext';

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchOrders = async () => {
    if (!token) return;
    setLoading(true);
    setError('');
    try {
      const response = await axios.post(
        `${backendUrl}/api/order/userorders`,
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        // Newest orders first
        setOrders([...response.data.orders].reverse());
      } else {
        setError(response.data.message || 'Failed to fetch orders.');
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [token]); // re-fetch whenever token changes (login / logout)

  // ── Render states ──────────────────────────────────────────────────

  if (!token) {
    return (
      <div className='border-t pt-16 min-h-[60vh] flex flex-col items-center justify-center gap-4'>
        <p className='text-gray-500 text-lg'>Please log in to view your orders.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className='border-t pt-16 min-h-[60vh] flex items-center justify-center'>
        <p className='text-gray-400'>Loading orders...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className='border-t pt-16 min-h-[60vh]'>
        <p className='text-red-500'>{error}</p>
      </div>
    );
  }

  return (
    <div className='border-t pt-16'>

      <div className='text-2xl mb-6'>
        <p className='text-gray-700 font-medium'>MY ORDERS</p>
      </div>

      {orders.length === 0 ? (
        <div className='flex flex-col items-center justify-center min-h-[40vh] gap-3'>
          <p className='text-xl text-gray-400'>No orders yet.</p>
        </div>
      ) : (
        <div className='flex flex-col gap-0'>
          {orders.map((order, orderIdx) =>
            order.items.map((item, itemIdx) => (
              <div
                key={`${orderIdx}-${itemIdx}`}
                className='py-4 border-t text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'
              >
                {/* Product info */}
                <div className='flex items-start gap-5 text-sm'>
                  {item.image?.[0] ? (
                    <img
                      src={item.image[0]}
                      alt={item.name}
                      className='w-16 sm:w-20 object-cover flex-shrink-0'
                    />
                  ) : (
                    <div className='w-16 sm:w-20 h-16 sm:h-20 bg-gray-100 flex-shrink-0 rounded' />
                  )}
                  <div>
                    <p className='sm:text-base font-medium'>{item.name}</p>
                    <div className='flex flex-wrap items-center gap-3 mt-2 text-gray-600'>
                      <p className='font-medium'>{currency}{item.price}</p>
                      <p>Qty: {item.quantity}</p>
                      {item.size && item.size !== '' && (
                        <span className='border px-2 py-0.5 text-xs bg-gray-50'>{item.size}</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Order meta */}
                <div className='md:w-1/2 flex justify-between items-center gap-4 text-sm'>
                  <div className='flex flex-col gap-1 text-gray-500'>
                    <p><span className='text-gray-700 font-medium'>Date:</span> {new Date(order.date).toLocaleDateString()}</p>
                    <p><span className='text-gray-700 font-medium'>Method:</span> {order.paymentMethod}</p>
                    <p>
                      <span className='text-gray-700 font-medium'>Payment:</span>{' '}
                      <span className={order.payment ? 'text-green-600' : 'text-yellow-600'}>
                        {order.payment ? 'Paid' : 'Pending'}
                      </span>
                    </p>
                    <p><span className='text-gray-700 font-medium'>Amount:</span> {currency}{order.amount}</p>
                  </div>

                  <div className='flex flex-col items-end gap-3'>
                    {/* Status badge */}
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      order.status === 'Delivered'       ? 'bg-green-100 text-green-700' :
                      order.status === 'Shipped'         ? 'bg-blue-100 text-blue-700' :
                      order.status === 'Out for delivery'? 'bg-indigo-100 text-indigo-700' :
                      order.status === 'Packing'         ? 'bg-orange-100 text-orange-700' :
                                                           'bg-yellow-100 text-yellow-700'
                    }`}>
                      {order.status}
                    </span>
                    {/* Track button refreshes orders */}
                    <button
                      onClick={fetchOrders}
                      className='border border-gray-300 px-4 py-1.5 text-xs hover:bg-gray-50 rounded transition-colors'
                    >
                      Track Order
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Orders;
