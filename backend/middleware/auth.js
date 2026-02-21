import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  try {
    let token;
    
    if (req.headers.authorization?.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({ message: 'Avtorizatsiya talab qilinadi' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token yaroqsiz' });
  }
};

export const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Admin huquqi talab qilinadi' });
  }
};

export const checkSocialMedia = async (req, res, next) => {
  const user = req.user;
  
  if (!user.socialMediaVerified.instagram || 
      !user.socialMediaVerified.telegram || 
      !user.socialMediaVerified.youtube) {
    return res.status(403).json({ 
      message: 'Ijtimoiy tarmoqlarga obuna bo\'lish talab qilinadi',
      socialMedia: user.socialMediaVerified
    });
  }
  
  next();
};
