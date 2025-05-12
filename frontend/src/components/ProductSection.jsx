import React from 'react';
import { useNavigate } from 'react-router-dom';
import useProductActions from '../services/useProductActions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ProductSection({ title, subtitle, products }) {
  const navigate = useNavigate();
  const { 
    isInWishlist, 
    handleWishlist, 
    handleAddToCart, 
    loadingStates,
    error,
    success
  } = useProductActions();

  // Show toast notifications for errors and success
  React.useEffect(() => {
    if (error) {
      toast.error(error, { position: 'top-right' });
    }
    if (success) {
      toast.success(success, { position: 'top-right' });
    }
  }, [error, success]);

  return (
    <section id="product1" className="section-p1 text-center px-4">
      <ToastContainer />
      <h2 className="text-3xl font-semibold text-[#333]">{title}</h2>
      <p className="text-gray-600 text-lg mt-2">{subtitle}</p>

      <div className="pro-container flex flex-wrap justify-center gap-4 pt-8">
        {products.map((product) => (
          <div
            key={product._id}
            className="pro w-full sm:w-[48%] md:w-[30%] lg:w-[22%] min-w-[230px] p-[15px] border border-[#e0e0e0] rounded-[15px] cursor-pointer shadow-[0_4px_10px_rgba(0,0,0,0.1)] m-[5px] transition duration-200 ease-in hover:shadow-[0_6px_15px_rgba(0,0,0,0.1)] relative"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-[300px] object-cover rounded-[10px]"
              onClick={() => navigate(`/product/${product._id}`)}
            />

            <div className="des text-left py-3">
              <span className="text-[#888] text-xs font-medium">{product.brand || 'Brand'}</span>
              <h5 className="pt-[10px] text-[#333] text-sm font-bold">{product.name}</h5>
              <div className="star text-[12px] text-yellow-500 flex mt-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i}>⭐</span>
                ))}
              </div>
              <h4 className="pt-[10px] text-[16px] font-semibold text-[#088178]">${product.price}</h4>
            </div>

            <div className="button-group flex gap-2 absolute bottom-[10px] right-[10px]">
              <button
                aria-label="Add to Cart"
                disabled={loadingStates[product._id]}
                className={`w-[40px] h-[40px] rounded-full flex justify-center items-center text-lg transition ${
                  loadingStates[product._id]
                    ? 'bg-gray-200 text-gray-500'
                    : 'bg-[#e8f6ea] text-[#088178] hover:bg-[#d1ebda] hover:text-[#055c52]'
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToCart(product);
                }}
              >
                {loadingStates[product._id] ? '⏳' : '🛒'}
              </button>
              <button
                aria-label={isInWishlist(product._id) ? "Remove from Wishlist" : "Add to Wishlist"}
                disabled={loadingStates[product._id]}
                className={`w-[40px] h-[40px] rounded-full flex justify-center items-center text-lg transition ${
                  loadingStates[product._id]
                    ? 'bg-gray-200 text-gray-500'
                    : isInWishlist(product._id)
                      ? 'bg-red-100 text-red-500 hover:bg-red-200'
                      : 'bg-[#e8f6ea] text-[#088178] hover:bg-[#d1ebda] hover:text-[#055c52]'
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleWishlist(product);
                }}
              >
                {loadingStates[product._id] ? '⏳' : isInWishlist(product._id) ? '❤️' : '🤍'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}