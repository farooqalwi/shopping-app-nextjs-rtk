'use client';

import Link from 'next/link';
import Image from 'next/image';
import { RootState } from '../../store';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../../store/cartSlice';

export default function CartPage() {
  const cartItems = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();

  return (
    <div>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div style={{ marginTop: 20 }}>
          {cartItems.map(item => (
            <div key={item.id} className="cart-item">
              <Image
                src={item.image}
                alt={item.title}
                width={100}
                height={100}
              />

              <div style={{ flex: 1, marginLeft: 10 }}>
                <h4 style={{ margin: '0 0 5px 0' }}>{item.title}</h4>

                <p style={{ margin: '0 0 5px 0', fontSize: 14, color: '#555' }}>
                  {item.description}
                </p>

                <p style={{ margin: 0, fontWeight: 500 }}>${item.price}</p>
              </div>

              <Link
                href={`/product/${item.id}`}
                className="view-details-link"
              >
                View Details
              </Link>

              <button
                className="cart-btn remove"
                onClick={() => dispatch(removeFromCart(item.id))}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )
      }
    </div >
  );

}
