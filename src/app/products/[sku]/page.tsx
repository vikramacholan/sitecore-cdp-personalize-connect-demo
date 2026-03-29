'use client';

import { use, useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import { products } from '@/data/products';
import { trackProductView, trackAddToCart } from '@/lib/cdp-events';
import {
  setViewedProduct,
  markCartAdded,
  hasAddedToCart,
} from '@/lib/demo-personalization';

export default function ProductPage({
  params,
}: {
  params: Promise<{ sku: string }>;
}) {
  const { sku } = use(params);
  const product = products.find((p) => p.sku === sku);

  const [showBanner, setShowBanner] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!product) return;

    setViewedProduct(product.sku);

    // trackProductView({
    //   sku: product.sku,
    //   name: product.name,
    //   price: product.price,
    //   category: product.category,
    //   currency: 'USD',
    // }).catch((error) => {
    //   console.error('VIEW event failed', error);
    // });

    setShowBanner(!hasAddedToCart(product.sku));
  }, [product]);

  if (!product) {
    notFound();
  }

  const handleAddToCart = async () => {
    try {
      setIsAdding(true);
      setMessage('');

      await trackAddToCart({
        sku: product.sku,
        name: product.name,
        price: product.price,
        category: product.category,
        quantity: 1,
        currency: 'USD',
      });

      markCartAdded(product.sku);
      setShowBanner(false);
      setMessage('Added to cart and tracked in CDP.');
    } catch (error) {
      console.error('ADD event failed', error);
      setMessage('Add to cart tracking failed. Check console.');
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div style={{ padding: '24px', maxWidth: '700px' }}>
      {showBanner && (
        <div
          style={{
            padding: '12px 16px',
            marginBottom: '16px',
            border: '1px solid #d1d5db',
            borderRadius: '8px',
            background: '#f8fafc',
          }}
        >
          Still interested? Add this item to cart now.
        </div>
      )}

      <h1 style={{ marginBottom: '12px' }}>{product.name}</h1>

      <div style={{ marginBottom: '8px' }}>
        <strong>SKU:</strong> {product.sku}
      </div>

      <div style={{ marginBottom: '8px' }}>
        <strong>Category:</strong> {product.category}
      </div>

      <div style={{ marginBottom: '20px' }}>
        <strong>Price:</strong> ${product.price}
      </div>

      <button
        onClick={handleAddToCart}
        disabled={isAdding}
        style={{
          padding: '10px 16px',
          borderRadius: '8px',
          border: '1px solid #111827',
          background: isAdding ? '#9ca3af' : '#111827',
          color: '#ffffff',
          cursor: isAdding ? 'not-allowed' : 'pointer',
        }}
      >
        {isAdding ? 'Adding...' : 'Add to Cart'}
      </button>

      {message && <p style={{ marginTop: '16px' }}>{message}</p>}
    </div>
  );
}
