import express from 'express';
import User from '../models/User.js';
import Video from '../models/Video.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Get profile
router.get('/profile', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .select('-password')
      .populate('favorites')
      .populate('watchHistory.video');
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server xatosi', error: error.message });
  }
});

// Add to favorites
router.post('/favorites/:videoId', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    
    if (!user.favorites.includes(req.params.videoId)) {
      user.favorites.push(req.params.videoId);
      await user.save();
    }

    res.json({ message: 'Saqlanganlarga qo\'shildi' });
  } catch (error) {
    res.status(500).json({ message: 'Server xatosi', error: error.message });
  }
});

// Remove from favorites
router.delete('/favorites/:videoId', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.favorites = user.favorites.filter(id => id.toString() !== req.params.videoId);
    await user.save();

    res.json({ message: 'Saqlananlardan o\'chirildi' });
  } catch (error) {
    res.status(500).json({ message: 'Server xatosi', error: error.message });
  }
});

// Update watch progress
router.post('/progress/:videoId', protect, async (req, res) => {
  try {
    const { progress } = req.body;
    const user = await User.findById(req.user._id);

    const existingIndex = user.watchHistory.findIndex(
      item => item.video.toString() === req.params.videoId
    );

    if (existingIndex > -1) {
      user.watchHistory[existingIndex].progress = progress;
      user.watchHistory[existingIndex].lastWatched = new Date();
    } else {
      user.watchHistory.push({
        video: req.params.videoId,
        progress,
        lastWatched: new Date()
      });
    }

    await user.save();
    res.json({ message: 'Progress saqlandi' });
  } catch (error) {
    res.status(500).json({ message: 'Server xatosi', error: error.message });
  }
});

export default router;
