const { before, after, beforeEach } = require('node:test');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const User = require('../../models/User');
const Artist = require('../../models/Artist');
const Design = require('../../models/Design');
const Booking = require('../../models/Booking');
const Payment = require('../../models/Payment');

process.env.JWT_SECRET = 'test-only-jwt-secret-that-is-at-least-32-characters';

let mongo;
let app;

before(async () => {
  mongo = await MongoMemoryServer.create();
  await mongoose.connect(mongo.getUri());
  app = require('../../server');
  await Promise.all([User.init(), Artist.init(), Design.init(), Booking.init(), Payment.init()]);
});

beforeEach(async () => {
  await Promise.all([
    User.deleteMany({}),
    Artist.deleteMany({}),
    Design.deleteMany({}),
    Booking.deleteMany({}),
    Payment.deleteMany({}),
  ]);
});

after(async () => {
  await mongoose.disconnect();
  if (mongo) await mongo.stop();
});

const testApp = () => app;

const createUser = async (role = 'user', email = `${role}-${Date.now()}@example.com`) => {
  const user = await User.create({
    fullName: `${role} tester`,
    email,
    password: 'test-password-123',
    role,
  });
  const jwt = require('jsonwebtoken');
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  return { user, token };
};

const createArtist = (overrides = {}) => Artist.create({
  name: 'Test Artist',
  phone: '1234567890',
  location: 'Test City',
  designTypes: ['Basic'],
  priceRange: { min: 100, max: 500 },
  ...overrides,
});

const createDesign = (overrides = {}) => Design.create({
  designName: 'Test Design',
  category: 'Basic',
  imageURL: 'https://example.com/design.jpg',
  suitableHandSize: 'medium',
  basePrice: 100,
  ...overrides,
});

const bookingPayload = (artistId, designId, overrides = {}) => ({
  artistId: artistId.toString(),
  designId: designId.toString(),
  bookingDate: '2040-04-20',
  time: '10:00',
  address: '123 Test Street',
  numberOfPeople: 1,
  occasion: 'normal',
  ...overrides,
});

module.exports = {
  testApp,
  createUser,
  createArtist,
  createDesign,
  bookingPayload,
};
