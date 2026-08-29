import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/shopContext';

const emptyAddress = {
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: '',
};

const Addresses = () => {
    const {
        token,
        userProfile,
        getUserProfile,
        savedAddresses,
        getSavedAddresses,
        addSavedAddress,
        updateSavedAddress,
        deleteSavedAddress,
    } = useContext(ShopContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState(emptyAddress);
    const [editingId, setEditingId] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ text: '', type: '' });

    useEffect(() => {
        if (!token) navigate('/login');
    }, [token, navigate]);

    useEffect(() => {
        if (token && !userProfile) getUserProfile(token);
    }, [token]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (token) getSavedAddresses(token);
    }, [token]); // eslint-disable-line react-hooks/exhaustive-deps

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const resetForm = () => {
        setFormData(emptyAddress);
        setEditingId(null);
        setShowForm(false);
        setMessage({ text: '', type: '' });
    };

    const handleAdd = () => {
        setFormData(emptyAddress);
        setEditingId(null);
        setShowForm(true);
        setMessage({ text: '', type: '' });
    };

    const handleEdit = (address) => {
        setFormData({
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
        setEditingId(address._id);
        setShowForm(true);
        setMessage({ text: '', type: '' });
    };

    const handleDelete = async (addressId) => {
        if (!window.confirm('Delete this address?')) return;
        setLoading(true);
        const result = await deleteSavedAddress(addressId);
        setLoading(false);
        setMessage({
            text: result.message,
            type: result.success ? 'success' : 'error',
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage({ text: '', type: '' });

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            return setMessage({ text: 'Please enter a valid email address.', type: 'error' });
        }
        const phoneRegex = /^\+?[0-9][0-9\s\-()]{6,18}[0-9]$/;
        if (!phoneRegex.test(formData.phone.trim())) {
            return setMessage({ text: 'Please enter a valid phone number.', type: 'error' });
        }

        setLoading(true);
        const result = editingId
            ? await updateSavedAddress(editingId, formData)
            : await addSavedAddress(formData);
        setLoading(false);

        if (result.success) {
            setMessage({ text: result.message, type: 'success' });
            resetForm();
        } else {
            setMessage({ text: result.message, type: 'error' });
        }
    };

    if (!token) return null;

    const initials = userProfile?.name
        ? userProfile.name.trim().split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase()
        : '?';

    const inputClass = 'border border-gray-300 py-2.5 px-3 text-sm text-gray-800 outline-none focus:border-gray-600 transition-colors bg-white w-full';

    return (
        <div className='border-t min-h-[80vh] py-10'>

            <div className='mb-6 pb-5 border-b border-gray-200'>
                <p className='text-xs text-gray-400 uppercase tracking-widest mb-0.5'>Account</p>
                <p className='text-xl font-semibold text-gray-800'>
                    {userProfile?.name || '...'}
                </p>
            </div>

            <div className='flex flex-col sm:flex-row gap-6'>

                <aside className='w-full sm:w-52 flex-shrink-0'>
                    <div className='bg-white rounded-sm overflow-hidden'>
                        <div className='flex items-center gap-3 px-4 py-4 border-b border-gray-100'>
                            <div className='w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-white text-sm font-semibold flex-shrink-0 select-none'>
                                {initials}
                            </div>
                            <div className='overflow-hidden'>
                                <p className='text-xs text-gray-400'>Hello,</p>
                                <p className='text-sm font-semibold text-gray-800 truncate leading-tight'>
                                    {userProfile?.name || '...'}
                                </p>
                            </div>
                        </div>

                        <nav className='py-2'>
                            <div className='mb-1'>
                                <p className='px-4 pt-3 pb-1 text-[10px] font-bold text-gray-400 uppercase tracking-widest'>
                                    Overview
                                </p>
                                <button
                                    onClick={() => navigate('/orders')}
                                    className='w-full text-left px-5 py-2 text-sm text-gray-600 hover:bg-[#EEF3F7] hover:text-gray-900 transition-colors'
                                >
                                    Orders &amp; Returns
                                </button>
                            </div>

                            <div>
                                <p className='px-4 pt-3 pb-1 text-[10px] font-bold text-gray-400 uppercase tracking-widest'>
                                    Account
                                </p>
                                <button
                                    onClick={() => navigate('/profile')}
                                    className='w-full text-left px-5 py-2 text-sm text-gray-600 hover:bg-[#EEF3F7] hover:text-gray-900 transition-colors'
                                >
                                    Profile
                                </button>
                                <button
                                    className='w-full text-left px-5 py-2 text-sm font-semibold text-gray-900 bg-[#EEF3F7] border-l-[3px] border-gray-700'
                                >
                                    Addresses
                                </button>
                            </div>
                        </nav>
                    </div>
                </aside>

                <main className='flex-1 bg-white rounded-sm'>
                    <div className='px-6 sm:px-8 py-5 border-b border-gray-100 flex items-center justify-between gap-4'>
                        <p className='text-base font-semibold text-gray-800 tracking-wide uppercase'>
                            Saved Addresses
                        </p>
                        {!showForm && (
                            <button
                                onClick={handleAdd}
                                className='text-sm border border-gray-800 text-gray-800 px-5 py-2 hover:bg-gray-800 hover:text-white transition-colors'
                            >
                                ADD ADDRESS
                            </button>
                        )}
                    </div>

                    <div className='px-6 sm:px-8 py-6'>
                        {message.text && (
                            <p className={`mb-4 text-sm ${message.type === 'success' ? 'text-green-600' : 'text-red-500'}`}>
                                {message.text}
                            </p>
                        )}

                        {showForm ? (
                            <form onSubmit={handleSubmit} className='flex flex-col gap-4 max-w-lg'>
                                <p className='text-sm font-medium text-gray-700'>
                                    {editingId ? 'Edit Address' : 'New Address'}
                                </p>

                                <div className='flex gap-3'>
                                    <input required name='firstName' value={formData.firstName} onChange={onChangeHandler}
                                        className={inputClass} type='text' placeholder='First name' />
                                    <input required name='lastName' value={formData.lastName} onChange={onChangeHandler}
                                        className={inputClass} type='text' placeholder='Last name' />
                                </div>

                                <input required name='email' value={formData.email} onChange={onChangeHandler}
                                    className={inputClass} type='email' placeholder='Email address' />

                                <input required name='street' value={formData.street} onChange={onChangeHandler}
                                    className={inputClass} type='text' placeholder='Street address' />

                                <div className='flex gap-3'>
                                    <input required name='city' value={formData.city} onChange={onChangeHandler}
                                        className={inputClass} type='text' placeholder='City' />
                                    <input required name='state' value={formData.state} onChange={onChangeHandler}
                                        className={inputClass} type='text' placeholder='State' />
                                </div>

                                <div className='flex gap-3'>
                                    <input required name='zipcode' value={formData.zipcode} onChange={onChangeHandler}
                                        className={inputClass} type='text' placeholder='Zipcode' />
                                    <input required name='country' value={formData.country} onChange={onChangeHandler}
                                        className={inputClass} type='text' placeholder='Country' />
                                </div>

                                <input required name='phone' value={formData.phone} onChange={onChangeHandler}
                                    className={inputClass} type='tel' placeholder='Phone number' />

                                <div className='flex gap-3 pt-2'>
                                    <button
                                        type='submit'
                                        disabled={loading}
                                        className='bg-gray-800 text-white text-sm px-8 py-2.5 hover:bg-black transition-colors disabled:opacity-60 disabled:cursor-not-allowed'
                                    >
                                        {loading ? 'SAVING...' : editingId ? 'UPDATE ADDRESS' : 'SAVE ADDRESS'}
                                    </button>
                                    <button
                                        type='button'
                                        onClick={resetForm}
                                        disabled={loading}
                                        className='border border-gray-300 text-gray-600 text-sm px-6 py-2.5 hover:bg-gray-50 transition-colors disabled:opacity-60'
                                    >
                                        CANCEL
                                    </button>
                                </div>
                            </form>
                        ) : savedAddresses.length === 0 ? (
                            <p className='text-sm text-gray-400'>No saved addresses yet.</p>
                        ) : (
                            <div className='flex flex-col gap-4'>
                                {savedAddresses.map(address => (
                                    <div
                                        key={address._id}
                                        className='border border-gray-200 p-4 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4'
                                    >
                                        <div className='text-sm text-gray-700 space-y-1'>
                                            <p className='font-semibold text-gray-800'>
                                                {address.firstName} {address.lastName}
                                            </p>
                                            <p>{address.street}</p>
                                            <p>{address.city}, {address.state} {address.zipcode}</p>
                                            <p>{address.country}</p>
                                            <p className='text-gray-500'>{address.email}</p>
                                            <p className='text-gray-500'>{address.phone}</p>
                                        </div>
                                        <div className='flex gap-3 flex-shrink-0'>
                                            <button
                                                onClick={() => handleEdit(address)}
                                                className='text-sm border border-gray-300 text-gray-600 px-4 py-1.5 hover:bg-gray-50 transition-colors'
                                            >
                                                EDIT
                                            </button>
                                            <button
                                                onClick={() => handleDelete(address._id)}
                                                disabled={loading}
                                                className='text-sm border border-red-300 text-red-600 px-4 py-1.5 hover:bg-red-50 transition-colors disabled:opacity-60'
                                            >
                                                DELETE
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Addresses;
