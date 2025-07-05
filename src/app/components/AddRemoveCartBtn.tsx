'use client';

import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../../store/cartSlice';
import { Product } from '../../types/product';
import { RootState } from '../../store';

interface AddRemoveCartBtnProps {
  product: Product;
}

export default function AddRemoveCartBtn({ product }: AddRemoveCartBtnProps) {
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
    <button
      onClick={handleClick}
      className={`cart-btn ${isInCart ? 'remove' : 'add'}`}
    >
      {isInCart ? 'Remove from Cart' : 'Add to Cart'}
    </button>
  );
}
