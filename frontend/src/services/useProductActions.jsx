import { useState, useEffect } from 'react';
import { addToWishlist, removeFromWishlist, getWishlist, addToCart, getCart } from './api';

const useProductActions = () => {
  const [loadingStates, setLoadingStates] = useState({});
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);
  const [tempUserId, setTempUserId] = useState(null);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [success, setSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getAuthHeaders = () => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
  });

  // Generate or retrieve temporary user ID
  useEffect(() => {
    let userId = localStorage.getItem('tempUserId');
    if (!userId) {
      userId = Date.now().toString() + Math.random().toString(36).substring(2);
      localStorage.setItem('tempUserId', userId);
    }
    setTempUserId(userId);
  }, []);

  // Fetch wishlist and cart when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      if (!tempUserId) return;
      setIsLoading(true);
      try {
        const [wishlistData, cartData] = await Promise.all([
          getWishlist({ headers: getAuthHeaders() }),
          getCart({ headers: getAuthHeaders() })
        ]);
        setWishlist(wishlistData);
        setCart(cartData);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load your data. Please refresh the page.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [tempUserId]);

  const handleWishlist = async (product) => {
    const isInWishlist = wishlist.some(item => item.productId === product._id);
    setLoadingStates(prev => ({ ...prev, [product._id]: true }));

    try {
      if (isInWishlist) {
        await removeFromWishlist(product._id, { headers: getAuthHeaders() });
        setWishlist(wishlist.filter(item => item.productId !== product._id));
        setSuccess('Removed from wishlist');
      } else {
        await addToWishlist(product._id, { headers: getAuthHeaders() });
        setWishlist([...wishlist, { productId: product._id, ...product }]);
        setSuccess('Added to wishlist');
      }
    } catch (error) {
      console.error('Error managing wishlist:', error);
      setError(error.response?.data?.message || 'Failed to update wishlist');
    } finally {
      setLoadingStates(prev => ({ ...prev, [product._id]: false }));
      setTimeout(() => {
        setSuccess(null);
        setError(null);
      }, 3000);
    }
  };

  const handleAddToCart = async (product) => {
    setLoadingStates(prev => ({ ...prev, [product._id]: true }));
    try {
      await addToCart(product._id, quantity, { headers: getAuthHeaders() });
      const updatedCart = await getCart({ headers: getAuthHeaders() });
      setCart(updatedCart);
      setSuccess('Added to cart successfully');
    } catch (error) {
      console.error('Error adding to cart:', error);
      setError(error.response?.data?.message || 'Failed to add to cart');
    } finally {
      setLoadingStates(prev => ({ ...prev, [product._id]: false }));
      setTimeout(() => {
        setSuccess(null);
        setError(null);
      }, 3000);
    }
  };

  const isInWishlist = (productId) => wishlist.some(item => item.productId === productId);
  const isInCart = (productId) => cart.some(item => item.productId === productId);
  const getCartItemQuantity = (productId) => {
    const item = cart.find(item => item.productId === productId);
    return item ? item.quantity : 0;
  };

  return { 
    isInWishlist, 
    handleWishlist, 
    handleAddToCart, 
    loadingStates, 
    wishlist, 
    cart, 
    isInCart, 
    getCartItemQuantity,
    error,
    success,
    quantity,
    setQuantity
  };
};

export default useProductActions;