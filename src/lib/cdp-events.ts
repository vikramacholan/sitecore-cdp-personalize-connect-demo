'use client';

import {
  trackIdentity as sendIdentity,
  trackEvent,
} from '@/lib/sitecore-engage';

const POINT_OF_SALE = process.env.NEXT_PUBLIC_SITECORE_POS!;

export type ProductInput = {
  sku: string;
  productId?: string;
  name: string;
  price: number;
  currency?: string;
  category?: string;
  quantity?: number;
};

export type IdentityInput = {
  email: string;
  firstName?: string;
  lastName?: string;
  customerId?: string;
};

const DEFAULT_CHANNEL = 'WEB';
const DEFAULT_LANGUAGE = 'EN';
const DEFAULT_CURRENCY = 'USD';

export async function trackProductView(product: ProductInput) {
  return trackEvent(
    'VIEW',
    {
      channel: DEFAULT_CHANNEL,
      language: DEFAULT_LANGUAGE,
      currency: product.currency || DEFAULT_CURRENCY,
      page: `/products/${product.sku}`,
      pointOfSale: POINT_OF_SALE,
    },
    {
      product: {
        item_id: product.sku,
        productId: product.productId || product.sku,
        name: product.name,
        type: (product.category || 'PRODUCT').toUpperCase(),
        price: product.price,
      },
    }
  );
}

export async function trackAddToCart(product: ProductInput) {
  return trackEvent('ADD', {
    channel: DEFAULT_CHANNEL,
    language: DEFAULT_LANGUAGE,
    currency: product.currency || DEFAULT_CURRENCY,
    page: `/products/${product.sku}`,
    pointOfSale: POINT_OF_SALE,
    product: {
      type: (product.category || 'PRODUCT').toUpperCase(),
      item_id: product.sku,
      productId: product.productId || product.sku,
      referenceId: `${product.sku}-${Date.now()}`,
      orderedAt: new Date().toISOString(),
      quantity: product.quantity || 1,
      price: product.price,
      name: product.name,
    },
  });
}

export async function trackIdentity(identity: IdentityInput) {
  return sendIdentity({
    channel: DEFAULT_CHANNEL,
    language: DEFAULT_LANGUAGE,
    currency: DEFAULT_CURRENCY,
    page: 'login',
    pointOfSale: POINT_OF_SALE,
    email: identity.email.toLowerCase(),
    firstName: identity.firstName,
    lastName: identity.lastName,
    identifiers: identity.customerId
      ? [
          {
            id: identity.customerId,
            provider: 'NEXTJS_DEMO',
          },
        ]
      : [],
  });
}
