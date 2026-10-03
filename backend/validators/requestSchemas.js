const { z } = require('zod');

const objectId = z.string().regex(/^[a-f\d]{24}$/i, 'Invalid identifier');
const email = z.string().trim().email().max(254).transform((value) => value.toLowerCase());
const password = z.string().min(6).max(128);
const categories = ['Basic', 'Bridal', 'Arabic', 'Festival', 'Floral'];
const handSizes = ['small', 'medium', 'large'];

const registerBody = z.object({
  fullName: z.string().trim().min(1).max(100),
  email,
  password,
}).strict();

const loginBody = z.object({
  email,
  password,
}).strict();

const artistFields = {
  name: z.string().trim().min(1).max(100),
  phone: z.string().trim().min(5).max(30),
  location: z.string().trim().min(1).max(150),
  designTypes: z.array(z.enum(categories)).min(1),
  priceRange: z.object({
    min: z.number().finite().nonnegative(),
    max: z.number().finite().nonnegative(),
  }).strict().refine(({ min, max }) => min <= max),
  sampleImages: z.array(z.string().url()).max(20).optional(),
  rating: z.number().min(0).max(5).optional(),
  availability: z.boolean().optional(),
};

const artistCreateBody = z.object(artistFields).strict();
const artistUpdateBody = z.object(artistFields).partial().strict()
  .refine((body) => Object.keys(body).length > 0);

const designFields = {
  designName: z.string().trim().min(1).max(120),
  category: z.enum(categories),
  imageURL: z.string().url().max(2048),
  suitableHandSize: z.enum(handSizes),
  basePrice: z.number().finite().nonnegative(),
};

const designCreateBody = z.object(designFields).strict();
const designUpdateBody = z.object(designFields).partial().strict()
  .refine((body) => Object.keys(body).length > 0);

const bookingBody = z.object({
  artistId: objectId,
  designId: objectId,
  bookingDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/)
    .refine((value) => {
      const date = new Date(`${value}T00:00:00.000Z`);
      return !Number.isNaN(date.valueOf()) && date.toISOString().slice(0, 10) === value;
    }),
  time: z.string().regex(/^(?:[01]\d|2[0-3]):[0-5]\d$/),
  address: z.string().trim().min(1).max(500),
  numberOfPeople: z.coerce.number().int().min(1).max(50),
  occasion: z.enum(['normal', 'wedding']).default('normal'),
}).strict();

const bookingStatusBody = z.object({
  bookingStatus: z.enum(['pending', 'confirmed', 'cancelled']),
}).strict();

const paymentBody = z.object({
  bookingId: objectId,
}).strict();

const idParams = z.object({ id: objectId });
const bookingIdParams = z.object({ bookingId: objectId });
const suggestionQuery = z.object({ handSize: z.enum(handSizes) }).strict();
const artistListQuery = z.object({
  location: z.string().trim().min(1).max(100).optional(),
  designType: z.enum(categories).optional(),
  page: z.coerce.number().int().min(1).optional(),
  limit: z.coerce.number().int().min(1).max(100).optional(),
}).strict();
const designListQuery = z.object({
  category: z.enum(categories).optional(),
  handSize: z.enum(handSizes).optional(),
}).strict();

module.exports = {
  registerBody,
  loginBody,
  artistCreateBody,
  artistUpdateBody,
  designCreateBody,
  designUpdateBody,
  bookingBody,
  bookingStatusBody,
  paymentBody,
  idParams,
  bookingIdParams,
  suggestionQuery,
  artistListQuery,
  designListQuery,
};
