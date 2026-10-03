const { test } = require('node:test');
const assert = require('node:assert/strict');
const request = require('supertest');
const {
  testApp,
  createUser,
  createArtist,
} = require('./helpers/testSetup');

test('registers, rejects a duplicate email, and logs in', async () => {
  const app = testApp();
  const registration = {
    fullName: 'Fresh User',
    email: 'fresh@example.com',
    password: 'password-123',
  };

  const registered = await request(app).post('/api/auth/register').send(registration);
  assert.equal(registered.status, 201);
  assert.ok(registered.body.token);

  const duplicate = await request(app).post('/api/auth/register').send(registration);
  assert.equal(duplicate.status, 409);
  assert.equal(duplicate.body.errorCode, 'EMAIL_ALREADY_EXISTS');

  const loggedIn = await request(app).post('/api/auth/login').send({
    email: registration.email,
    password: registration.password,
  });
  assert.equal(loggedIn.status, 200);
  assert.ok(loggedIn.body.token);

  const invalidPassword = await request(app).post('/api/auth/login').send({
    email: registration.email,
    password: 'wrong-password',
  });
  assert.equal(invalidPassword.status, 401);
  assert.equal(invalidPassword.body.errorCode, 'INVALID_CREDENTIALS');
});

test('rejects malformed auth input and unauthenticated or invalid-token requests', async () => {
  const app = testApp();
  const invalidInput = await request(app).post('/api/auth/register').send({
    fullName: '',
    email: 'not-an-email',
    password: 'x',
  });
  assert.equal(invalidInput.status, 400);
  assert.equal(invalidInput.body.errorCode, 'VALIDATION_ERROR');

  const missingToken = await request(app).get('/api/bookings/user');
  assert.equal(missingToken.status, 401);
  assert.equal(missingToken.body.errorCode, 'UNAUTHENTICATED');

  const invalidToken = await request(app)
    .get('/api/bookings/user')
    .set('Authorization', 'Bearer invalid.token');
  assert.equal(invalidToken.status, 401);
  assert.equal(invalidToken.body.errorCode, 'INVALID_TOKEN');

  const invalidId = await request(app).get('/api/artists/not-an-object-id');
  assert.equal(invalidId.status, 400);
  assert.equal(invalidId.body.errorCode, 'VALIDATION_ERROR');
});

test('allows local frontend origins and rejects other browser origins with a standard error', async () => {
  const app = testApp();
  const allowed = await request(app)
    .get('/api/artists')
    .set('Origin', 'http://127.0.0.1:5173');
  assert.equal(allowed.status, 200);
  assert.equal(allowed.headers['access-control-allow-origin'], 'http://127.0.0.1:5173');

  const rejected = await request(app)
    .get('/api/artists')
    .set('Origin', 'https://not-allowed.example');
  assert.equal(rejected.status, 403);
  assert.equal(rejected.body.errorCode, 'CORS_FORBIDDEN');
});

test('allows admin operations and rejects the same request from a normal user', async () => {
  const app = testApp();
  const artist = await createArtist();
  const normalUser = await createUser('user', 'normal@example.com');
  const admin = await createUser('admin', 'admin@example.com');

  const forbidden = await request(app)
    .put(`/api/artists/${artist._id}`)
    .set('Authorization', `Bearer ${normalUser.token}`)
    .send({ location: 'Updated City' });
  assert.equal(forbidden.status, 403);
  assert.equal(forbidden.body.errorCode, 'FORBIDDEN');

  const allowed = await request(app)
    .put(`/api/artists/${artist._id}`)
    .set('Authorization', `Bearer ${admin.token}`)
    .send({ location: 'Updated City' });
  assert.equal(allowed.status, 200);
  assert.equal(allowed.body.data.location, 'Updated City');

  const adminList = await request(app)
    .get('/api/bookings')
    .set('Authorization', `Bearer ${admin.token}`);
  assert.equal(adminList.status, 200);
});
