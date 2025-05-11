import { useState } from 'react';
import { addToWishlist, removeFromWishlist, getWishlist } from './api';

const useProductActions = () => {
  const [loadingStates, setLoadingStates] = useState({});
  const [wishlist, setWishlist] = useState([]);

  const handleWishlist = async (product) => {
    try {
      // Toggle the wishlist state (add/remove)
      setLoadingStates((prevState) => ({
        ...prevState,
        [product._id]: true,
      }));

      const isInWishlist = wishlist.some(item => item._id === product._id);

      if (isInWishlist) {
        // Remove from wishlist
        await removeFromWishlist(product._id);
        setWishlist(wishlist.filter(item => item._id !== product._id));
      } else {
        // Add to wishlist
        await addToWishlist(product._id);
        setWishlist([...wishlist, product]);
      }
    } catch (error) {
      console.error('Error managing wishlist:', error);
    } finally {
      setLoadingStates((prevState) => ({
        ...prevState,
        [product._id]: false,
      }));
    }
  };

  const isInWishlist = (productId) => wishlist.some(item => item._id === productId);

  return { isInWishlist, handleWishlist, loadingStates };
};

export default useProductActions;
