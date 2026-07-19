import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

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

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.password2) {
            setError("Passwords do not match");
            return;
        }
        const result = await registerUser(formData);
        if (!result.success) {
            setError(result.error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 py-12">
            <div className="w-full max-w-md p-8 m-4 bg-white rounded-2xl shadow-xl">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-gray-800">Create an Account</h1>
                    <p className="mt-2 text-sm text-gray-600">Join us to start shopping.</p>
                </div>

                {error && <div className="mb-4 text-sm text-red-600 bg-red-100 p-3 rounded-lg">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-700">First Name</label>
                            <input type="text" name="first_name" onChange={handleChange} className="w-full px-4 py-2 text-gray-800 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all" placeholder="John" />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-700">Last Name</label>
                            <input type="text" name="last_name" onChange={handleChange} className="w-full px-4 py-2 text-gray-800 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all" placeholder="Doe" />
                        </div>
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">Username</label>
                        <input type="text" name="username" onChange={handleChange} className="w-full px-4 py-2 text-gray-800 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all" placeholder="johndoe123" required />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">Email Address</label>
                        <input type="email" name="email" onChange={handleChange} className="w-full px-4 py-2 text-gray-800 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all" placeholder="john@example.com" required />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">Password</label>
                        <input type="password" name="password" onChange={handleChange} className="w-full px-4 py-2 text-gray-800 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all" placeholder="••••••••" required />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">Confirm Password</label>
                        <input type="password" name="password2" onChange={handleChange} className="w-full px-4 py-2 text-gray-800 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all" placeholder="••••••••" required />
                    </div>
                    <button type="submit" className="w-full px-4 py-3 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all font-semibold">
                        Sign Up
                    </button>
                </form>

                <p className="mt-8 text-sm text-center text-gray-600">
                    Already have an account? <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">Sign in</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
