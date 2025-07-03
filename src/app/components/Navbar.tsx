'use client';

import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

export default function Navbar() {
  const cartCount = useSelector((state: RootState) => state.cart.length);

  return (
    <nav className="navbar">
      <Link href="/">🛍️ Shop</Link>
      <Link href="/cart" style={{ position: 'relative' }}>
        Cart
        {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
      </Link>
    </nav>
  );
}
