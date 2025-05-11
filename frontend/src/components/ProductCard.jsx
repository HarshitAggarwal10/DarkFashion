import useProductActions from '../services/useProductActions';

export default function ProductCard({ product }) {
  const { 
    isInWishlist, 
    handleWishlist, 
    handleAddToCart, 
    loadingStates 
  } = useProductActions();

  return (
    <div className="product-card bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover cursor-pointer"
        onClick={() => navigate(`/product/${product._id}`)}
      />
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
        <p className="text-gray-600 font-medium">${product.price}</p>
      </div>
      <div className="flex justify-between p-4">
        <button
          onClick={() => handleAddToCart(product)}
          disabled={loadingStates[product._id]}
          className="bg-blue-500 text-white py-2 px-4 rounded-md disabled:opacity-50"
        >
          {loadingStates[product._id] ? 'Adding...' : 'Add to Cart'}
        </button>
        <button
          onClick={() => handleWishlist(product)}
          disabled={loadingStates[product._id]}
          className={`py-2 px-4 rounded-md text-white disabled:opacity-50 ${
            isInWishlist(product._id) ? 'bg-red-500' : 'bg-gray-500'
          }`}
        >
          {loadingStates[product._id] 
            ? 'Processing...' 
            : isInWishlist(product._id) 
              ? 'Remove from Wishlist' 
              : 'Add to Wishlist'}
        </button>
      </div>
    </div>
  );
}