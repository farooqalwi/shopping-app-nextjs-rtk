import { Product } from '../types/product';
import ProductCard from './components/ProductCard';

export default async function HomePage() {
  let products: Product[] = [];
  // Generate a random limit between 5 and 20
  const randomLimit = Math.floor(Math.random() * 10) + 12;

  try {
    const res = await fetch(`https://dummyjson.com/products?limit=${randomLimit}`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error('Failed to fetch products');
    }

    const data = await res.json();

    // Map to match your simplified Product interface
    products = data.products.map((p: any) => ({
      id: p.id,
      title: p.title,
      price: p.price,
      description: p.description,
      category: p.category,
      image: p.thumbnail, // or p.images[0]
    }));
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
