'use client';

import { Product } from '../../types/product';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { addToCart, removeFromCart } from '../../store/cartSlice';
import Image from 'next/image';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const dispatch = useDispatch();

  const isInCart = useSelector((state: RootState) =>
    state.cart.some(item => item.id === product.id)
  );

  const handleClick = () => {
    if (isInCart) {
      dispatch(removeFromCart(product.id));
    } else {
      dispatch(addToCart(product));
    }
  };

  return (
    <div className="product-card">
      <Image
        src={product.image || '/placeholder.png'}
        alt={product.title}
        width={100}
        height={100}
        className="product-image"
      />
      <h4 className="product-title">{product.title}</h4>
      <p className="product-price">${product.price}</p>
      <button
        onClick={handleClick}
        className={`cart-btn ${isInCart ? 'remove' : 'add'}`}
      >
        {isInCart ? 'Remove from Cart' : 'Add to Cart'}
      </button>
    </div>
  );
}
