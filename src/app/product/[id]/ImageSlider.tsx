'use client';

import Image from 'next/image';
import { useState } from 'react';

interface ImageSliderProps {
  images: string[];
  title: string;
  sku: string;
  brand: string;
}

export default function ImageSlider({ images, title, sku, brand }: ImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div style={{ minWidth: 300, position: 'relative', textAlign: 'center' }}>
      <Image
        src={images[currentIndex]}
        alt={`${title} - Image ${currentIndex + 1}`}
        width={300}
        height={300}
        style={{ objectFit: 'contain', borderRadius: 8 }}
      />
      {images.length > 1 && (
        <>
          <button
            onClick={prevImage}
            style={{
              position: 'absolute',
              left: 0,
              top: '50%',
              transform: 'translateY(-50%)',
              background: '#fff',
              border: '1px solid #ccc',
              padding: '4px 8px',
              cursor: 'pointer',
            }}
          >
            ‹
          </button>
          <button
            onClick={nextImage}
            style={{
              position: 'absolute',
              right: 0,
              top: '50%',
              transform: 'translateY(-50%)',
              background: '#fff',
              border: '1px solid #ccc',
              padding: '4px 8px',
              cursor: 'pointer',
            }}
          >
            ›
          </button>
        </>
      )}
      <p style={{ marginTop: 10, color: 'gray', fontSize: 12 }}>SKU: {sku}</p>
      <p style={{ marginTop: 4, color: 'gray', fontSize: 12 }}>Brand: {brand}</p>
    </div>
  );
}
