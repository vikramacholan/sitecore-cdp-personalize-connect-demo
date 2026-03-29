export async function sendToIntegration(payload: Record<string, unknown>) {
  const url = process.env.NEXT_PUBLIC_AZURE_FUNCTION_URL;

  if (!url) {
    console.warn('NEXT_PUBLIC_AZURE_FUNCTION_URL is not set. Skipping integration call.');
    return { skipped: true };
  }

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Integration call failed: ${response.status}`);
  }

  return response.json();
}
