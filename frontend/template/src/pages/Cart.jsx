import api from "../api/axios";
import { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom"

export default function Cart() {
    const navigate = useNavigate()
    const userId = localStorage.getItem('userId');
    const [cart, setCart] = useState(null);

    // Load cart data
    const loadCart = async () => {
        if (!userId) return;
        const res = await api.get(`/cart/${userId}`);
        setCart(res.data);
    };

    useEffect(() => {
        loadCart();
    }, []);

    const removeItems = async (productId) => {
        await api.post(`/cart/remove`, { userId, productId });
        loadCart();
        window.dispatchEvent(new Event('cartUpdated'));
    };

    // Updated item Quantity

    const updateQty = async (productId, quantity) => {
        if (quantity === 0) {
            await removeItems(productId);
            return;
        }

        await api.post(`/cart/update`, { userId, productId, quantity });

        loadCart();
        window.dispatchEvent(new Event("cartUpdated"));
    };
    if (!cart) {
        return <div>Loading...</div>
    }

    const total = cart.items.reduce((sum, item) => sum + item.productId.price * item.quantity, 0);

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">
                Your Cart
            </h1>

            {
                cart.items.length === 0 ? (
                    <div>
                        Your Cart is Empty.
                    </div>
                ) : (
                    <div className="space-y-4">
                        {
                            cart.items.map((item) => (
                                <div 
                                key={item.productId._id}
                                className="flex items-center justify-between p-4 border rounded">
                                    <div className="flex items-center gap-4">
                                        <img
                                            src={item.productId.image}
                                            alt={item.productId.title}
                                            className="w-16 h-16 object-cover rounded"
                                        />
                                        <div>
                                            <h2 className="text-lg font-semibold">
                                                {item.productId.title}
                                            </h2>
                                            <p className="text-gray-600">
                                                ₹{item.productId.price.toFixed(2)}
                                            </p>
                                        </div>
                                    </div>

                                    {/*  */}
                                    
                                    <div className="flex items-center gap-2">
                                        <button className="px-2 py-1 bg-gray-200 rounded"
                                            onClick={() => updateQty(item.productId._id, item.quantity - 1)}
                                            disabled={item.quantity <= 1}
                                        >
                                            -
                                        </button>
                                        <span className="px-3 font-semibold">
                                            {item.quantity}
                                        </span>
                                        <button className="px-2 py-1 bg-gray-200 rounded"
                                            onClick={() => updateQty(item.productId._id, item.quantity + 1)}
                                        >
                                            +
                                        </button>
                                    </div>
                                    <div>
                                        <p className="font-semibold">
                                            ₹{(item.productId.price * item.quantity).toFixed(2)}
                                        </p>
                                    </div>
                                    <button className="text-red-500"
                                        onClick={() => removeItems(item.productId._id)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}

                        <div className="text-right mt-4">
                            <h2 className="text-xl font-bold">
                                Total : ₹{total.toFixed(2)}
                            </h2>
                        </div>

                        <button 
                        className="w-full bg-blue-500 text-white p-2 rounded"
                        onClick={() => navigate('/checkout-address')}
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                )
            }
        </div>
    )
};