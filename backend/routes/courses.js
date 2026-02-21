import express from 'express';
import Course from '../models/Course.js';
import Video from '../models/Video.js';
import { protect, checkSocialMedia } from '../middleware/auth.js';

const router = express.Router();

// Get all courses
router.get('/', async (req, res) => {
  try {
    const { category, search } = req.query;
    let query = { isPublished: true };

    if (category && category !== 'all') {
      query.category = category;
    }

    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }

    const courses = await Course.find(query).populate('instructor', 'name');
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Server xatosi', error: error.message });
  }
});

// Get single course
router.get('/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate('instructor', 'name')
      .populate('modules.videos');
    
    if (!course) {
      return res.status(404).json({ message: 'Kurs topilmadi' });
    }

    res.json(course);
  } catch (error) {
    res.status(500).json({ message: 'Server xatosi', error: error.message });
  }
});

// Get video (requires auth and social media verification)
router.get('/video/:id', protect, checkSocialMedia, async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    
    if (!video) {
      return res.status(404).json({ message: 'Video topilmadi' });
    }

    // Check tier access
    if (!req.user.canAccessTier(video.tier)) {
      return res.status(403).json({ 
        message: 'Bu videoni ko\'rish uchun obuna bo\'lishingiz kerak',
        requiredTier: video.tier,
        currentTier: req.user.subscription
      });
    }

    // Increment views
    video.views += 1;
    await video.save();

    res.json(video);
  } catch (error) {
    res.status(500).json({ message: 'Server xatosi', error: error.message });
  }
});

// Like video
router.post('/video/:id/like', protect, async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    
    if (!video) {
      return res.status(404).json({ message: 'Video topilmadi' });
    }

    const likeIndex = video.likes.indexOf(req.user._id);
    
    if (likeIndex > -1) {
      video.likes.splice(likeIndex, 1);
    } else {
      video.likes.push(req.user._id);
    }

    await video.save();
    res.json({ likes: video.likes.length, isLiked: likeIndex === -1 });
  } catch (error) {
    res.status(500).json({ message: 'Server xatosi', error: error.message });
  }
});

export default router;
