import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/shopContext';

const Login = () => {
  const [currentState, setCurrentState] = useState('Login');
  const { backendUrl, setToken, getUserCart } = useContext(ShopContext);
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (currentState === 'Sign Up') {
        const res = await axios.post(`${backendUrl}/api/user/register`, { name, email, password });
        if (res.data.success) {
          const { token } = res.data;
          localStorage.setItem('token', token);
          setToken(token);
          await getUserCart(token);
          navigate('/');
        } else {
          setError(res.data.message);
        }
      } else {
        const res = await axios.post(`${backendUrl}/api/user/login`, { email, password });
        if (res.data.success) {
          const { token } = res.data;
          localStorage.setItem('token', token);
          setToken(token);
          await getUserCart(token);
          navigate('/');
        } else {
          setError(res.data.message);
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-[80vh] flex items-center justify-center'>
      <form
        onSubmit={onSubmitHandler}
        className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'
      >
        {/* Header */}
        <div className='inline-flex items-center gap-2 mb-2 mt-10'>
          <p className='text-3xl font-semibold'>{currentState}</p>
          <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
        </div>

        {/* Name field (Sign Up only) */}
        {currentState === 'Sign Up' && (
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            className='w-full px-3 py-2 border border-gray-800 outline-none'
            type='text'
            placeholder='Name'
            required
          />
        )}

        {/* Email */}
        <input
          value={email}
          onChange={e => setEmail(e.target.value)}
          className='w-full px-3 py-2 border border-gray-800 outline-none'
          type='email'
          placeholder='Email Address'
          required
        />

        {/* Password */}
        <input
          value={password}
          onChange={e => setPassword(e.target.value)}
          className='w-full px-3 py-2 border border-gray-800 outline-none'
          type='password'
          placeholder='Password'
          required
        />

        {/* Inline error */}
        {error && (
          <p className='w-full text-red-500 text-sm'>{error}</p>
        )}

        {/* Links */}
        <div className='w-full flex justify-between text-sm mt-[-8px]'>
          <p className='cursor-pointer text-gray-500 hover:text-black'>Forgot your password?</p>
          {currentState === 'Login'
            ? <p onClick={() => { setCurrentState('Sign Up'); setError(''); }} className='cursor-pointer hover:text-blue-600'>Create account</p>
            : <p onClick={() => { setCurrentState('Login'); setError(''); }} className='cursor-pointer hover:text-blue-600'>Login here</p>
          }
        </div>

        {/* Submit */}
        <button
          type='submit'
          disabled={loading}
          className='bg-black text-white font-light px-8 py-2 mt-4 disabled:opacity-60 disabled:cursor-not-allowed'
        >
          {loading ? 'Please wait...' : currentState === 'Login' ? 'Sign In' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
};

export default Login;
