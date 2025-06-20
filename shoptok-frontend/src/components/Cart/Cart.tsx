import React, { useEffect, useState } from 'react';
import api from '../../services/api';

interface CartItem {
  id: number;
  quantity: number;
  product: {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
  };
}

const Cart: React.FC = () => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    try {
      const res = await api.get('/cart');
      setItems(res.data.items);
    } catch (error) {
      console.error('Failed to fetch cart', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleRemove = async (productId: number) => {
    try {
      await api.delete(`/cart/${productId}`);
      fetchCart();
    } catch (error) {
      console.error('Failed to remove item', error);
    }
  };

  const totalPrice = items.reduce((acc, item) => acc + item.quantity * item.product.price, 0);

  if (loading) return <p>Loading cart...</p>;

  if (items.length === 0) return <p>Your cart is empty.</p>;

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Your Cart</h2>
      {items.map(item => (
        <div key={item.id} className="flex items-center mb-4 border-b pb-2">
          <img src={item.product.imageUrl} alt={item.product.name} className="w-20 h-20 rounded mr-4" />
          <div className="flex-1">
            <h3 className="font-semibold">{item.product.name}</h3>
            <p>Quantity: {item.quantity}</p>
            <p>Price: ${(item.product.price * item.quantity).toFixed(2)}</p>
          </div>
          <button
            className="text-red-600 font-bold px-2 py-1 hover:underline"
            onClick={() => handleRemove(item.product.id)}
          >
            Remove
          </button>
        </div>
      ))}
      <div className="text-right font-bold text-lg mt-4">Total: ${totalPrice.toFixed(2)}</div>
    </div>
  );
};

export default Cart;
