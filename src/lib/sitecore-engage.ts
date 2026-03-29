'use client';

import { init } from '@sitecore/engage';

let engageInstance: any = null;

const clientKey = process.env.NEXT_PUBLIC_SITECORE_CLIENT_KEY!;
const targetURL = process.env.NEXT_PUBLIC_SITECORE_TARGET_URL!;
const pointOfSale = process.env.NEXT_PUBLIC_SITECORE_POS!;

export async function initEngage() {
  if (engageInstance) return engageInstance;

  engageInstance = await init({
    clientKey,
    targetURL,
    pointOfSale,
    cookieDomain: window.location.hostname,
    cookieExpiryDays: 365,
    forceServerCookieMode: false,
    includeUTMParameters: true,
    webPersonalization: true,
  });

  return engageInstance;
}

export async function trackPageView(pageName: string) {
  const engage = await initEngage();

  return engage.pageView({
    channel: 'WEB',
    language: 'EN',
    currency: 'USD',
    page: pageName,
    pointOfSale,
  });
}

export async function trackEvent(
  eventName: string,
  payload: Record<string, any>,
  extensionData?: Record<string, any>
) {
  const engage = await initEngage();
  return engage.event(eventName, payload, extensionData);
}

export async function trackIdentity(
  payload: Record<string, any>,
  extensionData?: Record<string, any>
) {
  const engage = await initEngage();
  return engage.identity(payload, extensionData);
}
