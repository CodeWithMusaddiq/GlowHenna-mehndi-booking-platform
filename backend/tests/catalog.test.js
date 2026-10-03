const { test } = require('node:test');
const assert = require('node:assert/strict');
const request = require('supertest');
const {
  testApp,
  createUser,
  createArtist,
  createDesign,
} = require('./helpers/testSetup');

test('browses filtered artists and designs and validates admin create input', async () => {
  const app = testApp();
  const artist = await createArtist({ location: 'City [West]', rating: 4.8 });
  const design = await createDesign({ category: 'Bridal', suitableHandSize: 'large' });

  const artistResults = await request(app)
    .get('/api/artists')
    .query({ location: '[West]', designType: 'Basic', page: '1', limit: '10' });
  assert.equal(artistResults.status, 200);
  assert.equal(artistResults.body.count, 1);
  assert.equal(artistResults.body.data[0]._id, artist.id);

  const designResults = await request(app)
    .get('/api/designs')
    .query({ category: 'Bridal', handSize: 'large' });
  assert.equal(designResults.status, 200);
  assert.equal(designResults.body.data[0]._id, design.id);

  const { token } = await createUser('admin', 'catalog-admin@example.com');
  const createdDesign = await request(app)
    .post('/api/designs')
    .set('Authorization', `Bearer ${token}`)
    .send({
      designName: 'New Design',
      category: 'Arabic',
      imageURL: 'https://example.com/new-design.jpg',
      suitableHandSize: 'medium',
      basePrice: 250,
    });
  assert.equal(createdDesign.status, 201);

  const invalidArtist = await request(app)
    .post('/api/artists')
    .set('Authorization', `Bearer ${token}`)
    .send({ name: 'Incomplete' });
  assert.equal(invalidArtist.status, 400);
  assert.equal(invalidArtist.body.errorCode, 'VALIDATION_ERROR');
});

test('proxies Unsplash suggestions without exposing the access key to the browser', async () => {
  const app = testApp();
  const originalKey = process.env.UNSPLASH_ACCESS_KEY;
  const originalFetch = global.fetch;
  process.env.UNSPLASH_ACCESS_KEY = 'test-only-key';
  let calledUrl;
  let calledHeaders;

  global.fetch = async (url, options) => {
    calledUrl = url.toString();
    calledHeaders = options.headers;
    return {
      ok: true,
      json: async () => ({
        results: [{
          urls: { regular: 'https://images.example/henna.jpg' },
          alt_description: null,
        }],
      }),
    };
  };

  try {
    const response = await request(app)
      .get('/api/designs/suggestions')
      .query({ handSize: 'small' });

    assert.equal(response.status, 200);
    assert.deepEqual(response.body.data, [{
      url: 'https://images.example/henna.jpg',
      alt: 'Henna design suggestion',
    }]);
    assert.match(calledUrl, /minimal\+henna\+design\+hand/);
    assert.equal(calledHeaders.Authorization, 'Client-ID test-only-key');
    assert.equal(JSON.stringify(response.body).includes('test-only-key'), false);
  } finally {
    global.fetch = originalFetch;
    if (originalKey === undefined) delete process.env.UNSPLASH_ACCESS_KEY;
    else process.env.UNSPLASH_ACCESS_KEY = originalKey;
  }
});
