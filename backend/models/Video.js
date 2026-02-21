import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  youtubeId: {
    type: String,
    required: true
  },
  duration: String,
  thumbnail: String,
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  },
  module: String,
  order: Number,
  tier: {
    type: String,
    enum: ['free', 'plus', 'pro'],
    default: 'free'
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  views: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

export default mongoose.model('Video', videoSchema);
