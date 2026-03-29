'use client';

import { trackIdentity } from '@/lib/cdp-events';
import { sendToIntegration } from '@/lib/integration-api';
import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('vikram.demo@example.com');
  const [firstName, setFirstName] = useState('Vikram');
  const [lastName, setLastName] = useState('K');
  const [customerId, setCustomerId] = useState('CUST-1001');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async () => {
    try {
      setIsSubmitting(true);
      setMessage('');

      await trackIdentity({
        email,
        firstName,
        lastName,
        customerId,
      });

      await sendToIntegration({
        eventType: 'IDENTITY',
        email,
        firstName,
        lastName,
        customerId,
      });

      setMessage('Identity event sent successfully.');
    } catch (error) {
      console.error('IDENTITY failed', error);
      setMessage('Identity tracking failed. Check console.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ padding: '24px', maxWidth: '420px' }}>
      <h1>Login Demo</h1>

      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        style={{ display: 'block', marginBottom: '12px', width: '100%' }}
      />

      <input
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        placeholder="First name"
        style={{ display: 'block', marginBottom: '12px', width: '100%' }}
      />

      <input
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        placeholder="Last name"
        style={{ display: 'block', marginBottom: '12px', width: '100%' }}
      />

      <input
        value={customerId}
        onChange={(e) => setCustomerId(e.target.value)}
        placeholder="Customer ID"
        style={{ display: 'block', marginBottom: '12px', width: '100%' }}
      />

      <button onClick={handleLogin} disabled={isSubmitting}>
        {isSubmitting ? 'Sending...' : 'Login + Send Identity'}
      </button>

      {message && <p style={{ marginTop: '16px' }}>{message}</p>}
    </div>
  );
}
