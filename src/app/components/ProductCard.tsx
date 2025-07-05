import Link from 'next/link';
import Image from 'next/image';
import { Product } from '../../types/product';
import AddRemoveCartBtn from './AddRemoveCartBtn';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="product-card">
      <Link href={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <Image
          src={product.image || '/placeholder.png'}
          alt={product.title}
          width={100}
          height={100}
          className="product-image"
        />
        <h4 className="product-title">{product.title}</h4>
        <p className="product-price">${product.price}</p>
      </Link>

      <AddRemoveCartBtn product={product} />
    </div>
  );
}
