const autocannon = require('autocannon');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { once } = require('node:events');
const User = require('../models/User');
const Artist = require('../models/Artist');
const Design = require('../models/Design');
const Booking = require('../models/Booking');
const Payment = require('../models/Payment');

process.env.JWT_SECRET = 'local-performance-only-secret-with-at-least-32-characters';

const benchmark = (options) => new Promise((resolve, reject) => {
  autocannon(options, (error, result) => {
    if (error) reject(error);
    else resolve(result);
  });
});

const summarize = (result) => {
  const failed = result.non2xx + result.errors + result.timeouts;
  return {
    requests: result.requests.total,
    averageLatencyMs: result.latency.average,
    p97_5LatencyMs: result.latency.p97_5,
    errorRatePercent: Number(((failed / result.requests.total) * 100).toFixed(2)),
  };
};

const main = async () => {
  const mongo = await MongoMemoryServer.create();
  let server;

  try {
    await mongoose.connect(mongo.getUri());
    await Promise.all([User.init(), Artist.init(), Design.init(), Booking.init(), Payment.init()]);

    const artists = await Artist.insertMany(Array.from({ length: 100 }, (_, index) => ({
      name: `Performance Artist ${index}`,
      phone: `555${String(index).padStart(7, '0')}`,
      location: `City ${index % 10}`,
      designTypes: ['Basic', 'Bridal'],
      priceRange: { min: 100, max: 500 },
      rating: (index % 6) * 0.9,
    })));
    const designs = await Design.insertMany(Array.from({ length: 100 }, (_, index) => ({
      designName: `Performance Design ${index}`,
      category: ['Basic', 'Bridal', 'Arabic', 'Festival', 'Floral'][index % 5],
      imageURL: `https://example.com/design-${index}.jpg`,
      suitableHandSize: ['small', 'medium', 'large'][index % 3],
      basePrice: 100 + index,
    })));
    const user = await User.create({
      fullName: 'Performance User',
      email: 'performance@example.com',
      password: 'performance-password',
    });
    const jwt = require('jsonwebtoken');
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    const app = require('../server');
    server = app.listen(0);
    await once(server, 'listening');
    const url = `http://127.0.0.1:${server.address().port}`;
    const common = {
      connections: 5,
      amount: 100,
      pipelining: 1,
      overallRate: 50,
    };

    const artistsResult = await benchmark({ ...common, url, title: 'GET /api/artists', method: 'GET', path: '/api/artists' });
    const designsResult = await benchmark({ ...common, url, title: 'GET /api/designs', method: 'GET', path: '/api/designs' });

    const bookingRequests = Array.from({ length: 20 }, (_, index) => ({
      method: 'POST',
      path: '/api/bookings',
      headers: {
        authorization: `Bearer ${token}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        artistId: artists[0]._id.toString(),
        designId: designs[0]._id.toString(),
        bookingDate: new Date(Date.now() + (index + 5) * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
        time: '10:00',
        address: '123 Performance Test Street',
        numberOfPeople: 1,
        occasion: 'normal',
      }),
    }));
    const bookingsResult = await benchmark({
      url,
      title: 'POST /api/bookings',
      connections: 1,
      amount: bookingRequests.length,
      pipelining: 1,
      requests: bookingRequests,
    });

    const output = {
      date: new Date().toISOString(),
      environment: {
        platform: process.platform,
        node: process.version,
        mongo: 'mongodb-memory-server (local ephemeral instance)',
      },
      dataset: { artists: artists.length, designs: designs.length, bookingRequests: bookingRequests.length },
      endpoints: {
        'GET /api/artists': summarize(artistsResult),
        'GET /api/designs': summarize(designsResult),
        'POST /api/bookings': summarize(bookingsResult),
      },
    };
    console.log(JSON.stringify(output, null, 2));
  } finally {
    if (server) {
      await new Promise((resolve, reject) => server.close((error) => (error ? reject(error) : resolve())));
    }
    await mongoose.disconnect();
    await mongo.stop();
  }
};

main().catch((error) => {
  console.error('Performance run failed', error.name);
  process.exitCode = 1;
});
