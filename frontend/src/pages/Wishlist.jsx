import React from 'react';
import useProductActions from '../services/useProductActions';
import ProductCard from '../components/ProductCard'; // assuming you already have this

export default function Wishlist() {
  const { wishlistItems } = useProductActions();

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">Your Wishlist</h2>
      {wishlistItems.length === 0 ? (
        <p className="text-gray-600">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {wishlistItems.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
