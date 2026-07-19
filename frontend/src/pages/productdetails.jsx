import { useState, useEffect, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {useCart} from "../context/Cartcontext.jsx";
import { AuthContext } from "../context/AuthContext.jsx";

function Productdetails() {
    const { id } = useParams();
    const { addProduct } = useCart();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const Baseurl = import.meta.env.VITE_BASE_URL || 'http://127.0.0.1:8000';

    useEffect(() => {
        fetch(`${Baseurl}/products/${id}/`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Product not found");
                }
                return response.json();
            })
            .then((data) => {
                setProduct(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, [id, Baseurl]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen text-xl font-semibold text-gray-600">
                Loading product...
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col justify-center items-center h-screen">
                <p className="text-red-500 text-2xl font-bold mb-4">{error}</p>
                <Link to="/" className="text-blue-500 hover:underline">
                    &larr; Back to Products
                </Link>
            </div>
        );
    }

    if (!product) return null;

    // Handle both absolute and relative image URLs
    const imageUrl = product.image?.startsWith("http")
        ? product.image
        : `${Baseurl}${product.image}`;

    return (
        <div className="max-w-5xl mx-auto px-6 py-12">
            <Link to="/" className="text-blue-600 hover:text-blue-800 hover:underline mb-8 inline-flex items-center text-lg font-medium transition duration-200">
                <span className="mr-2">&larr;</span> Back to Products
            </Link>
            
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row border border-gray-100">
                <div className="md:w-1/2 p-8 flex justify-center items-center bg-gradient-to-br from-gray-50 to-gray-100">
                    <img
                        src={imageUrl}
                        alt={product.name}
                        className="w-full max-h-[400px] object-contain drop-shadow-md hover:scale-105 transition-transform duration-300"
                    />
                </div>
                
                <div className="md:w-1/2 p-10 flex flex-col justify-center bg-white">
                    {product.category && (
                        <div className="mb-4">
                            <span className="inline-block bg-orange-100 text-orange-800 text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wide">
                                {product.category.name}
                            </span>
                        </div>
                    )}
                    
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-4 leading-tight">{product.name}</h1>
                    <p className="text-3xl font-bold text-green-600 mb-6 flex items-center">
                        ₹{product.price}
                    </p>
                    
                    <div className="mb-8">
                        <h3 className="text-xl font-bold text-gray-800 mb-3 border-b pb-2">Description</h3>
                        <p className="text-gray-600 leading-relaxed text-lg">
                            {product.description || "No description available for this product."}
                        </p>
                    </div>
                    
                    <div className="mt-auto pt-6">
                        <button 
                            onClick={() => {
                                if (!user) {
                                    navigate('/login');
                                    return;
                                }
                                addProduct(product);
                            }}
                            className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-bold py-4 px-8 rounded-xl transition duration-300 shadow-lg hover:shadow-orange-500/30 transform hover:-translate-y-1 text-lg"
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Productdetails;
