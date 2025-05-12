import React, { useEffect, useState } from 'react';
import { getWishlist } from '../services/api'; // Assuming api.js is in '../services'

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const data = await getWishlist();
        setWishlistItems(data); // Assuming the API returns an array of wishlist items
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchWishlist();
  }, []); // Empty dependency array to fetch data only once on mount

  if (loading) {
    return <p>Loading wishlist...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="wishlist-container">
      <h2>My Wishlist</h2>
      {wishlistItems.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <div className="wishlist-items">
          {wishlistItems.map(item => (
            <div key={item._id} className="wishlist-item">
              {/* Display wishlist item details (e.g., image, name, price) */}
              <img src={item.image} alt={item.name} width="50" />
              <p>{item.name}</p>
              <p>${item.price}</p>
              {/* Add remove from wishlist button */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
