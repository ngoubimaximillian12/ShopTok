import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import api from '../../services/api';

const ProductList: React.FC = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get('/products').then(res => setProducts(res.data));
  }, []);

  const handleAddToCart = async (id: number) => {
    try {
      await api.post('/cart', { productId: id });
      alert('Added to cart!');
    } catch (error) {
      console.error('Add to cart failed', error);
      alert('Failed to add to cart.');
    }
  };

  return (
    <div className="flex flex-wrap justify-center">
      {products.map(product => (
        <ProductCard key={product.id} {...product} onAddToCart={handleAddToCart} />
      ))}
    </div>
  );
};

export default ProductList;
