import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { loginUser } = useContext(AuthContext);
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        const result = await loginUser(username, password);
        if (!result.success) {
            setError(result.error);
            setIsSubmitting(false);
        } else {
            navigate('/');
        }
    };

    return (
        <div className="relative min-h-[90vh] flex items-center justify-center bg-gray-50 overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-gradient-to-br from-orange-400/30 to-pink-500/30 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-500/20 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="w-full max-w-lg p-10 m-4 bg-white/80 backdrop-blur-xl border border-white/50 rounded-3xl shadow-2xl relative z-10">
                <div className="mb-10 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-gray-900 to-black rounded-2xl mb-6 shadow-xl shadow-gray-900/20 transform hover:scale-105 transition-transform duration-300 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-50"></div>
                        <span className="text-transparent bg-clip-text bg-gradient-to-br from-orange-400 to-pink-500 font-black text-2xl relative z-10">
                            IS
                        </span>
                    </div>
                    <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-700 tracking-tight">Welcome Back</h1>
                    <p className="mt-3 text-base text-gray-500 font-medium">Elevate your shopping experience today.</p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-50/80 backdrop-blur-sm border-l-4 border-red-500 text-red-700 rounded-r-xl shadow-sm animate-pulse">
                        <p className="font-medium text-sm">{error}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-1">
                        <label className="block text-sm font-bold text-gray-700 ml-1">Username</label>
                        <div className="relative">
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full px-5 py-4 text-gray-800 bg-gray-50/50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 focus:bg-white transition-all duration-300"
                                placeholder="Enter your username"
                                required
                            />
                        </div>
                    </div>
                    
                    <div className="space-y-1">
                        <label className="block text-sm font-bold text-gray-700 ml-1">Password</label>
                        <div className="relative">
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-5 py-4 text-gray-800 bg-gray-50/50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 focus:bg-white transition-all duration-300"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                    </div>
                    
                    <div className="flex items-center justify-between px-1">
                        <div className="flex items-center group cursor-pointer">
                            <input type="checkbox" id="remember" className="w-4 h-4 text-orange-500 bg-gray-100 border-gray-300 rounded focus:ring-orange-500 focus:ring-2 cursor-pointer" />
                            <label htmlFor="remember" className="ml-2 text-sm font-medium text-gray-600 group-hover:text-gray-900 transition-colors cursor-pointer">Remember me</label>
                        </div>
                        <a href="#" className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 transition-colors">Forgot password?</a>
                    </div>
                    
                    <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className={`w-full py-4 mt-2 text-white font-bold rounded-2xl shadow-lg transition-all duration-300 transform flex items-center justify-center ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 hover:-translate-y-1 hover:shadow-orange-500/30'}`}
                    >
                        {isSubmitting ? 'Signing in...' : 'Sign In'}
                        {!isSubmitting && (
                            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        )}
                    </button>
                </form>

                <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                    <p className="text-sm font-medium text-gray-600">
                        Don't have an account?{' '}
                        <Link to="/register" className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 transition-colors">
                            Create one now
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
