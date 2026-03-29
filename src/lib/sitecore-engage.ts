// Sitecore Engage Integration Module
// This module initializes and manages the Sitecore CDP Engage SDK.
// It provides functions to track page views and custom events for personalization and analytics.

'use client';

import { init, type Engage, type ICustomEventInput } from '@sitecore/engage';
import { env } from './env';

// Singleton promise to ensure the Engage SDK is only initialized once
// This improves performance by reusing the same instance across the app
let engagePromise: Promise<Engage> | null = null;

// Type definition for additional event extension data
type EventExtensionData = Parameters<Engage['event']>[2];

/**
 * getEngage - Lazily initializes and returns the Sitecore Engage SDK instance
 *
 * Uses a singleton pattern to ensure the SDK is only initialized once, even if
 * this function is called multiple times. Subsequent calls return the cached promise.
 *
 * @returns {Promise<Engage>} A promise that resolves to the initialized Engage SDK instance
 */
function getEngage() {
  if (!engagePromise) {
    // Initialize the Engage SDK with configuration from environment variables
    engagePromise = init({
      clientKey: env.sitecoreClientKey,
      targetURL: env.sitecoreTargetUrl,
      pointOfSale: env.sitecorePointOfSale,
      cookieDomain: env.cookieDomain,
    });
  }

  return engagePromise;
}

/**
 * trackPageView - Records a page view event in Sitecore CDP
 *
 * This function automatically captures page view events with standard metadata
 * including channel (WEB), language (en), currency (USD), and the current page path.
 * Called automatically by the SitecoreTracker component whenever the page changes.
 *
 * @param {string} path - The path of the page being viewed (e.g., '/products', '/')
 * @returns {Promise} A promise that resolves when the page view has been recorded
 */
export async function trackPageView(path: string) {
  const engage = await getEngage();

  // Send page view event with standard metadata and URL information
  return engage.pageView(
    {
      // Standard channel identifier for web traffic
      channel: 'WEB',
      language: 'en',
      currency: 'USD',
      // The page path for tracking user navigation
      page: path,
      pointOfSale: env.sitecorePointOfSale,
    },
    {
      // Additional context: the full browser URL
      url: window.location.href,
    },
  );
}

/**
 * trackEvent - Records a custom event in Sitecore CDP
 *
 * This function sends custom events to Sitecore CDP for tracking user interactions
 * and behaviors beyond page views (e.g., button clicks, form submissions, purchases).
 *
 * @param {string} type - The event type/name (e.g., 'TEST_EVENT_2', 'PURCHASE', 'SIGNUP')
 * @param {ICustomEventInput} eventData - Event metadata including channel, currency, and custom fields
 * @param {EventExtensionData} [extensionData] - Optional additional event data for extensions
 * @returns {Promise} A promise that resolves when the event has been recorded
 */
export async function trackEvent(
  type: string,
  eventData: ICustomEventInput = {
    // Default event metadata
    channel: 'WEB',
    language: 'en',
    currency: 'USD',
    pointOfSale: env.sitecorePointOfSale,
  },
  extensionData?: EventExtensionData,
) {
  const engage = await getEngage();

  // Send the custom event to Sitecore CDP
  return engage.event(type, eventData, extensionData);
}
