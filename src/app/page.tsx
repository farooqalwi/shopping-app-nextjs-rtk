import { Product } from '../types/product';
import ProductCard from './components/ProductCard';

export default async function HomePage() {
  let products: Product[] = [];
  // Generate a random limit between 5 and 20
  const randomLimit = Math.floor(Math.random() * 10) + 5;

  try {
    const res = await fetch(`https://fakestoreapi.com/products?limit=${randomLimit}`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error('Failed to fetch products');
    }

    products = await res.json();
  } catch {
    return (
      <div>
        <h1 className="page-title">🛍️ Shopping App</h1>
        <p style={{ color: 'red' }}>Error loading products. Please try again later.</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="page-title">🛍️ Shopping App</h1>
      <div className="product-list">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
