import ImageSlider from './ImageSlider';
import { notFound } from 'next/navigation';
import AddRemoveCartBtn from '../../components/AddRemoveCartBtn';

interface ProductDetailProps {
  params: {
    id: string;
  };
}

export default async function ProductDetail({ params }: ProductDetailProps) {
  let product;

  try {
    const res = await fetch(`https://dummyjson.com/products/${params.id}`, {
      cache: 'no-store',
    });

    if (!res.ok) return notFound();

    product = await res.json();
  } catch {
    return notFound();
  }

  const validImages =
    product.images?.length > 0 ? product.images : [product.thumbnail || '/placeholder.png'];

  return (
    <div style={{ padding: '30px', maxWidth: 1000, margin: 'auto' }}>
      <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap' }}>
        {/* Image Section */}
        <ImageSlider
          images={validImages}
          title={product.title}
          sku={product.sku}
          brand={product.brand}
        />

        {/* Product Info */}
        <div style={{ flex: 1 }}>
          <h1 style={{ marginBottom: 10 }}>{product.title}</h1>
          <p style={{ color: '#555', marginBottom: 20 }}>{product.description}</p>

          <AddRemoveCartBtn product={{
            id: product.id,
            title: product.title,
            price: product.price,
            description: product.description,
            category: product.category,
            image: product.images?.[0] || product.thumbnail || '/placeholder.png',
            thumbnail: product.thumbnail,
          }} />

          <p><strong>Price:</strong> ${product.price}</p>
          <p><strong>Discount:</strong> {product.discountPercentage}%</p>
          <p><strong>Rating:</strong> {product.rating} / 5</p>
          <p><strong>Stock:</strong> {product.stock}</p>
          <p><strong>Category:</strong> {product.category}</p>
          <p><strong>Minimum Order Quantity:</strong> {product.minimumOrderQuantity}</p>

          <p style={{ marginTop: 10 }}>
            <strong>Availability:</strong>{' '}
            <span style={{ color: product.availabilityStatus === 'In Stock' ? 'green' : 'red' }}>
              {product.availabilityStatus}
            </span>
          </p>

          <p><strong>Shipping Info:</strong> {product.shippingInformation}</p>
          <p><strong>Warranty:</strong> {product.warrantyInformation}</p>
          <p><strong>Return Policy:</strong> {product.returnPolicy}</p>
          <p><strong>Weight:</strong> {product.weight}g</p>
          <p>
            <strong>Dimensions:</strong>{' '}
            {product.dimensions.width} × {product.dimensions.height} × {product.dimensions.depth} cm
          </p>

          <div style={{ marginTop: 10 }}>
            <strong>Tags:</strong>{' '}
            {product.tags.map((tag: string) => (
              <span
                key={tag}
                style={{
                  backgroundColor: '#f1f1f1',
                  padding: '4px 8px',
                  borderRadius: 6,
                  marginRight: 6,
                  fontSize: 12,
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          <div style={{ marginTop: 20 }}>
            <img
              src={product.meta.qrCode}
              alt="QR Code"
              width={100}
              height={100}
            />
            <p style={{ fontSize: 12, color: '#888' }}>Barcode: {product.meta.barcode}</p>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div style={{ marginTop: 40 }}>
        <h2>Customer Reviews</h2>
        {product.reviews?.length > 0 ? (
          product.reviews.map((review: any, index: number) => (
            <div key={index} style={{ borderBottom: '1px solid #eee', padding: '10px 0' }}>
              <p>
                <strong>{review.reviewerName}</strong> - Rated {review.rating}/5
              </p>
              <p>{review.comment}</p>
              <p style={{ fontSize: 12, color: 'gray' }}>
                {new Date(review.date).toLocaleDateString()}
              </p>
            </div>
          ))
        ) : (
          <p>No reviews yet.</p>
        )}
      </div>
    </div>
  );
}
