import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  subscription: {
    type: String,
    enum: ['free', 'plus', 'pro'],
    default: 'free'
  },
  subscriptionExpiry: {
    type: Date,
    default: null
  },
  socialMediaVerified: {
    instagram: { type: Boolean, default: false },
    telegram: { type: Boolean, default: false },
    youtube: { type: Boolean, default: false }
  },
  favorites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Video'
  }],
  watchHistory: [{
    video: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Video'
    },
    progress: Number,
    lastWatched: Date
  }],
  isEmailVerified: {
    type: Boolean,
    default: false
  },
  completedCourses: [{
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course'
    },
    completedAt: Date,
    certificateUrl: String
  }]
}, { timestamps: true });

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.hasActiveSubscription = function() {
  if (this.subscription === 'free') return true;
  if (!this.subscriptionExpiry) return false;
  return this.subscriptionExpiry > new Date();
};

userSchema.methods.canAccessTier = function(tier) {
  const tierLevels = { free: 0, plus: 1, pro: 2 };
  const userLevel = tierLevels[this.subscription] || 0;
  const requiredLevel = tierLevels[tier] || 0;
  return userLevel >= requiredLevel && this.hasActiveSubscription();
};

export default mongoose.model('User', userSchema);
