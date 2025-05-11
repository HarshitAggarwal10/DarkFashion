import axios from 'axios';

// Create a new instance of axios with a base URL and credentials
const API = axios.create({
  baseURL: 'http://localhost:5000/api', // ✅ Use your backend base URL
  withCredentials: true, // ✅ Required for sessions/cookies
});

export const addToWishlist = async (productId) => {
  try {
    const response = await API.post('/wishlist', { productId }); // Ensure productId is sent correctly
    return response.data;
  } catch (err) {
    console.error('Error adding to wishlist:', err);
    throw new Error(err.response?.data?.message || 'Failed to add to wishlist');
  }
};

export const removeFromWishlist = async (productId) => {
  try {
    const response = await API.delete(`/wishlist/${productId}`);
    return response.data;
  } catch (error) {
    console.error('Error removing from wishlist:', error);
    throw new Error(error.response?.data?.message || 'Failed to remove from wishlist');
  }
};

export const getWishlist = async () => {
  try {
    const response = await API.get('/wishlist');
    return response.data;
  } catch (error) {
    console.error('Error fetching wishlist:', error);
    throw new Error(error.response?.data?.message || 'Failed to fetch wishlist');
  }
};

// Cart API calls
export const addToCart = async (productId, quantity) => {
  try {
    const response = await API.post('/cart', { productId, quantity });
    return response.data;
  } catch (error) {
    console.error('Error adding to cart:', error);
    throw new Error(error.response?.data?.message || 'Failed to add to cart');
  }
};

export const updateCartItem = async (productId, quantity) => {
  try {
    const response = await API.put(`/cart/${productId}`, { quantity });
    return response.data;
  } catch (error) {
    console.error('Error updating cart item:', error);
    throw new Error(error.response?.data?.message || 'Failed to update cart item');
  }
};

export const removeFromCart = async (productId) => {
  try {
    const response = await API.delete(`/cart/${productId}`);
    return response.data;
  } catch (error) {
    console.error('Error removing from cart:', error);
    throw new Error(error.response?.data?.message || 'Failed to remove from cart');
  }
};

export const getCart = async () => {
  try {
    const response = await API.get('/cart');
    return response.data;
  } catch (error) {
    console.error('Error fetching cart:', error);
    throw new Error(error.response?.data?.message || 'Failed to fetch cart');
  }
};
