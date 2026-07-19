import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ProductCard from "../components/productcard";

function Productlist() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const location = useLocation();

    const Baseurl = import.meta.env.VITE_BASE_URL || 'http://127.0.0.1:8000';

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const searchQuery = queryParams.get("search") || "";
        const categoryQuery = queryParams.get("category") || "";

        let url = `${Baseurl}/products/`;
        if (searchQuery || categoryQuery) {
            url += '?';
            if (searchQuery) url += `search=${searchQuery}&`;
            if (categoryQuery) url += `category=${categoryQuery}&`;
        }

        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch products");
                }
                return response.json();
            })
            .then((data) => {
                setProducts(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, [Baseurl, location.search]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen text-xl font-semibold">
                Loading...
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen text-red-500 text-xl">
                {error}
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-6 py-8">
            <h1 className="text-3xl font-bold mb-8 text-center">
                Our Products
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}

export default Productlist;