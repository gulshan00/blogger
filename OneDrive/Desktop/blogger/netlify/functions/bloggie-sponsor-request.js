// netlify/functions/bloggie-sponsor-request.js
exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  const { categoryId, partnerName, contactEmail } = JSON.parse(event.body || '{}');

  // Simple validation
  if (!categoryId || !partnerName || !contactEmail) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Missing required fields' })
    };
  }

  console.log('Received sponsor request:', { categoryId, partnerName, contactEmail });

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Sponsorship request submitted successfully!' })
  };
};
