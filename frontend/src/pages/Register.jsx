import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        password2: '',
        first_name: '',
        last_name: ''
    });
    const { registerUser } = useContext(AuthContext);
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.password2) {
            setError("Passwords do not match");
            return;
        }
        setIsSubmitting(true);
        const result = await registerUser(formData);
        if (!result.success) {
            setError(result.error);
            setIsSubmitting(false);
        } else {
            navigate('/login');
        }
    };

    return (
        <div className="relative min-h-[90vh] flex items-center justify-center bg-gray-50 overflow-hidden py-12">
            {/* Background Decorations */}
            <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-gradient-to-br from-pink-400/20 to-orange-500/20 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-gradient-to-tr from-blue-400/20 to-purple-500/20 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="w-full max-w-xl p-10 m-4 bg-white/80 backdrop-blur-xl border border-white/50 rounded-3xl shadow-2xl relative z-10">
                <div className="mb-10 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-gray-900 to-black rounded-2xl mb-6 shadow-xl shadow-gray-900/20 transform hover:scale-105 transition-transform duration-300 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-50"></div>
                        <span className="text-transparent bg-clip-text bg-gradient-to-br from-orange-400 to-pink-500 font-black text-2xl relative z-10">
                            IS
                        </span>
                    </div>
                    <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-700 tracking-tight">Create Account</h1>
                    <p className="mt-3 text-base text-gray-500 font-medium">Join us to start shopping for premium items.</p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-50/80 backdrop-blur-sm border-l-4 border-red-500 text-red-700 rounded-r-xl shadow-sm animate-pulse">
                        <p className="font-medium text-sm">{error}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="space-y-1">
                            <label className="block text-sm font-bold text-gray-700 ml-1">First Name</label>
                            <input 
                                type="text" 
                                name="first_name" 
                                onChange={handleChange} 
                                className="w-full px-4 py-3 text-gray-800 bg-gray-50/50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 focus:bg-white transition-all duration-300" 
                                placeholder="John" 
                                required
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="block text-sm font-bold text-gray-700 ml-1">Last Name</label>
                            <input 
                                type="text" 
                                name="last_name" 
                                onChange={handleChange} 
                                className="w-full px-4 py-3 text-gray-800 bg-gray-50/50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 focus:bg-white transition-all duration-300" 
                                placeholder="Doe" 
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="block text-sm font-bold text-gray-700 ml-1">Username</label>
                        <input 
                            type="text" 
                            name="username" 
                            onChange={handleChange} 
                            className="w-full px-4 py-3 text-gray-800 bg-gray-50/50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 focus:bg-white transition-all duration-300" 
                            placeholder="johndoe123" 
                            required 
                        />
                    </div>
                    
                    <div className="space-y-1">
                        <label className="block text-sm font-bold text-gray-700 ml-1">Email Address</label>
                        <input 
                            type="email" 
                            name="email" 
                            onChange={handleChange} 
                            className="w-full px-4 py-3 text-gray-800 bg-gray-50/50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 focus:bg-white transition-all duration-300" 
                            placeholder="john@example.com" 
                            required 
                        />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="space-y-1">
                            <label className="block text-sm font-bold text-gray-700 ml-1">Password</label>
                            <input 
                                type="password" 
                                name="password" 
                                onChange={handleChange} 
                                className="w-full px-4 py-3 text-gray-800 bg-gray-50/50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 focus:bg-white transition-all duration-300" 
                                placeholder="••••••••" 
                                required 
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="block text-sm font-bold text-gray-700 ml-1">Confirm Password</label>
                            <input 
                                type="password" 
                                name="password2" 
                                onChange={handleChange} 
                                className="w-full px-4 py-3 text-gray-800 bg-gray-50/50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 focus:bg-white transition-all duration-300" 
                                placeholder="••••••••" 
                                required 
                            />
                        </div>
                    </div>
                    
                    <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className={`w-full py-4 mt-6 text-white font-bold rounded-2xl shadow-lg transition-all duration-300 transform flex items-center justify-center ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 hover:-translate-y-1 hover:shadow-orange-500/30'}`}
                    >
                        {isSubmitting ? 'Creating Account...' : 'Sign Up'}
                        {!isSubmitting && (
                            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        )}
                    </button>
                </form>

                <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                    <p className="text-sm font-medium text-gray-600">
                        Already have an account?{' '}
                        <Link to="/login" className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 transition-colors">
                            Sign in here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
