import { Link } from "react-router-dom";

function ProductCard({ product }) {
    const Baseurl = import.meta.env.VITE_BASE_URL || 'http://127.0.0.1:8000';

    return (
        <Link to={`/product/${product.id}`}>
            <div className="bg-orange-400 rounded-xl shadow-md hover:shadow-xl transition duration-300 p-4 cursor-pointer">
                <img
                    src={`${Baseurl}${product.image}`}
                    alt={product.name}
                    className="w-full h-52 object-contain"
                />

                <h3 className="mt-4 text-lg font-semibold h-14 overflow-hidden">
                    {product.name}
                </h3>

                <p className="mt-3 text-2xl font-bold text-green-600">
                    ₹{product.price}
                </p>
            </div>

        </Link>
    );
}

export default ProductCard;