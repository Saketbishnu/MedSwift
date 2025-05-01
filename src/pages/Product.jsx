import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/shopContext';

const Product = () => {
  const { productId } = useParams();
  const { products, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [mainImage, setMainImage] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  useEffect(() => {
    if (products?.length) {
      const foundProduct = products.find(item => item._id === productId);
      if (foundProduct) {
        setProductData(foundProduct);
        setMainImage(foundProduct.image[0]);
        setSelectedSize(foundProduct.sizes?.[0] || '');
      }
    }
  }, [productId, products]);

  const handleAddToCart = async () => {
    if (productData.sizes?.length && !selectedSize) {
      alert('Please select a size');
      return;
    }

    setIsAddingToCart(true);
    
    addToCart({
      id: productData._id,
      name: productData.name,
      price: productData.price,
      image: productData.image[0],
      size: selectedSize,
      quantity: quantity
    });

    await new Promise(resolve => setTimeout(resolve, 300));
    setIsAddingToCart(false);
  };

  if (!productData) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  return (
    <div className='max-w-6xl mx-auto px-4 py-8'>
      <div className='flex flex-col md:flex-row gap-8'>
        {/* Product Images */}
        <div className='md:w-1/2'>
          <div className='sticky top-4'>
            <div className='mb-4 bg-white rounded-lg overflow-hidden'>
              <img
                src={mainImage}
                alt={productData.name}
                className='w-full h-96 object-contain'
              />
            </div>
            <div className='flex gap-2 overflow-x-auto py-2'>
              {productData.image.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setMainImage(img)}
                  className={`w-16 h-16 border-2 rounded-md flex-shrink-0 ${
                    mainImage === img ? 'border-blue-500' : 'border-gray-200'
                  }`}
                >
                  <img src={img} alt="" className='w-full h-full object-cover' />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div className='md:w-1/2'>
          <h1 className='text-3xl font-bold'>{productData.name}</h1>
          <p className='text-2xl mt-2'>₹{productData.price}</p>
          <h3 className='font-medium'>Description</h3>
          <p className='mt-2 text-gray-600'>{productData.description}</p>
         

          {/* Size Selection */}
          {productData.sizes?.length > 0 && (
            <div className='mt-6'>
              <h3 className='text-sm font-medium text-gray-700'>SELECT SIZE</h3>
              <div className='flex flex-wrap gap-2 mt-2'>
                {productData.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border rounded-md text-sm font-medium ${
                      selectedSize === size
                        ? 'bg-blue-100 border-blue-500 text-blue-700'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className='mt-6'>
            <h3 className='text-sm font-medium text-gray-700'>QUANTITY</h3>
            <div className='flex items-center gap-4 mt-2'>
              <button
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                className='w-10 h-10 flex items-center justify-center border rounded-md hover:bg-gray-50'
              >
                −
              </button>
              <span className='w-10 text-center'>{quantity}</span>
              <button
                onClick={() => setQuantity(q => q + 1)}
                className='w-10 h-10 flex items-center justify-center border rounded-md hover:bg-gray-50'
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={isAddingToCart}
            className={`mt-8 w-full py-3 px-6 rounded-md font-medium transition-colors ${
              isAddingToCart
                ? 'bg-blue-400 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white'
            }`}
          >
            {isAddingToCart ? 'ADDING...' : 'ADD TO CART'}
          </button>

          {/* Return Policy Details */}
          <div className='mt-6 p-4 bg-gray-50 rounded-lg'>
            <h3 className='font-medium text-gray-800'>Our Promise to You:</h3>
            <ul className='mt-2 space-y-2 text-sm text-gray-600'>
              <li className='flex items-start'>
                <svg className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>100% Genuine Medicines sourced only from licensed pharmacies</span>
              </li>
              <li className='flex items-start'>
                <svg className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Easy 7-day returns for unopened products</span>
              </li>
              <li className='flex items-start'>
                <svg className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Cash on Delivery available for all orders</span>
              </li>
              <li className='flex items-start'>
                <svg className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Free delivery on orders above ₹500</span>
              </li>
            </ul>
          </div>

          {/* Description */}
          {productData.description && (
            <div className='mt-8 pt-6 border-t'>
              
            </div>
          )}
        </div>
      </div>
      {/* ---------------- Related Products---------------- */}
    </div>
  );
};

export default Product;