import { useEffect, useState } from 'react';
// import { getCart } from '../services/api';
import ProductCard from '../components/ProductCard';

export default function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      const userId = JSON.parse(localStorage.getItem('userInfo'))._id;
      const { data } = await axios.get(`/api/cart/${userId}`);
      setCart(data.cart);
    };
    fetchCart();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Your Cart</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {cart.map(product => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}
