const express = require('express');
const {
  createArtist,
  getAllArtists,
  getArtistById,
  updateArtist,
  deleteArtist,
} = require('../controllers/artistController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Public routes
router.get('/', getAllArtists);
router.get('/:id', getArtistById);

// Protected routes (Admin only - role check happens in controller)
router.post('/', protect, createArtist);
router.put('/:id', protect, updateArtist);
router.delete('/:id', protect, deleteArtist);

module.exports = router;