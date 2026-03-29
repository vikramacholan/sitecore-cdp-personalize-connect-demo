// Root Layout Component
// This is the main layout wrapper for all pages in the application.
// It provides the HTML structure and initializes the SitecoreTracker component.

import SitecoreTracker from './components/SitecoreTracker';

/**
 * RootLayout - Main application layout component
 *
 * This component serves as the root layout for the Next.js app, wrapping all pages.
 * It includes:
 * - The SitecoreTracker component that monitors page views and sends data to Sitecore CDP
 * - Standard HTML structure with language attribute set to English
 * - A body element that contains the tracker and all page content via {children}
 *
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Page content to be rendered
 * @returns {JSX.Element} The complete HTML document structure
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* SitecoreTracker: Automatically tracks page views and sends them to Sitecore CDP */}
        <SitecoreTracker />
        {/* Page-specific content is injected here */}
        {children}
      </body>
    </html>
  );
}
