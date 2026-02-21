import express from 'express';
import User from '../models/User.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Subscribe to plan
router.post('/subscribe', protect, async (req, res) => {
  try {
    const { plan, billingCycle } = req.body; // plan: 'plus' or 'pro', billingCycle: 'monthly' or 'yearly'
    
    if (!['plus', 'pro'].includes(plan)) {
      return res.status(400).json({ message: 'Noto\'g\'ri tarif' });
    }

    const user = await User.findById(req.user._id);
    
    // Calculate expiry date
    const expiryDate = new Date();
    if (billingCycle === 'yearly') {
      expiryDate.setFullYear(expiryDate.getFullYear() + 1);
    } else {
      expiryDate.setMonth(expiryDate.getMonth() + 1);
    }

    user.subscription = plan;
    user.subscriptionExpiry = expiryDate;
    await user.save();

    res.json({
      message: 'Obuna muvaffaqiyatli faollashtirildi',
      subscription: user.subscription,
      expiryDate: user.subscriptionExpiry
    });
  } catch (error) {
    res.status(500).json({ message: 'Server xatosi', error: error.message });
  }
});

// Cancel subscription
router.post('/cancel', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    
    // Don't immediately cancel, let it expire
    res.json({
      message: 'Obuna bekor qilindi. Amal qilish muddati tugaguncha foydalanishingiz mumkin.',
      expiryDate: user.subscriptionExpiry
    });
  } catch (error) {
    res.status(500).json({ message: 'Server xatosi', error: error.message });
  }
});

// Check subscription status
router.get('/status', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    
    res.json({
      subscription: user.subscription,
      expiryDate: user.subscriptionExpiry,
      isActive: user.hasActiveSubscription()
    });
  } catch (error) {
    res.status(500).json({ message: 'Server xatosi', error: error.message });
  }
});

export default router;
