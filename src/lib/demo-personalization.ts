export function setViewedProduct(sku: string) {
  localStorage.setItem('last_viewed_product', sku);
}

export function getViewedProduct() {
  return localStorage.getItem('last_viewed_product');
}

export function markCartAdded(sku: string) {
  localStorage.setItem(`cart_added_${sku}`, 'true');
}

export function hasAddedToCart(sku: string) {
  return localStorage.getItem(`cart_added_${sku}`) === 'true';
}


