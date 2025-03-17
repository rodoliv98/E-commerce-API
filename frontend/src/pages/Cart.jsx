import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const redirectUser = useNavigate();

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await axios.get('http://localhost:3000/cart');
                setCartItems(response.data);
            } catch (error) {
                if(error.response.data === 'Please login') return redirectUser('/login');
                console.error('Error fetching cart items:', error);
            }
        };

        fetchCartItems();
    }, [cartItems]);

    const handleRemoveFromCart = async (productId) => {
        try {
            await axios.delete('http://localhost:3000/cart', { data: { productId } });
            setCartItems(cartItems.filter(item => item._id !== productId));
        } catch (error) {
            console.error(error);
        }
    };

    const handleDecreaseQuantity = async (productId) => {
        try {
            const response = await axios.patch('http://localhost:3000/cart/decrease', { productId });
            setCartItems(cartItems.map(item => 
                item._id === productId ? { ...item, quantity: response.data.quantity } : item
            ));
        } catch (error) {
            console.error('Error decreasing product quantity:', error);
        }
    };

    const handleIncreaseQuantity = async (productId) => {
        try {
            const response = await axios.patch('http://localhost:3000/cart/increase', { productId });
            setCartItems(cartItems.map(item => 
                item._id === productId ? { ...item, quantity: response.data.quantity } : item
            ));
        } catch (error) {
            console.error('Error increasing product quantity:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 p-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-white">Cart</h1>
                <Link to="/" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 active:bg-blue-700">
                    Home
                </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {cartItems.length === 0 ? (
                    <p className="text-white">No items in cart</p>
                ) : (
                    cartItems.map(item => (
                        <div key={item._id} className="bg-gray-800 p-6 rounded-lg shadow-lg">
                            <h2 className="text-xl font-bold text-white mb-2">{item.item}</h2>
                            <p className="text-lg font-semibold text-white">Price: R${item.price}</p>
                            <div className="flex items-center justify-between mt-4">
                                <button
                                    onClick={() => handleDecreaseQuantity(item._id)}
                                    className="bg-white text-black p-2 rounded"
                                >
                                    -
                                </button>
                                <span className="text-white mx-4">{item.quantity}</span>
                                <button
                                    onClick={() => handleIncreaseQuantity(item._id)}
                                    className="bg-white text-black p-2 rounded"
                                >
                                    +
                                </button>
                            </div>
                            <button
                                onClick={() => handleRemoveFromCart(item._id)}
                                className="mt-4 w-full bg-red-500 text-white p-2 rounded hover:bg-red-600 active:bg-red-700"
                            >
                                Remove from Cart
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Cart;
