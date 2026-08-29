import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/shopContext';

const Profile = () => {
    const { token, userProfile, getUserProfile, updateUserProfile } = useContext(ShopContext);
    const navigate = useNavigate();

    const [editMode, setEditMode] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ text: '', type: '' });

    // ── Auth guard ────────────────────────────────────────────────────
    useEffect(() => {
        if (!token) navigate('/login');
    }, [token, navigate]);

    // ── Populate form from context ────────────────────────────────────
    useEffect(() => {
        if (userProfile) {
            setName(userProfile.name);
            setEmail(userProfile.email);
        }
    }, [userProfile]);

    // ── Fetch on direct navigation (token present but profile not yet loaded) ──
    useEffect(() => {
        if (token && !userProfile) getUserProfile(token);
    }, [token]); // eslint-disable-line react-hooks/exhaustive-deps

    // ── Handlers (identical to previous implementation) ───────────────
    const handleEdit = () => {
        setMessage({ text: '', type: '' });
        setEditMode(true);
    };

    const handleCancel = () => {
        if (userProfile) {
            setName(userProfile.name);
            setEmail(userProfile.email);
        }
        setMessage({ text: '', type: '' });
        setEditMode(false);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setMessage({ text: '', type: '' });
        if (!name.trim())
            return setMessage({ text: 'Name cannot be empty.', type: 'error' });
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email))
            return setMessage({ text: 'Please enter a valid email address.', type: 'error' });

        setLoading(true);
        const result = await updateUserProfile(name.trim(), email.trim());
        setLoading(false);
        if (result.success) {
            setMessage({ text: result.message, type: 'success' });
            setEditMode(false);
        } else {
            setMessage({ text: result.message, type: 'error' });
        }
    };

    if (!token) return null;

    // ── Helpers ───────────────────────────────────────────────────────
    const initials = userProfile?.name
        ? userProfile.name.trim().split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase()
        : '?';

    // Reusable row: label on left, value on right (view mode)
    const InfoRow = ({ label, value, placeholder = 'Not added' }) => (
        <div className='flex flex-col sm:flex-row sm:items-start py-4 border-b border-gray-100 last:border-0 gap-1 sm:gap-0'>
            <span className='w-full sm:w-44 text-sm text-gray-500 flex-shrink-0'>{label}</span>
            <span className={`text-sm font-medium ${value ? 'text-gray-800' : 'text-gray-400 italic'}`}>
                {value || placeholder}
            </span>
        </div>
    );

    return (
        <div className='border-t min-h-[80vh] py-10'>

            {/* ── Account heading ──────────────────────────────────────── */}
            <div className='mb-6 pb-5 border-b border-gray-200'>
                <p className='text-xs text-gray-400 uppercase tracking-widest mb-0.5'>Account</p>
                <p className='text-xl font-semibold text-gray-800'>
                    {userProfile?.name || '...'}
                </p>
            </div>

            {/* ── Two-panel layout ─────────────────────────────────────── */}
            <div className='flex flex-col sm:flex-row gap-6'>

                {/* ── Left Sidebar ──────────────────────────────────────── */}
                <aside className='w-full sm:w-52 flex-shrink-0'>
                    <div className='bg-white rounded-sm overflow-hidden'>

                        {/* Avatar strip */}
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

                        {/* Navigation */}
                        <nav className='py-2'>

                            {/* Overview */}
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

                            {/* Account */}
                            <div>
                                <p className='px-4 pt-3 pb-1 text-[10px] font-bold text-gray-400 uppercase tracking-widest'>
                                    Account
                                </p>
                                {/* Active item */}
                                <button
                                    className='w-full text-left px-5 py-2 text-sm font-semibold text-gray-900 bg-[#EEF3F7] border-l-[3px] border-gray-700'
                                >
                                    Profile
                                </button>
                                {/* Placeholder — no route implemented */}
                                <button
                                    disabled
                                    title='Coming soon'
                                    className='w-full text-left px-5 py-2 text-sm text-gray-400 cursor-not-allowed'
                                >
                                    Addresses
                                </button>
                            </div>

                        </nav>
                    </div>
                </aside>

                {/* ── Main Content Panel ────────────────────────────────── */}
                <main className='flex-1 bg-white rounded-sm'>

                    {/* Panel header */}
                    <div className='px-6 sm:px-8 py-5 border-b border-gray-100'>
                        <p className='text-base font-semibold text-gray-800 tracking-wide uppercase'>
                            Profile Details
                        </p>
                    </div>

                    {/* Panel body */}
                    <div className='px-6 sm:px-8 py-6'>
                        {!userProfile ? (
                            <p className='text-sm text-gray-400'>Loading profile...</p>
                        ) : editMode ? (

                            /* ── Edit Mode ────────────────────────────── */
                            <form onSubmit={handleSave} className='flex flex-col gap-5 max-w-md'>

                                <div className='flex flex-col gap-1.5'>
                                    <label className='text-xs font-semibold text-gray-500 uppercase tracking-wider'>
                                        Full Name
                                    </label>
                                    <input
                                        type='text'
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                        required
                                        autoFocus
                                        className='border border-gray-300 py-2.5 px-3 text-sm text-gray-800 outline-none focus:border-gray-600 transition-colors bg-white'
                                    />
                                </div>

                                <div className='flex flex-col gap-1.5'>
                                    <label className='text-xs font-semibold text-gray-500 uppercase tracking-wider'>
                                        Email Address
                                    </label>
                                    <input
                                        type='email'
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        required
                                        className='border border-gray-300 py-2.5 px-3 text-sm text-gray-800 outline-none focus:border-gray-600 transition-colors bg-white'
                                    />
                                </div>

                                <div className='flex flex-col gap-1.5'>
                                    <label className='text-xs font-semibold text-gray-500 uppercase tracking-wider'>
                                        Mobile Number
                                    </label>
                                    <input
                                        type='text'
                                        value='Not added'
                                        disabled
                                        title='Mobile number not supported yet'
                                        className='border border-gray-200 py-2.5 px-3 text-sm text-gray-400 bg-[#F6F9FB] cursor-not-allowed italic'
                                    />
                                </div>

                                {/* Feedback */}
                                {message.text && (
                                    <p className={`text-sm ${message.type === 'success' ? 'text-green-600' : 'text-red-500'}`}>
                                        {message.text}
                                    </p>
                                )}

                                {/* Actions */}
                                <div className='flex gap-3 pt-2'>
                                    <button
                                        type='submit'
                                        disabled={loading}
                                        className='bg-gray-800 text-white text-sm px-8 py-2.5 hover:bg-black transition-colors disabled:opacity-60 disabled:cursor-not-allowed'
                                    >
                                        {loading ? 'SAVING...' : 'SAVE CHANGES'}
                                    </button>
                                    <button
                                        type='button'
                                        onClick={handleCancel}
                                        disabled={loading}
                                        className='border border-gray-300 text-gray-600 text-sm px-6 py-2.5 hover:bg-gray-50 transition-colors disabled:opacity-60'
                                    >
                                        CANCEL
                                    </button>
                                </div>

                            </form>

                        ) : (

                            /* ── View Mode ────────────────────────────── */
                            <div>
                                <InfoRow label='Full Name'       value={userProfile.name} />
                                <InfoRow label='Email Address'   value={userProfile.email} />
                                <InfoRow label='Mobile Number'   value={null} placeholder='Not added' />

                                {/* Feedback (e.g. success after save) */}
                                {message.text && (
                                    <p className={`mt-4 text-sm ${message.type === 'success' ? 'text-green-600' : 'text-red-500'}`}>
                                        {message.text}
                                    </p>
                                )}

                                {/* Edit Profile button below the info rows */}
                                <div className='mt-8'>
                                    <button
                                        onClick={handleEdit}
                                        className='text-sm border border-gray-800 text-gray-800 px-8 py-2.5 hover:bg-gray-800 hover:text-white transition-colors'
                                    >
                                        EDIT PROFILE
                                    </button>
                                </div>
                            </div>

                        )}
                    </div>

                </main>

            </div>
        </div>
    );
};

export default Profile;
