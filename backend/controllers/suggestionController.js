const ApiError = require('../middleware/apiError');

const getDesignSuggestions = async (req, res, next) => {
  const accessKey = process.env.UNSPLASH_ACCESS_KEY;
  if (!accessKey) {
    return next(new ApiError(503, 'Suggestion service is not configured', 'SERVICE_UNAVAILABLE'));
  }

  const query = req.query.handSize === 'small'
    ? 'minimal henna design hand'
    : req.query.handSize === 'large'
      ? 'bridal henna full hand'
      : 'mehndi design hand';

  try {
    const url = new URL('https://api.unsplash.com/search/photos');
    url.searchParams.set('query', query);
    url.searchParams.set('per_page', '9');
    const response = await fetch(url, {
      headers: { Authorization: `Client-ID ${accessKey}` },
      signal: AbortSignal.timeout(5000),
    });

    if (!response.ok) {
      throw new ApiError(502, 'Suggestion service is temporarily unavailable', 'UPSTREAM_ERROR');
    }

    const result = await response.json();
    res.status(200).json({
      success: true,
      data: result.results.map((image) => ({
        url: image.urls.regular,
        alt: image.alt_description || 'Henna design suggestion',
      })),
    });
  } catch (error) {
    if (error instanceof ApiError) {
      return next(error);
    }
    next(new ApiError(502, 'Suggestion service is temporarily unavailable', 'UPSTREAM_ERROR'));
  }
};

module.exports = { getDesignSuggestions };
