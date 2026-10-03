const express = require('express');
const {
  createArtist,
  getAllArtists,
  getArtistById,
  updateArtist,
  deleteArtist,
} = require('../controllers/artistController');
const { protect } = require('../middleware/authMiddleware');
const requireRole = require('../middleware/requireRole');
const validateRequest = require('../middleware/validateRequest');
const {
  artistCreateBody,
  artistUpdateBody,
  artistListQuery,
  idParams,
} = require('../validators/requestSchemas');

const router = express.Router();

// Public routes
router.get('/', validateRequest(artistListQuery, 'query'), getAllArtists);
router.get('/:id', validateRequest(idParams, 'params'), getArtistById);

router.post('/', protect, requireRole('admin'), validateRequest(artistCreateBody, 'body'), createArtist);
router.put(
  '/:id',
  protect,
  requireRole('admin'),
  validateRequest(idParams, 'params'),
  validateRequest(artistUpdateBody, 'body'),
  updateArtist
);
router.delete('/:id', protect, requireRole('admin'), validateRequest(idParams, 'params'), deleteArtist);

module.exports = router;