// Home Page Component
// This page demonstrates Sitecore CDP event tracking with a sample button.
// The 'use client' directive is required because this component uses interactive features (onClick handler).

'use client';

import { trackEvent } from '@/lib/sitecore-engage';

/**
 * HomePage - Main landing page component
 *
 * This is a client-side component that displays the home page content and provides
 * a button to demonstrate event tracking with Sitecore CDP.
 *
 * Features:
 * - Renders a simple welcome message
 * - Includes a button that triggers a custom event when clicked
 * - Events are tracked and sent to Sitecore CDP for personalization and analytics
 *
 * @returns {JSX.Element} The home page UI
 */
export default function Demo() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Sitecore CDP Demo2</h1>
      <p>Home page loaded</p>

      {/* Test button that sends a custom event to Sitecore CDP when clicked */}
      <button
        onClick={() =>
          trackEvent('TEST_EVENT_2', {
            channel: 'WEB',
            currency: 'INR',
            // Additional event data can be added here and will be tracked
            message: 'Hello from Vikram demo Page2',
          })
        }
      >
        Send Test Event
      </button>
    </div>
  );
}
