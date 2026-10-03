const { test } = require('node:test');
const assert = require('node:assert/strict');
const request = require('supertest');
const {
  testApp,
  createUser,
  createArtist,
  createDesign,
  bookingPayload,
} = require('./helpers/testSetup');

test('simulates payment and restricts payment details to the booking owner or an admin', async () => {
  const app = testApp();
  const owner = await createUser('user', 'payment-owner@example.com');
  const otherUser = await createUser('user', 'payment-other@example.com');
  const admin = await createUser('admin', 'payment-admin@example.com');
  const artist = await createArtist();
  const design = await createDesign();

  const bookingResponse = await request(app)
    .post('/api/bookings')
    .set('Authorization', `Bearer ${owner.token}`)
    .send(bookingPayload(artist._id, design._id));
  assert.equal(bookingResponse.status, 201);

  const bookingId = bookingResponse.body.data._id;
  const paymentResponse = await request(app)
    .post('/api/payment')
    .set('Authorization', `Bearer ${owner.token}`)
    .send({ bookingId });
  assert.equal(paymentResponse.status, 201);
  assert.equal(paymentResponse.body.data.amount, bookingResponse.body.data.totalPrice);

  const ownerRead = await request(app)
    .get(`/api/payment/${bookingId}`)
    .set('Authorization', `Bearer ${owner.token}`);
  assert.equal(ownerRead.status, 200);

  const forbiddenRead = await request(app)
    .get(`/api/payment/${bookingId}`)
    .set('Authorization', `Bearer ${otherUser.token}`);
  assert.equal(forbiddenRead.status, 403);

  const adminRead = await request(app)
    .get(`/api/payment/${bookingId}`)
    .set('Authorization', `Bearer ${admin.token}`);
  assert.equal(adminRead.status, 200);

  const updatedBooking = await require('../models/Booking').findById(bookingId);
  assert.equal(updatedBooking.paymentStatus, 'paid');

  const invalidBookingId = await request(app)
    .get('/api/payment/not-an-object-id')
    .set('Authorization', `Bearer ${owner.token}`);
  assert.equal(invalidBookingId.status, 400);
});
