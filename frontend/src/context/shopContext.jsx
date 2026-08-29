import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const ShopContext = createContext();

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const ShopContextProvider = (props) => {
    const currency = '$';
    const delivery_fee = 10;
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [products, setProducts] = useState([]);

    // ── Auth ─────────────────────────────────────────────────────────
    const [token, setToken] = useState(localStorage.getItem('token') || '');

    // ── Cart ─────────────────────────────────────────────────────────
    // Structure: { productId: { size: quantity } }
    const [cartItems, setCartItems] = useState({});

    // ── Products ─────────────────────────────────────────────────────
    const fetchProducts = async () => {
        try {
            const response = await axios.get(`${backendUrl}/api/product/list`);
            if (response.data.success) {
                setProducts(response.data.products);
            } else {
                console.error('Product list API returned failure:', response.data.message);
            }
        } catch (error) {
            console.error('Failed to fetch products from backend:', error.message);
        }
    };

    // ── Cart functions ────────────────────────────────────────────────

    const addToCart = async (itemId, size) => {
        const cartData = JSON.parse(JSON.stringify(cartItems));
        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            } else {
                cartData[itemId][size] = 1;
            }
        } else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }
        setCartItems(cartData);

        if (token) {
            try {
                await axios.post(
                    `${backendUrl}/api/cart/add`,
                    { itemId, size },
                    { headers: { token } }
                );
            } catch (error) {
                console.error('Failed to sync cart add to backend:', error.message);
            }
        }
    };

    const updateQuantity = async (itemId, size, quantity) => {
        const cartData = JSON.parse(JSON.stringify(cartItems));
        if (quantity <= 0) {
            // Remove this size entry; clean up empty product entry
            if (cartData[itemId]) {
                delete cartData[itemId][size];
                if (Object.keys(cartData[itemId]).length === 0) {
                    delete cartData[itemId];
                }
            }
        } else {
            if (cartData[itemId]) {
                cartData[itemId][size] = quantity;
            }
        }
        setCartItems(cartData);

        if (token) {
            try {
                await axios.post(
                    `${backendUrl}/api/cart/update`,
                    { itemId, size, quantity },
                    { headers: { token } }
                );
            } catch (error) {
                console.error('Failed to sync cart update to backend:', error.message);
            }
        }
    };

    const getCartCount = () => {
        let count = 0;
        for (const itemId in cartItems) {
            for (const size in cartItems[itemId]) {
                if (cartItems[itemId][size] > 0) {
                    count += cartItems[itemId][size];
                }
            }
        }
        return count;
    };

    const getCartAmount = () => {
        let total = 0;
        for (const itemId in cartItems) {
            const product = products.find(p => p._id === itemId);
            if (!product) continue;
            for (const size in cartItems[itemId]) {
                const qty = cartItems[itemId][size];
                if (qty > 0) total += product.price * qty;
            }
        }
        return total;
    };

    // Converts cartItems + products into the items[] array expected by the order API
    const getOrderItems = () => {
        const orderItems = [];
        for (const itemId in cartItems) {
            const product = products.find(p => p._id === itemId);
            if (!product) continue;
            for (const size in cartItems[itemId]) {
                const qty = cartItems[itemId][size];
                if (qty > 0) {
                    orderItems.push({
                        _id: product._id,
                        name: product.name,
                        price: product.price,
                        image: product.image,
                        size,
                        quantity: qty,
                    });
                }
            }
        }
        return orderItems;
    };


    const getUserCart = async (userToken) => {
        try {
            const response = await axios.post(
                `${backendUrl}/api/cart/get`,
                {},
                { headers: { token: userToken } }
            );
            if (response.data.success) {
                // Filter out any zero-quantity entries persisted by backend updateCart
                const raw = response.data.cartData || {};
                const cleaned = {};
                for (const itemId in raw) {
                    const sizes = raw[itemId];
                    const validSizes = {};
                    for (const size in sizes) {
                        if (sizes[size] > 0) validSizes[size] = sizes[size];
                    }
                    if (Object.keys(validSizes).length > 0) {
                        cleaned[itemId] = validSizes;
                    }
                }
                setCartItems(cleaned);
            }
        } catch (error) {
            console.error('Failed to fetch user cart from backend:', error.message);
        }
    };

    // ── Effects ───────────────────────────────────────────────────────

    useEffect(() => {
        fetchProducts();
    }, []);

    // On mount, if a token exists in localStorage, restore the user's cart
    useEffect(() => {
        if (token) {
            getUserCart(token);
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // ── Context value ─────────────────────────────────────────────────

    const value = {
        products,
        currency,
        delivery_fee,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        // Auth
        token,
        setToken,
        backendUrl,
        // Cart
        cartItems,
        setCartItems,
        addToCart,
        updateQuantity,
        getCartCount,
        getCartAmount,
        getOrderItems,
        getUserCart,
    };

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;