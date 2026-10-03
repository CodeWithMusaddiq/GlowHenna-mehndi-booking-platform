const { test } = require('node:test');
const assert = require('node:assert/strict');
const request = require('supertest');
const Booking = require('../models/Booking');
const {
  testApp,
  createUser,
  createArtist,
  createDesign,
  bookingPayload,
} = require('./helpers/testSetup');

test('creates a booking and prevents two concurrent requests from taking the same slot', async () => {
  const app = testApp();
  const { token } = await createUser();
  const artist = await createArtist();
  const design = await createDesign();

  const created = await request(app)
    .post('/api/bookings')
    .set('Authorization', `Bearer ${token}`)
    .send(bookingPayload(artist._id, design._id));
  assert.equal(created.status, 201);
  assert.equal(created.body.data.artistId.name, artist.name);
  assert.equal(created.body.data.totalPrice, design.basePrice);

  const conflictDate = '2040-05-21';
  const payload = bookingPayload(artist._id, design._id, { bookingDate: conflictDate });
  const results = await Promise.all([
    request(app).post('/api/bookings').set('Authorization', `Bearer ${token}`).send(payload),
    request(app).post('/api/bookings').set('Authorization', `Bearer ${token}`).send(payload),
  ]);

  assert.deepEqual(results.map((result) => result.status).sort(), [201, 409]);
  const conflict = results.find((result) => result.status === 409);
  assert.equal(conflict.body.errorCode, 'BOOKING_SLOT_TAKEN');
});

test('validates booking input and keeps cancelled slots available', async () => {
  const app = testApp();
  const { user, token } = await createUser();
  const artist = await createArtist();
  const design = await createDesign();
  const payload = bookingPayload(artist._id, design._id);

  const invalid = await request(app)
    .post('/api/bookings')
    .set('Authorization', `Bearer ${token}`)
    .send({ ...payload, numberOfPeople: 0 });
  assert.equal(invalid.status, 400);
  assert.equal(invalid.body.errorCode, 'VALIDATION_ERROR');

  const created = await request(app)
    .post('/api/bookings')
    .set('Authorization', `Bearer ${token}`)
    .send(payload);
  const cancelled = await request(app)
    .put(`/api/bookings/${created.body.data._id}`)
    .set('Authorization', `Bearer ${token}`)
    .send({ bookingStatus: 'cancelled' });
  assert.equal(cancelled.status, 200);

  const replacement = await request(app)
    .post('/api/bookings')
    .set('Authorization', `Bearer ${token}`)
    .send(payload);
  assert.equal(replacement.status, 201);

  const stored = await require('../models/Booking').find({ userId: user._id });
  assert.equal(stored.length, 2);
});

test('treats legacy bookings without a status as active for slot uniqueness', async () => {
  const app = testApp();
  const { user, token } = await createUser();
  const artist = await createArtist();
  const design = await createDesign();

  await Booking.collection.insertOne({
    userId: user._id,
    artistId: artist._id,
    designId: design._id,
    bookingDate: new Date('2040-06-01T00:00:00.000Z'),
    time: '10:00',
    address: 'Legacy booking address',
    numberOfPeople: 1,
    totalPrice: 100,
  });

  const response = await request(app)
    .post('/api/bookings')
    .set('Authorization', `Bearer ${token}`)
    .send(bookingPayload(artist._id, design._id, { bookingDate: '2040-06-01' }));
  assert.equal(response.status, 409);
  assert.equal(response.body.errorCode, 'BOOKING_SLOT_TAKEN');
});

test('prevents a user from reading another user’s booking', async () => {
  const app = testApp();
  const owner = await createUser('user', 'booking-owner@example.com');
  const otherUser = await createUser('user', 'booking-other@example.com');
  const artist = await createArtist();
  const design = await createDesign();

  const created = await request(app)
    .post('/api/bookings')
    .set('Authorization', `Bearer ${owner.token}`)
    .send(bookingPayload(artist._id, design._id));
  const response = await request(app)
    .get(`/api/bookings/${created.body.data._id}`)
    .set('Authorization', `Bearer ${otherUser.token}`);

  assert.equal(response.status, 403);
  assert.equal(response.body.errorCode, 'FORBIDDEN');
});
