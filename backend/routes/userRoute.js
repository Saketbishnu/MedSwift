import express from 'express';
import {
    loginUser,
    registerUser,
    adminLogin,
    getProfile,
    updateProfile,
    getAddresses,
    addAddress,
    updateAddress,
    deleteAddress
} from '../controllers/userController.js';
import authUser from '../middleware/auth.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.post('/admin', adminLogin)

// Profile — authenticated routes
userRouter.post('/profile', authUser, getProfile)
userRouter.post('/update-profile', authUser, updateProfile)

// Saved addresses — authenticated routes
userRouter.post('/addresses', authUser, getAddresses)
userRouter.post('/add-address', authUser, addAddress)
userRouter.post('/update-address', authUser, updateAddress)
userRouter.post('/delete-address', authUser, deleteAddress)

export default userRouter;