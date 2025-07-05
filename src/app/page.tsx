'use client';

import Loader from './components/Loader';
import { Product } from '../types/product';
import { useEffect, useState } from 'react';
import ProductCard from './components/ProductCard';

export default function HomePage() {
  const limit = 8;
  const [products, setProducts] = useState<Product[]>([]);
  const [skip, setSkip] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [initialLoaded, setInitialLoaded] = useState(false);

  const fetchProducts = async (limit: number, skip: number) => {
    try {
      const res = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`, {
        cache: 'no-store',
      });

      if (!res.ok) throw new Error('Failed to fetch');

      const data = await res.json();

      setTotal(data.total);

      const simplifiedProducts: Product[] = data.products.map((p: any) => ({
        id: p.id,
        title: p.title,
        price: p.price,
        description: p.description,
        category: p.category,
        image: p.images?.[0] || p.thumbnail || '/placeholder.png',
      }));

      return simplifiedProducts;
    } catch {
      return [];
    }
  };

  useEffect(() => {
    setLoading(true);

    fetchProducts(limit, skip)
      .then(newProducts => {
        setProducts(prev => {
          const existingIds = new Set(prev.map(p => p.id));
          const filtered = newProducts.filter(p => !existingIds.has(p.id));
          return [...prev, ...filtered];
        });
        setInitialLoaded(true);
      })
      .finally(() => setLoading(false));
  }, [skip]);

  const handleLoadMore = () => {
    setSkip(prev => prev + limit);
  };

  const hasMore = products.length < total;

  return (
    <div>
      <h1 className="page-title">🛍️ Shopping App</h1>

      {loading && !initialLoaded && (
        <Loader />
      )}

      <div className="product-list">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {initialLoaded && hasMore && (
        <div style={{ textAlign: 'center', marginTop: 20 }}>
          <button className="load-more-btn" onClick={handleLoadMore} disabled={loading}>
            {loading ? 'Loading...' : 'Load More'}
          </button>
        </div>
      )}
    </div>
  );
}
