// HttpTrigger1/index.js
module.exports = async function (context, req) {
  try {
    const body = req.body || {};

    const normalized = {
      source: 'nextjs-demo',
      receivedAt: new Date().toISOString(),
      eventType: body.eventType || 'UNKNOWN',
      guestEmail: body.email || null,
      productSku: body.product?.sku || null,
      raw: body,
    };

    context.log('Normalized payload:', normalized);

    context.res = {
      status: 200,
      body: {
        success: true,
        normalized,
      },
    };
  } catch (error) {
    context.log.error('Function error', error);

    context.res = {
      status: 500,
      body: {
        success: false,
        message: error.message,
      },
    };
  }
};
