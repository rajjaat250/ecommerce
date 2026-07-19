import React, { useState } from 'react';
import { useCart } from '../context/Cartcontext';
import { useNavigate } from 'react-router-dom';

function Checkout() {
    const { cart, clearCart } = useCart();
    const navigate = useNavigate();
    const BASE_URL = import.meta.env.VITE_BASE_URL;

    const [formData, setFormData] = useState({
        full_name: '',
        address: '',
        city: '',
        postal_code: '',
        phone_number: '',
        payment_method: 'Cash on Delivery'
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        try {
            const res = await fetch(`${BASE_URL}/order/create/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || 'Failed to place order');
            }

            // Order successful
            setSuccess(true);
            clearCart();
            
            setTimeout(() => {
                navigate('/');
            }, 3000);

        } catch (err) {
            setError(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (success) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
                <div className="text-green-500 mb-6 p-8 bg-green-50 rounded-full">
                    <svg className="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h2 className="text-4xl font-extrabold text-gray-900 mb-4 text-center">Order Placed Successfully!</h2>
                <p className="text-gray-500 mb-8 text-center max-w-md text-lg">Thank you for shopping with us. You will be redirected to the home page shortly.</p>
                <button onClick={() => navigate('/')} className="bg-gradient-to-r from-orange-500 to-pink-500 text-white font-bold py-3 px-8 rounded-full shadow-lg transform transition duration-300 hover:scale-105">
                    Continue Shopping
                </button>
            </div>
        );
    }

    if (cart.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
                <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Your Cart is Empty</h2>
                <button onClick={() => navigate('/')} className="text-blue-500 underline hover:text-blue-700">Go back to store</button>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500 mb-10 tracking-tight">Checkout</h1>
            
            <div className="flex flex-col lg:flex-row gap-12">
                <div className="lg:w-2/3">
                    <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 relative overflow-hidden">
                        <h2 className="text-2xl font-extrabold text-gray-900 mb-6 pb-6 border-b border-gray-100">Shipping Details</h2>
                        
                        {error && (
                            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
                                <p>{error}</p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                                <input 
                                    type="text" 
                                    name="full_name" 
                                    value={formData.full_name} 
                                    onChange={handleInputChange} 
                                    required 
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                                    placeholder="John Doe"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                                <textarea 
                                    name="address" 
                                    value={formData.address} 
                                    onChange={handleInputChange} 
                                    required 
                                    rows="3"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                                    placeholder="123 Main St, Apartment 4B"
                                ></textarea>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                                    <input 
                                        type="text" 
                                        name="city" 
                                        value={formData.city} 
                                        onChange={handleInputChange} 
                                        required 
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                                        placeholder="New York"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Postal Code</label>
                                    <input 
                                        type="text" 
                                        name="postal_code" 
                                        value={formData.postal_code} 
                                        onChange={handleInputChange} 
                                        required 
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                                        placeholder="10001"
                                    />
                                </div>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                                <input 
                                    type="tel" 
                                    name="phone_number" 
                                    value={formData.phone_number} 
                                    onChange={handleInputChange} 
                                    required 
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                                    placeholder="+1 (555) 000-0000"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
                                <select 
                                    name="payment_method" 
                                    value={formData.payment_method} 
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                                >
                                    <option value="Cash on Delivery">Cash on Delivery</option>
                                    <option value="Credit Card">Credit Card</option>
                                    <option value="UPI">UPI</option>
                                </select>
                            </div>

                            <button 
                                type="submit" 
                                disabled={isSubmitting}
                                className={`w-full font-bold py-4 px-6 rounded-2xl text-white text-lg flex items-center justify-center gap-3 transition-all duration-300 ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 shadow-lg shadow-orange-500/30 transform hover:-translate-y-1'}`}
                            >
                                {isSubmitting ? (
                                    <span>Processing...</span>
                                ) : (
                                    <>
                                        <span>Place Order</span>
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
                
                <div className="lg:w-1/3">
                    <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 sticky top-24 relative overflow-hidden">
                        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 rounded-full bg-gradient-to-br from-orange-100 to-pink-100 opacity-50 blur-2xl"></div>
                        
                        <h2 className="text-2xl font-extrabold text-gray-900 mb-6 pb-6 border-b border-gray-100">
                            Order Summary
                        </h2>
                        
                        <div className="space-y-4 mb-6">
                            {cart.map(item => (
                                <div key={item.id} className="flex justify-between text-sm">
                                    <span className="text-gray-600 line-clamp-1 flex-1 pr-4">{item.quantity}x {item.name}</span>
                                    <span className="text-gray-900 font-bold whitespace-nowrap">₹{(item.price * item.quantity).toFixed(2)}</span>
                                </div>
                            ))}
                        </div>
                        
                        <div className="border-t border-gray-100 pt-4 mb-6 space-y-3">
                            <div className="flex justify-between text-gray-600 font-medium">
                                <span>Subtotal</span>
                                <span>₹{total.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-gray-600 font-medium">
                                <span>Shipping</span>
                                <span className="text-green-500">Free</span>
                            </div>
                        </div>
                        
                        <div className="border-t-2 border-dashed border-gray-200 pt-6">
                            <div className="flex justify-between items-end">
                                <span className="text-xl font-bold text-gray-900">Total</span>
                                <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-pink-600 tracking-tight">₹{total.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Checkout;
