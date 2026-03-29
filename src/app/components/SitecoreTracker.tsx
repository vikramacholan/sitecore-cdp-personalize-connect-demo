// Sitecore Page View Tracker Component
// This component automatically tracks page views whenever the user navigates to a new page.
// It doesn't render any visible UI - it's purely for side effects (tracking).

'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { trackPageView } from '@/lib/sitecore-engage';

/**
 * SitecoreTracker - Automatic page view tracking component
 *
 * This component monitors route changes using Next.js's usePathname hook and automatically
 * sends page view events to Sitecore CDP whenever the user navigates to a new page.
 *
 * How it works:
 * 1. usePathname() hook gets the current page path
 * 2. useEffect hook watches for changes to the path
 * 3. When path changes, trackPageView() is called to record the page view in Sitecore CDP
 * 4. The component renders nothing (returns null) - it's only for tracking side effects
 *
 * Benefits:
 * - Automatic tracking without manual integration on each page
 * - Provides Sitecore CDP with user navigation data for personalization
 * - No visible UI impact - runs silently in the background
 *
 * @returns {null} This component doesn't render any visible UI
 */
export default function SitecoreTracker() {
  // Get the current page path using Next.js router hook
  const path = usePathname();

  // Track page view whenever the path changes
  useEffect(() => {
    // trackPageView is async, so we use void to suppress the unhandled promise warning
    void trackPageView(path || '/');
  }, [path]); // Re-run this effect only when the path changes

  // This component is purely for tracking side effects and doesn't render any UI
  return null;
}
