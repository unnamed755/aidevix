import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['react', 'nextjs', 'typescript', 'html-css', 'tailwind', 'react-native']
  },
  thumbnail: String,
  modules: [{
    title: String,
    order: Number,
    videos: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Video'
    }]
  }],
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  totalDuration: String,
  totalLessons: Number,
  rating: {
    type: Number,
    default: 0
  },
  students: {
    type: Number,
    default: 0
  },
  isPublished: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

export default mongoose.model('Course', courseSchema);
