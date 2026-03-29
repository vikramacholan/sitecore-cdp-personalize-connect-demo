// Environment Configuration Module
// This file centralizes all environment variables used by the Sitecore CDP integration.
// All variables are prefixed with NEXT_PUBLIC_ to make them accessible in the browser.

/**
 * env - Global environment configuration object
 *
 * Contains all Sitecore CDP configuration values loaded from environment variables.
 * These values are used to initialize and configure the Sitecore Engage SDK.
 *
 * Properties:
 * - sitecoreClientKey: The unique client key for authenticating with Sitecore CDP
 * - sitecoreTargetUrl: The base URL for the Sitecore CDP service endpoint
 * - sitecorePointOfSale: Identifier for the point of sale (business location/channel)
 * - cookieDomain: The domain for setting cookies (defaults to 'localhost' for local development)
 *
 * Note: All values default to empty strings if not provided in environment variables,
 * which may cause errors at runtime. Ensure all required variables are set in .env.local
 */
export const env = {
  // Sitecore CDP client authentication key
  sitecoreClientKey: process.env.NEXT_PUBLIC_SITECORE_CLIENT_KEY || '',
  // Base URL for Sitecore CDP API endpoints
  sitecoreTargetUrl: process.env.NEXT_PUBLIC_SITECORE_TARGET_URL || '',
  // Point of sale identifier for tracking and personalization
  sitecorePointOfSale: process.env.NEXT_PUBLIC_SITECORE_POS || '',
  // Cookie domain for browser storage (set to localhost for local development)
  cookieDomain: process.env.NEXT_PUBLIC_COOKIE_DOMAIN || 'localhost',
};
