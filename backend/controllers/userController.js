import validator from "validator";
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
import userModel from "../models/userModel.js";


const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}

// Route for user login
const loginUser = async (req, res) => {
    try {

        const { email, password } = req.body;

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "User doesn't exists" })
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {

            const token = createToken(user._id)
            res.json({ success: true, token })

        }
        else {
            res.json({ success: false, message: 'Invalid credentials' })
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// Route for user register
const registerUser = async (req, res) => {
    try {

        const { name, email, password } = req.body;

        // checking user already exists or not
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "User already exists" })
        }

        // validating email format & strong password
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" })
        }
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" })
        }

        // hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        })

        const user = await newUser.save()

        const token = createToken(user._id)

        res.json({ success: true, token })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// Route for admin login
const adminLogin = async (req, res) => {
    try {
        
        const {email,password} = req.body

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email+password,process.env.JWT_SECRET);
            res.json({success:true,token})
        } else {
            res.json({success:false,message:"Invalid credentials"})
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}


// Get authenticated user's profile
const getProfile = async (req, res) => {
    try {
        const { userId } = req.body
        const user = await userModel.findById(userId).select('name email mobile')
        if (!user) {
            return res.json({ success: false, message: 'User not found' })
        }
        res.json({
            success: true,
            user: { name: user.name, email: user.email, mobile: user.mobile || '' }
        })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// Update authenticated user's name and/or email
const updateProfile = async (req, res) => {
    try {
        const { userId, name, email, mobile } = req.body
        const trimmedMobile = typeof mobile === 'string' ? mobile.trim() : ''

        if (!name || !name.trim()) {
            return res.json({ success: false, message: 'Name is required' })
        }
        if (!email || !validator.isEmail(email)) {
            return res.json({ success: false, message: 'Please enter a valid email' })
        }
        if (trimmedMobile && !validator.isMobilePhone(trimmedMobile, 'any')) {
            return res.json({ success: false, message: 'Please enter a valid mobile number' })
        }

        // Prevent email collision with another user
        const existing = await userModel.findOne({ email, _id: { $ne: userId } })
        if (existing) {
            return res.json({ success: false, message: 'Email is already in use by another account' })
        }

        await userModel.findByIdAndUpdate(userId, {
            name: name.trim(),
            email,
            mobile: trimmedMobile
        })
        res.json({ success: true, message: 'Profile updated successfully' })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const validateAddress = (address = {}) => {
    const { firstName, lastName, email, street, city, state, zipcode, country, phone } = address

    if (!firstName?.trim()) return 'First name is required'
    if (!lastName?.trim()) return 'Last name is required'
    if (!email || !validator.isEmail(email)) return 'Please enter a valid email'
    if (!street?.trim()) return 'Street address is required'
    if (!city?.trim()) return 'City is required'
    if (!state?.trim()) return 'State is required'
    if (!zipcode?.trim()) return 'Zipcode is required'
    if (!country?.trim()) return 'Country is required'
    if (!phone?.trim() || !validator.isMobilePhone(phone.trim(), 'any')) {
        return 'Please enter a valid phone number'
    }
    return null
}

const formatAddress = (address) => ({
    firstName: address.firstName.trim(),
    lastName: address.lastName.trim(),
    email: address.email.trim(),
    street: address.street.trim(),
    city: address.city.trim(),
    state: address.state.trim(),
    zipcode: address.zipcode.trim(),
    country: address.country.trim(),
    phone: address.phone.trim(),
})

const getAddresses = async (req, res) => {
    try {
        const { userId } = req.body
        const user = await userModel.findById(userId).select('addresses')
        if (!user) {
            return res.json({ success: false, message: 'User not found' })
        }
        res.json({ success: true, addresses: user.addresses || [] })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const addAddress = async (req, res) => {
    try {
        const { userId, address } = req.body
        const validationError = validateAddress(address)
        if (validationError) {
            return res.json({ success: false, message: validationError })
        }

        const user = await userModel.findById(userId)
        if (!user) {
            return res.json({ success: false, message: 'User not found' })
        }

        user.addresses.push(formatAddress(address))
        await user.save()

        res.json({
            success: true,
            message: 'Address added successfully',
            addresses: user.addresses
        })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const updateAddress = async (req, res) => {
    try {
        const { userId, addressId, address } = req.body
        const validationError = validateAddress(address)
        if (validationError) {
            return res.json({ success: false, message: validationError })
        }

        const user = await userModel.findById(userId)
        if (!user) {
            return res.json({ success: false, message: 'User not found' })
        }

        const existingAddress = user.addresses.id(addressId)
        if (!existingAddress) {
            return res.json({ success: false, message: 'Address not found' })
        }

        existingAddress.set(formatAddress(address))
        await user.save()

        res.json({
            success: true,
            message: 'Address updated successfully',
            addresses: user.addresses
        })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const deleteAddress = async (req, res) => {
    try {
        const { userId, addressId } = req.body
        const user = await userModel.findById(userId)
        if (!user) {
            return res.json({ success: false, message: 'User not found' })
        }

        const existingAddress = user.addresses.id(addressId)
        if (!existingAddress) {
            return res.json({ success: false, message: 'Address not found' })
        }

        existingAddress.deleteOne()
        await user.save()

        res.json({
            success: true,
            message: 'Address deleted successfully',
            addresses: user.addresses
        })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export {
    loginUser,
    registerUser,
    adminLogin,
    getProfile,
    updateProfile,
    getAddresses,
    addAddress,
    updateAddress,
    deleteAddress
}