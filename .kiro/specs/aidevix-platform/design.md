# Design Document: AIDEVIX Platform

## Overview

AIDEVIX is a full-stack online education platform built with a React.js frontend and Node.js/Express.js backend. The system architecture follows a RESTful API design pattern with JWT-based authentication, MongoDB for data persistence, and cloud storage (Cloudinary/AWS S3) for media assets. The platform supports role-based access control (User and Admin), video streaming with progress tracking, social media verification, and comprehensive content management capabilities.

The design emphasizes security (HTTPS, JWT, bcrypt, rate limiting), performance (lazy loading, code splitting, CDN, caching), and scalability (Docker containerization, Nginx reverse proxy, CI/CD pipelines). The platform will initially operate on a social media subscription model before transitioning to a paid model.

## Architecture

### System Architecture

The platform follows a three-tier architecture:

1. **Presentation Layer (Frontend)**
   - React.js with React Router for navigation
   - Redux Toolkit for state management
   - Tailwind CSS for styling
   - Responsive design for mobile, tablet, and desktop

2. **Application Layer (Backend)**
   - Node.js with Express.js framework
   - RESTful API endpoints
   - JWT authentication middleware
   - Role-based authorization middleware
   - Rate limiting middleware
   - File upload handling (Multer)

3. **Data Layer**
   - MongoDB for primary data storage
   - Cloudinary or AWS S3 for video and image storage
   - Redis (optional) for caching and session management

### Deployment Architecture

```
[Client Browser] 
    ↓ HTTPS
[Nginx Reverse Proxy]
    ↓
[Docker Container: Frontend (React)]
[Docker Container: Backend (Node.js)]
    ↓
[MongoDB Database]
[Cloud Storage (Cloudinary/S3)]
```

### Authentication Flow

1. User submits credentials → Backend validates → Issues JWT (15 min) + Refresh Token (7 days)
2. Client stores tokens (JWT in memory, Refresh Token in httpOnly cookie)
3. Client includes JWT in Authorization header for protected requests
4. Backend middleware validates JWT and extracts user/role information
5. When JWT expires, client uses Refresh Token to obtain new JWT
6. For 2FA-enabled admins: Additional TOTP verification required

## Components and Interfaces

### Frontend Components

#### 1. Authentication Components

**LoginForm**
- Input fields: email, password
- Submit handler: POST /api/auth/login
- Success: Store tokens, redirect to dashboard
- Error: Display validation messages

**RegisterForm**
- Input fields: name, email, password, confirmPassword
- Submit handler: POST /api/auth/register
- Success: Show email verification message
- Error: Display validation messages

**PasswordResetForm**
- Input fields: email (request) or newPassword (reset)
- Handlers: POST /api/auth/forgot-password, POST /api/auth/reset-password
- Success: Show confirmation message
- Error: Display validation messages

**SocialVerificationModal**
- Display: Instagram, Telegram, YouTube subscription prompts
- Checkboxes: User confirms subscriptions
- Submit handler: POST /api/users/verify-social
- Success: Grant video access, close modal

#### 2. Course Components

**CourseList**
- Props: courses[], filters, sortBy
- Display: Grid of CourseCard components
- Features: Pagination, infinite scroll
- Handlers: Filter change, sort change, search

**CourseCard**
- Props: course object (title, thumbnail, category, description, stats)
- Display: Thumbnail, title, category badge, view count, like count
- Click handler: Navigate to course detail page

**CourseDetail**
- Props: courseId
- Display: Course info, lesson list, enrollment button
- API: GET /api/courses/:id
- Features: Lesson navigation, progress indicator

**LessonList**
- Props: lessons[], completedLessons[]
- Display: List of lessons with completion checkmarks
- Click handler: Navigate to video player

#### 3. Video Player Components

**VideoPlayer**
- Props: videoUrl, lessonId, savedPosition
- Features: Play/pause, seek, volume, speed control (0.5x-2x), fullscreen
- Events: onProgress (save position), onComplete (mark lesson complete)
- API: POST /api/progress/update, POST /api/progress/complete

**VideoControls**
- Props: isPlaying, currentTime, duration, volume, playbackSpeed
- Display: Play/pause button, progress bar, volume slider, speed selector, fullscreen button
- Handlers: Toggle play, seek, adjust volume, change speed, toggle fullscreen

**LikeButton**
- Props: lessonId, isLiked, likeCount
- Display: Heart icon, like count
- Handler: POST /api/lessons/:id/like (toggle)

**FavoriteButton**
- Props: lessonId, isFavorited
- Display: Bookmark icon
- Handler: POST /api/users/favorites/:lessonId (toggle)

#### 4. User Profile Components

**ProfileView**
- Props: userId
- Display: Avatar, name, bio, stats (courses completed, watch time)
- Tabs: Watch History, Favorites, Completed Courses
- API: GET /api/users/profile

**ProfileEditForm**
- Input fields: name, bio, avatar upload
- Submit handler: PUT /api/users/profile
- Success: Update display, show confirmation

**PasswordChangeForm**
- Input fields: currentPassword, newPassword, confirmPassword
- Submit handler: PUT /api/users/change-password
- Success: Show confirmation, logout user

**WatchHistory**
- Display: List of recently watched videos with timestamps
- API: GET /api/users/watch-history
- Features: Clear history, remove individual items

**FavoritesList**
- Display: Grid of favorited videos
- API: GET /api/users/favorites
- Features: Remove from favorites, navigate to video

#### 5. Admin Components

**AdminDashboard**
- Display: Statistics cards (total users, active users, total courses, total views)
- Charts: User growth, video views over time, popular courses
- API: GET /api/admin/stats

**CourseManagement**
- Display: Table of all courses with edit/delete actions
- Features: Add new course, edit course, delete course, upload video
- API: GET /api/admin/courses, POST /api/admin/courses, PUT /api/admin/courses/:id, DELETE /api/admin/courses/:id

**CourseForm**
- Input fields: title, description, category, thumbnail upload
- Lesson management: Add/remove lessons, reorder lessons
- Submit handler: POST or PUT /api/admin/courses

**LessonForm**
- Input fields: title, description, video upload, duration
- Submit handler: POST /api/admin/lessons
- Video upload: Multipart form data to cloud storage

**ReelManagement**
- Display: Grid of Reels with edit/delete actions
- Features: Add new Reel, delete Reel
- API: GET /api/admin/reels, POST /api/admin/reels, DELETE /api/admin/reels/:id

**UserManagement**
- Display: Table of users with details and actions
- Features: View user details, deactivate account, reset password
- API: GET /api/admin/users, PUT /api/admin/users/:id

**HeroSectionEditor**
- Input fields: title, description, image upload, CTA button text/link
- Submit handler: PUT /api/admin/hero
- Preview: Live preview of hero section

#### 6. Common Components

**Navbar**
- Display: Logo, navigation links, search bar, user menu
- Conditional rendering: Show admin link for admin users
- Features: Responsive mobile menu, theme toggle

**SearchBar**
- Input field: Search query
- Handler: Debounced search API call
- API: GET /api/courses/search?q=query

**CategoryFilter**
- Display: List of categories (React, HTML, CSS, Tailwind, etc.)
- Handler: Filter courses by selected category

**ThemeToggle**
- Display: Sun/moon icon
- Handler: Toggle dark/light mode, save to localStorage

**NotificationBell**
- Display: Bell icon with unread count badge
- Dropdown: List of recent notifications
- API: GET /api/notifications, PUT /api/notifications/:id/read

### Backend API Endpoints

#### Authentication Endpoints

```
POST /api/auth/register
Body: { name, email, password }
Response: { message, userId }

POST /api/auth/login
Body: { email, password }
Response: { accessToken, refreshToken, user }

POST /api/auth/refresh
Body: { refreshToken }
Response: { accessToken }

POST /api/auth/logout
Headers: Authorization: Bearer <token>
Response: { message }

POST /api/auth/forgot-password
Body: { email }
Response: { message }

POST /api/auth/reset-password
Body: { resetToken, newPassword }
Response: { message }

POST /api/auth/verify-email
Body: { verificationToken }
Response: { message }

POST /api/auth/2fa/enable (Admin only)
Headers: Authorization: Bearer <token>
Response: { qrCode, secret }

POST /api/auth/2fa/verify
Body: { userId, token }
Response: { accessToken, refreshToken }
```

#### User Endpoints

```
GET /api/users/profile
Headers: Authorization: Bearer <token>
Response: { user }

PUT /api/users/profile
Headers: Authorization: Bearer <token>
Body: { name, bio, avatar }
Response: { user }

PUT /api/users/change-password
Headers: Authorization: Bearer <token>
Body: { currentPassword, newPassword }
Response: { message }

POST /api/users/verify-social
Headers: Authorization: Bearer <token>
Body: { instagram, telegram, youtube }
Response: { message, socialVerified: true }

GET /api/users/watch-history
Headers: Authorization: Bearer <token>
Response: { history: [] }

GET /api/users/favorites
Headers: Authorization: Bearer <token>
Response: { favorites: [] }

POST /api/users/favorites/:lessonId
Headers: Authorization: Bearer <token>
Response: { message }

DELETE /api/users/favorites/:lessonId
Headers: Authorization: Bearer <token>
Response: { message }
```

#### Course Endpoints

```
GET /api/courses
Query: ?category=React&sort=popular&page=1&limit=12
Response: { courses: [], totalPages, currentPage }

GET /api/courses/:id
Response: { course, lessons: [] }

GET /api/courses/search
Query: ?q=react hooks
Response: { results: [] }

POST /api/courses/:id/enroll
Headers: Authorization: Bearer <token>
Response: { message }
```

#### Lesson Endpoints

```
GET /api/lessons/:id
Headers: Authorization: Bearer <token>
Response: { lesson, videoUrl, progress }

POST /api/lessons/:id/like
Headers: Authorization: Bearer <token>
Response: { message, likeCount }

POST /api/lessons/:id/comments
Headers: Authorization: Bearer <token>
Body: { content }
Response: { comment }

GET /api/lessons/:id/comments
Response: { comments: [] }

PUT /api/lessons/:id/comments/:commentId
Headers: Authorization: Bearer <token>
Body: { content }
Response: { comment }

DELETE /api/lessons/:id/comments/:commentId
Headers: Authorization: Bearer <token>
Response: { message }
```

#### Progress Endpoints

```
POST /api/progress/update
Headers: Authorization: Bearer <token>
Body: { lessonId, position, duration }
Response: { message }

POST /api/progress/complete
Headers: Authorization: Bearer <token>
Body: { lessonId }
Response: { message, courseProgress }

GET /api/progress/course/:courseId
Headers: Authorization: Bearer <token>
Response: { completedLessons: [], percentage }
```

#### Certificate Endpoints

```
GET /api/certificates/course/:courseId
Headers: Authorization: Bearer <token>
Response: { certificate: { url, verificationCode, issuedDate } }

GET /api/certificates/download/:certificateId
Headers: Authorization: Bearer <token>
Response: PDF file
```

#### Reel Endpoints

```
GET /api/reels
Response: { reels: [] }

GET /api/reels/:id
Response: { reel }
```

#### Notification Endpoints

```
GET /api/notifications
Headers: Authorization: Bearer <token>
Response: { notifications: [], unreadCount }

PUT /api/notifications/:id/read
Headers: Authorization: Bearer <token>
Response: { message }

PUT /api/notifications/read-all
Headers: Authorization: Bearer <token>
Response: { message }
```

#### Blog Endpoints

```
GET /api/blog
Query: ?page=1&limit=10
Response: { posts: [], totalPages }

GET /api/blog/:slug
Response: { post }
```

#### Admin Endpoints

```
GET /api/admin/stats
Headers: Authorization: Bearer <token>, Role: admin
Response: { totalUsers, activeUsers, totalCourses, totalViews, userGrowth: [], popularCourses: [] }

GET /api/admin/courses
Headers: Authorization: Bearer <token>, Role: admin
Response: { courses: [] }

POST /api/admin/courses
Headers: Authorization: Bearer <token>, Role: admin
Body: FormData { title, description, category, thumbnail }
Response: { course }

PUT /api/admin/courses/:id
Headers: Authorization: Bearer <token>, Role: admin
Body: FormData { title, description, category, thumbnail }
Response: { course }

DELETE /api/admin/courses/:id
Headers: Authorization: Bearer <token>, Role: admin
Response: { message }

POST /api/admin/lessons
Headers: Authorization: Bearer <token>, Role: admin
Body: FormData { courseId, title, description, video, duration }
Response: { lesson }

PUT /api/admin/lessons/:id
Headers: Authorization: Bearer <token>, Role: admin
Body: FormData { title, description, video }
Response: { lesson }

DELETE /api/admin/lessons/:id
Headers: Authorization: Bearer <token>, Role: admin
Response: { message }

GET /api/admin/reels
Headers: Authorization: Bearer <token>, Role: admin
Response: { reels: [] }

POST /api/admin/reels
Headers: Authorization: Bearer <token>, Role: admin
Body: FormData { title, video, thumbnail }
Response: { reel }

DELETE /api/admin/reels/:id
Headers: Authorization: Bearer <token>, Role: admin
Response: { message }

GET /api/admin/users
Headers: Authorization: Bearer <token>, Role: admin
Response: { users: [] }

PUT /api/admin/users/:id
Headers: Authorization: Bearer <token>, Role: admin
Body: { isActive, role }
Response: { user }

PUT /api/admin/hero
Headers: Authorization: Bearer <token>, Role: admin
Body: FormData { title, description, image, ctaText, ctaLink }
Response: { hero }

GET /api/admin/blog
Headers: Authorization: Bearer <token>, Role: admin
Response: { posts: [] }

POST /api/admin/blog
Headers: Authorization: Bearer <token>, Role: admin
Body: { title, content, featuredImage, tags, slug }
Response: { post }

PUT /api/admin/blog/:id
Headers: Authorization: Bearer <token>, Role: admin
Body: { title, content, featuredImage, tags }
Response: { post }

DELETE /api/admin/blog/:id
Headers: Authorization: Bearer <token>, Role: admin
Response: { message }
```

### Middleware Components

#### authMiddleware
- Purpose: Verify JWT token and attach user to request
- Process: Extract token from Authorization header → Verify with JWT secret → Decode payload → Attach user to req.user
- Error handling: Return 401 if token invalid or expired

#### adminMiddleware
- Purpose: Verify user has admin role
- Process: Check req.user.role === 'admin'
- Error handling: Return 403 if not admin

#### rateLimitMiddleware
- Purpose: Prevent API abuse
- Configuration: 100 requests per 15 minutes per IP
- Error handling: Return 429 if limit exceeded

#### uploadMiddleware
- Purpose: Handle file uploads
- Configuration: Multer with memory storage or disk storage
- Validation: File type (video, image), file size limits
- Error handling: Return 400 if validation fails

#### errorMiddleware
- Purpose: Centralized error handling
- Process: Catch errors from routes → Format error response → Log errors
- Response: { error: message, statusCode }

## Data Models

### User Model

```javascript
{
  _id: ObjectId,
  name: String (required),
  email: String (required, unique, lowercase),
  password: String (required, hashed with bcrypt),
  role: String (enum: ['user', 'admin'], default: 'user'),
  avatar: String (URL),
  bio: String,
  isEmailVerified: Boolean (default: false),
  emailVerificationToken: String,
  passwordResetToken: String,
  passwordResetExpires: Date,
  socialVerified: Boolean (default: false),
  socialAccounts: {
    instagram: Boolean,
    telegram: Boolean,
    youtube: Boolean
  },
  twoFactorEnabled: Boolean (default: false),
  twoFactorSecret: String,
  isActive: Boolean (default: true),
  lastLogin: Date,
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes:**
- email (unique)
- role
- isActive

### Course Model

```javascript
{
  _id: ObjectId,
  title: String (required),
  description: String (required),
  category: String (required, enum: ['React', 'HTML', 'CSS', 'Tailwind', 'React Native', 'Next.js', 'TypeScript']),
  thumbnail: String (URL, required),
  instructor: ObjectId (ref: 'User'),
  isPaid: Boolean (default: false),
  price: Number (default: 0),
  totalLessons: Number (default: 0),
  totalDuration: Number (minutes, default: 0),
  viewCount: Number (default: 0),
  likeCount: Number (default: 0),
  enrollmentCount: Number (default: 0),
  isPublished: Boolean (default: true),
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes:**
- category
- isPaid
- isPublished
- viewCount (descending)
- createdAt (descending)

### Lesson Model

```javascript
{
  _id: ObjectId,
  courseId: ObjectId (ref: 'Course', required),
  title: String (required),
  description: String,
  videoUrl: String (required),
  duration: Number (seconds, required),
  order: Number (required),
  thumbnail: String (URL),
  viewCount: Number (default: 0),
  likeCount: Number (default: 0),
  isPublished: Boolean (default: true),
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes:**
- courseId
- order
- isPublished

### Progress Model

```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: 'User', required),
  lessonId: ObjectId (ref: 'Lesson', required),
  courseId: ObjectId (ref: 'Course', required),
  position: Number (seconds, default: 0),
  duration: Number (seconds),
  isCompleted: Boolean (default: false),
  completedAt: Date,
  lastWatchedAt: Date,
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes:**
- userId + lessonId (compound, unique)
- userId + courseId (compound)
- userId + lastWatchedAt (compound)

### Favorite Model

```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: 'User', required),
  lessonId: ObjectId (ref: 'Lesson', required),
  createdAt: Date
}
```

**Indexes:**
- userId + lessonId (compound, unique)
- userId

### Like Model

```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: 'User', required),
  lessonId: ObjectId (ref: 'Lesson', required),
  createdAt: Date
}
```

**Indexes:**
- userId + lessonId (compound, unique)
- lessonId

### Comment Model

```javascript
{
  _id: ObjectId,
  lessonId: ObjectId (ref: 'Lesson', required),
  userId: ObjectId (ref: 'User', required),
  content: String (required),
  isEdited: Boolean (default: false),
  isHidden: Boolean (default: false),
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes:**
- lessonId
- userId
- createdAt (descending)

### Reel Model

```javascript
{
  _id: ObjectId,
  title: String (required),
  videoUrl: String (required),
  thumbnail: String (URL, required),
  duration: Number (seconds),
  viewCount: Number (default: 0),
  isPublished: Boolean (default: true),
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes:**
- isPublished
- createdAt (descending)

### Certificate Model

```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: 'User', required),
  courseId: ObjectId (ref: 'Course', required),
  certificateUrl: String (URL, required),
  verificationCode: String (unique, required),
  issuedAt: Date (required),
  createdAt: Date
}
```

**Indexes:**
- userId + courseId (compound, unique)
- verificationCode (unique)

### Notification Model

```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: 'User', required),
  type: String (enum: ['new_course', 'comment_reply', 'announcement', 'certificate'], required),
  title: String (required),
  message: String (required),
  link: String,
  isRead: Boolean (default: false),
  createdAt: Date
}
```

**Indexes:**
- userId + isRead (compound)
- userId + createdAt (compound)

### BlogPost Model

```javascript
{
  _id: ObjectId,
  title: String (required),
  slug: String (required, unique),
  content: String (required),
  excerpt: String,
  featuredImage: String (URL),
  author: ObjectId (ref: 'User', required),
  tags: [String],
  viewCount: Number (default: 0),
  isPublished: Boolean (default: true),
  publishedAt: Date,
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes:**
- slug (unique)
- isPublished
- publishedAt (descending)
- tags

### HeroSection Model

```javascript
{
  _id: ObjectId,
  title: String (required),
  description: String (required),
  imageUrl: String (URL, required),
  ctaText: String,
  ctaLink: String,
  isActive: Boolean (default: true),
  updatedAt: Date
}
```

### RefreshToken Model

```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: 'User', required),
  token: String (required, unique),
  expiresAt: Date (required),
  createdAt: Date
}
```

**Indexes:**
- userId
- token (unique)
- expiresAt (TTL index for automatic deletion)

## Correctness Properties


*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Authentication and Security Properties

**Property 1: User registration creates valid accounts**
*For any* valid registration data (name, email, password), creating a user account should result in a stored user with hashed password and unique email.
**Validates: Requirements 1.1, 1.4**

**Property 2: Authentication token round-trip**
*For any* valid user credentials, authenticating should return both JWT and refresh token, and the refresh token should be able to generate a new valid JWT.
**Validates: Requirements 1.2, 1.3**

**Property 3: Email verification state transition**
*For any* user registration, an email verification token should be generated, and using that token should transition the user's email verification status from false to true.
**Validates: Requirements 1.5, 1.6**

**Property 4: Password reset invalidates old tokens**
*For any* user with a password reset token, successfully resetting the password should invalidate the old token and any subsequent use of that token should fail.
**Validates: Requirements 1.7, 1.8**

**Property 5: Password hashing invariant**
*For any* password stored in the database, the stored value should be a bcrypt hash with cost factor >= 10, never plaintext.
**Validates: Requirements 1.4, 13.4**

**Property 6: JWT expiration times**
*For any* authentication event, the issued JWT should expire in 15 minutes and the refresh token should expire in 7 days.
**Validates: Requirements 13.2**

**Property 7: Rate limiting enforcement**
*For any* IP address making requests to an endpoint, exceeding 100 requests in 15 minutes should result in 429 errors for subsequent requests until the window resets.
**Validates: Requirements 13.3, 23.1**

**Property 8: Account lockout after failed attempts**
*For any* user account, 5 failed login attempts within 15 minutes should lock the account for 15 minutes, preventing further login attempts.
**Validates: Requirements 23.2**

**Property 9: 2FA authentication requirement**
*For any* admin user with 2FA enabled, authentication should require both valid password and valid TOTP, and missing either should deny access.
**Validates: Requirements 13.5, 13.6**

### Access Control Properties

**Property 10: Social verification gates video access**
*For any* user without social verification, attempting to access video content should be denied, and after completing social verification, access should be granted.
**Validates: Requirements 2.1, 2.2, 2.3**

**Property 11: Paid mode bypasses social verification**
*For any* user with paid status when the platform is in paid mode, video access should be granted regardless of social verification status.
**Validates: Requirements 2.4**

**Property 12: Admin-only route protection**
*For any* user without admin role, attempting to access admin routes should return 403 Forbidden, and users with admin role should be granted access.
**Validates: Requirements 12.1, 12.2, 12.4, 12.5**

**Property 13: Role verification from JWT**
*For any* JWT token, the role extracted from the token payload should match the user's role in the database.
**Validates: Requirements 12.3**

**Property 14: Paid content access control**
*For any* premium content when in paid mode, users without active subscription or purchase should be denied access, and users with valid payment should be granted access.
**Validates: Requirements 20.1, 20.2**

**Property 15: Subscription expiration revokes access**
*For any* user with an expired subscription, access to premium content should be revoked immediately upon expiration.
**Validates: Requirements 20.4**

### Course and Content Management Properties

**Property 16: Course creation and persistence**
*For any* valid course data submitted by an admin, the course should be stored in the database with all provided fields and a unique ID.
**Validates: Requirements 3.1**

**Property 17: Lesson-course association invariant**
*For any* lesson added to a course, the lesson's courseId should reference the parent course, and the course's lesson list should include the lesson.
**Validates: Requirements 3.2**

**Property 18: Course updates preserve lesson associations**
*For any* course with existing lessons, updating the course information should not break the lesson associations, and all lessons should remain accessible.
**Validates: Requirements 3.3**

**Property 19: Cascading course deletion**
*For any* course with associated lessons, deleting the course should also delete all associated lessons, progress records, and favorites.
**Validates: Requirements 3.4**

**Property 20: Video upload and URL storage**
*For any* valid video file uploaded by an admin, the file should be stored in cloud storage and the returned URL should be saved in the lesson record.
**Validates: Requirements 3.5**

**Property 21: Category validation**
*For any* course creation or update, the category field should only accept values from the predefined list: React, HTML, CSS, Tailwind, React Native, Next.js, TypeScript.
**Validates: Requirements 3.6**

**Property 22: Reel creation and deletion**
*For any* valid Reel data, creating a Reel should store it in the database, and deleting a Reel should remove it completely.
**Validates: Requirements 9.1, 9.2**

### Video Playback and Progress Properties

**Property 23: Verified user video streaming**
*For any* verified user selecting a lesson, the video player should stream the video content without errors.
**Validates: Requirements 4.1**

**Property 24: Playback controls functionality**
*For any* video being played, all playback controls (play, pause, seek, volume, speed) should function correctly and affect playback state.
**Validates: Requirements 4.2**

**Property 25: Progress persistence round-trip**
*For any* user watching a video, exiting and saving progress then returning to the video should resume from the saved position.
**Validates: Requirements 4.4, 4.5**

**Property 26: Lesson completion marking**
*For any* user watching a video to 100% completion, the lesson should be marked as completed in the progress tracker.
**Validates: Requirements 4.6**

**Property 27: Course completion percentage calculation**
*For any* course with N lessons and M completed lessons, the completion percentage should equal (M/N) * 100.
**Validates: Requirements 6.3**

**Property 28: Course completion state transition**
*For any* course where all lessons are marked complete, the course itself should be marked as completed.
**Validates: Requirements 6.4**

### User Engagement Properties

**Property 29: Like count consistency**
*For any* video, the like count should always equal the number of user like records for that video.
**Validates: Requirements 5.1**

**Property 30: Like toggle idempotence**
*For any* video, liking then unliking should return the like count to its original value and remove the user's like record.
**Validates: Requirements 5.2**

**Property 31: Favorites add and remove**
*For any* video, adding to favorites should create a favorite record, and removing should delete that record.
**Validates: Requirements 5.3, 5.4**

**Property 32: Favorites retrieval completeness**
*For any* user, viewing favorites should display all and only the videos that have favorite records for that user.
**Validates: Requirements 5.5**

**Property 33: Watch history recording**
*For any* video watched by a user, a watch history record should be created with the current timestamp.
**Validates: Requirements 6.1**

**Property 34: Watch history chronological ordering**
*For any* user's watch history, the videos should be ordered by timestamp in descending order (most recent first).
**Validates: Requirements 6.2**

### Comment System Properties

**Property 35: Comment creation with metadata**
*For any* valid comment submitted on a lesson, the comment should be stored with content, userId, lessonId, and timestamp.
**Validates: Requirements 15.1**

**Property 36: Comment chronological ordering**
*For any* lesson's comments, they should be displayed in chronological order by creation timestamp.
**Validates: Requirements 15.2**

**Property 37: Comment edit marking**
*For any* comment edited by its author, the comment content should be updated and the isEdited flag should be set to true.
**Validates: Requirements 15.3**

**Property 38: Comment deletion removal**
*For any* comment deleted by its author or an admin, the comment should be removed from display.
**Validates: Requirements 15.4**

**Property 39: Comment moderation hiding**
*For any* comment hidden by an admin, the comment should not appear in the lesson's comment list for regular users.
**Validates: Requirements 15.5**

### Profile Management Properties

**Property 40: Profile update persistence**
*For any* valid profile data (name, bio, avatar), updating the profile should persist all changes and subsequent profile retrieval should reflect the updates.
**Validates: Requirements 7.1, 7.2**

**Property 41: Password change requires verification**
*For any* password change request, the current password must be verified before allowing the update, and invalid current passwords should be rejected.
**Validates: Requirements 7.3**

**Property 42: Password change with hashing**
*For any* successful password change, the new password should be hashed with bcrypt before storage.
**Validates: Requirements 7.4**

**Property 43: Profile data completeness**
*For any* user viewing their profile, all personal information, watch history, favorites, and course progress should be displayed.
**Validates: Requirements 7.5**

### Search and Filtering Properties

**Property 44: Search query matching**
*For any* search query, all returned results should have the query string present in either the title or description (case-insensitive).
**Validates: Requirements 8.1**

**Property 45: Category filter exclusivity**
*For any* selected category filter, all returned courses should belong to that category and no other categories.
**Validates: Requirements 8.2**

**Property 46: Popular sort ordering**
*For any* course list sorted by "Popular", courses should be ordered by total views or likes in descending order.
**Validates: Requirements 8.3**

**Property 47: New sort ordering**
*For any* course list sorted by "New", courses should be ordered by creation date in descending order (most recent first).
**Validates: Requirements 8.4**

### Admin Dashboard Properties

**Property 48: Dashboard statistics accuracy**
*For any* admin dashboard view, the displayed statistics (total users, active users, total courses) should match the actual counts in the database.
**Validates: Requirements 10.1**

**Property 49: Course analytics accuracy**
*For any* course analytics view, the most watched courses should be ordered by view count in descending order.
**Validates: Requirements 10.2**

**Property 50: Time-range statistics filtering**
*For any* selected time range (daily/monthly), the displayed statistics should only include data within that time range.
**Validates: Requirements 10.3**

**Property 51: User analytics calculation**
*For any* user analytics view, the growth trends should accurately reflect user registration counts over time.
**Validates: Requirements 10.4**

**Property 52: Course edit form pre-population**
*For any* course being edited, the edit form should be pre-filled with all current course data from the database.
**Validates: Requirements 11.2**

**Property 53: User management operations**
*For any* admin performing user management, viewing details, deactivating accounts, and resetting passwords should all function correctly.
**Validates: Requirements 11.3**

**Property 54: Hero section update and display**
*For any* hero section update by an admin, the changes should be persisted and immediately reflected on the home page.
**Validates: Requirements 11.4**

**Property 55: Banner image optimization**
*For any* banner image uploaded by an admin, the image should be optimized (compressed, resized) before storage.
**Validates: Requirements 11.5**

### Certificate System Properties

**Property 56: Certificate generation on completion**
*For any* user completing all lessons in a course, a digital certificate should be automatically generated with user name, course title, and completion date.
**Validates: Requirements 14.1**

**Property 57: Certificate persistence and availability**
*For any* generated certificate, it should be stored in the database and made available for download.
**Validates: Requirements 14.2**

**Property 58: Certificate download button display**
*For any* completed course in a user's profile, a "Download Certificate" button should be displayed.
**Validates: Requirements 14.3**

**Property 59: Certificate uniqueness**
*For any* certificate generated, it should have a unique verification code that can be used to verify authenticity.
**Validates: Requirements 14.4**

### Notification System Properties

**Property 60: Course publication notification broadcast**
*For any* new course published, all users should receive a notification about the new course.
**Validates: Requirements 16.1**

**Property 61: Comment reply notification**
*For any* comment receiving a reply, the original commenter should receive a notification.
**Validates: Requirements 16.2**

**Property 62: Announcement notification broadcast**
*For any* admin announcement, all users should receive a notification.
**Validates: Requirements 16.3**

**Property 63: Unread notification prominence**
*For any* user viewing notifications, unread notifications should be visually distinguished from read notifications.
**Validates: Requirements 16.4**

**Property 64: Notification interaction state change**
*For any* notification clicked by a user, the notification should be marked as read and the user should be navigated to the relevant content.
**Validates: Requirements 16.5**

### Blog System Properties

**Property 65: Blog post creation and publication**
*For any* valid blog post data submitted by an admin, the post should be stored and published.
**Validates: Requirements 17.1**

**Property 66: Blog post chronological ordering**
*For any* blog section view, published posts should be displayed in reverse chronological order by publication date.
**Validates: Requirements 17.2**

**Property 67: Blog post content display**
*For any* blog post clicked by a user, the full content with formatting should be displayed.
**Validates: Requirements 17.3**

**Property 68: Blog SEO metadata generation**
*For any* published blog post, SEO-friendly metadata (title tags, meta descriptions, Open Graph tags) should be automatically generated.
**Validates: Requirements 17.4**

**Property 69: Blog post update persistence**
*For any* blog post edited or deleted by an admin, the changes should be persisted immediately.
**Validates: Requirements 17.5**

### Theme and UI Properties

**Property 70: Theme preference persistence round-trip**
*For any* user selecting a theme (dark/light), the preference should be saved to local storage, and returning to the platform should apply the saved preference.
**Validates: Requirements 18.2, 18.3**

**Property 71: Image lazy loading**
*For any* images below the fold, they should not be loaded until they are about to enter the viewport.
**Validates: Requirements 19.2**

**Property 72: Static asset caching headers**
*For any* static asset served, appropriate cache-control headers should be set for browser caching.
**Validates: Requirements 19.4**

**Property 73: Course list pagination**
*For any* course list request, only the requested page of results should be returned, not the entire dataset.
**Validates: Requirements 19.5**

### Payment System Properties (Future)

**Property 74: Subscription plan support**
*For any* subscription plan (monthly/yearly), the system should support automatic renewal and track expiration dates.
**Validates: Requirements 20.3**

**Property 75: Payment gateway integration**
*For any* payment transaction, the system should securely communicate with the payment gateway and handle success/failure responses.
**Validates: Requirements 20.5**

### Responsive Design Properties

**Property 76: Responsive layout adaptation**
*For any* screen size (mobile, tablet, desktop), the layout should adapt appropriately without horizontal scrolling or broken layouts.
**Validates: Requirements 21.1**

### Security and Logging Properties

**Property 77: Suspicious activity logging**
*For any* detected suspicious activity (multiple failed logins, unusual access patterns), an event should be logged for admin review.
**Validates: Requirements 23.3**

**Property 78: CAPTCHA after failed attempts**
*For any* user with failed login or registration attempts, CAPTCHA verification should be required after the threshold is exceeded.
**Validates: Requirements 23.4**

## Error Handling

### Authentication Errors

**Invalid Credentials**
- Status: 401 Unauthorized
- Response: { error: "Invalid email or password" }
- Action: Log attempt, increment failed login counter

**Expired Token**
- Status: 401 Unauthorized
- Response: { error: "Token expired" }
- Action: Client should use refresh token to obtain new JWT

**Invalid Token**
- Status: 401 Unauthorized
- Response: { error: "Invalid token" }
- Action: Client should redirect to login

**Account Locked**
- Status: 423 Locked
- Response: { error: "Account temporarily locked due to multiple failed login attempts", retryAfter: timestamp }
- Action: User must wait for lockout period to expire

**Email Not Verified**
- Status: 403 Forbidden
- Response: { error: "Please verify your email before logging in" }
- Action: Prompt user to check email for verification link

**2FA Required**
- Status: 403 Forbidden
- Response: { error: "Two-factor authentication required", requiresTOTP: true }
- Action: Prompt user for TOTP code

### Authorization Errors

**Insufficient Permissions**
- Status: 403 Forbidden
- Response: { error: "You do not have permission to access this resource" }
- Action: Log unauthorized access attempt

**Social Verification Required**
- Status: 403 Forbidden
- Response: { error: "Please complete social media verification to access videos", requiresSocialVerification: true }
- Action: Display social verification modal

**Subscription Required**
- Status: 402 Payment Required
- Response: { error: "This content requires an active subscription", contentId: id }
- Action: Redirect to subscription purchase page

### Validation Errors

**Invalid Input**
- Status: 400 Bad Request
- Response: { error: "Validation failed", fields: { fieldName: "error message" } }
- Action: Display field-specific error messages

**Missing Required Fields**
- Status: 400 Bad Request
- Response: { error: "Missing required fields", required: ["field1", "field2"] }
- Action: Highlight missing fields

**Duplicate Entry**
- Status: 409 Conflict
- Response: { error: "A user with this email already exists" }
- Action: Prompt user to login or use different email

**Invalid File Type**
- Status: 400 Bad Request
- Response: { error: "Invalid file type. Accepted types: video/mp4, video/webm" }
- Action: Display error and prompt for correct file type

**File Too Large**
- Status: 413 Payload Too Large
- Response: { error: "File size exceeds maximum limit of 500MB" }
- Action: Display error and suggest compression

### Resource Errors

**Not Found**
- Status: 404 Not Found
- Response: { error: "Resource not found", resourceType: "course", resourceId: id }
- Action: Display "not found" page or redirect to home

**Already Exists**
- Status: 409 Conflict
- Response: { error: "Resource already exists", resourceType: "favorite" }
- Action: Inform user that action has already been performed

**Dependency Error**
- Status: 409 Conflict
- Response: { error: "Cannot delete course with enrolled students" }
- Action: Prompt admin to handle dependencies first

### Rate Limiting Errors

**Too Many Requests**
- Status: 429 Too Many Requests
- Response: { error: "Rate limit exceeded", retryAfter: seconds }
- Headers: Retry-After: seconds
- Action: Display error and retry after specified time

### Server Errors

**Internal Server Error**
- Status: 500 Internal Server Error
- Response: { error: "An unexpected error occurred. Please try again later.", errorId: uuid }
- Action: Log full error details with errorId, display generic message to user

**Service Unavailable**
- Status: 503 Service Unavailable
- Response: { error: "Service temporarily unavailable. Please try again later." }
- Action: Display maintenance message

**Database Error**
- Status: 500 Internal Server Error
- Response: { error: "Database operation failed" }
- Action: Log error, attempt retry with exponential backoff

**Cloud Storage Error**
- Status: 500 Internal Server Error
- Response: { error: "Failed to upload file to cloud storage" }
- Action: Log error, clean up partial uploads, prompt user to retry

### Error Logging Strategy

All errors should be logged with the following information:
- Timestamp
- Error type and message
- User ID (if authenticated)
- Request path and method
- Request body (sanitized, no passwords)
- Stack trace (for server errors)
- Client information (IP, user agent)

Critical errors (500-level) should trigger alerts to administrators.

## Testing Strategy

### Dual Testing Approach

The AIDEVIX platform requires both unit testing and property-based testing for comprehensive coverage:

**Unit Tests**: Focus on specific examples, edge cases, and integration points
- Specific user registration scenarios (valid email formats, password requirements)
- Edge cases (empty inputs, boundary values, special characters)
- Error conditions (network failures, invalid tokens, missing data)
- Integration between components (authentication flow, video upload process)

**Property-Based Tests**: Verify universal properties across all inputs
- Generate random valid and invalid inputs to test properties
- Minimum 100 iterations per property test
- Each property test references its design document property
- Tag format: **Feature: aidevix-platform, Property {number}: {property_text}**

### Property-Based Testing Configuration

**Library Selection**:
- Frontend (JavaScript/TypeScript): fast-check
- Backend (Node.js): fast-check
- Minimum 100 iterations per test (due to randomization)

**Test Organization**:
- Each correctness property should be implemented by a SINGLE property-based test
- Tests should be organized by feature area (authentication, courses, video playback, etc.)
- Each test file should focus on related properties

**Example Property Test Structure**:

```javascript
// tests/properties/authentication.property.test.js
const fc = require('fast-check');
const { registerUser, hashPassword } = require('../../src/services/authService');

describe('Authentication Properties', () => {
  // Feature: aidevix-platform, Property 1: User registration creates valid accounts
  test('Property 1: User registration creates valid accounts', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.record({
          name: fc.string({ minLength: 1, maxLength: 100 }),
          email: fc.emailAddress(),
          password: fc.string({ minLength: 8, maxLength: 100 })
        }),
        async (userData) => {
          const user = await registerUser(userData);
          
          expect(user).toBeDefined();
          expect(user.email).toBe(userData.email.toLowerCase());
          expect(user.password).not.toBe(userData.password); // Should be hashed
          expect(user._id).toBeDefined();
        }
      ),
      { numRuns: 100 }
    );
  });

  // Feature: aidevix-platform, Property 5: Password hashing invariant
  test('Property 5: Password hashing invariant', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.string({ minLength: 8, maxLength: 100 }),
        async (password) => {
          const hashed = await hashPassword(password);
          
          expect(hashed).not.toBe(password);
          expect(hashed).toMatch(/^\$2[aby]\$\d{2}\$/); // bcrypt format
          // Verify cost factor >= 10
          const costFactor = parseInt(hashed.split('$')[2]);
          expect(costFactor).toBeGreaterThanOrEqual(10);
        }
      ),
      { numRuns: 100 }
    );
  });
});
```

### Unit Testing Strategy

**Test Coverage Goals**:
- Minimum 80% code coverage
- 100% coverage for critical paths (authentication, payment, access control)
- Focus on business logic and edge cases

**Test Organization**:
- Unit tests organized by module/component
- Integration tests for API endpoints
- End-to-end tests for critical user flows

**Example Unit Test Structure**:

```javascript
// tests/unit/authService.test.js
describe('AuthService', () => {
  describe('registerUser', () => {
    it('should reject registration with existing email', async () => {
      const existingUser = { email: 'test@example.com', password: 'password123' };
      await registerUser(existingUser);
      
      await expect(registerUser(existingUser)).rejects.toThrow('Email already exists');
    });

    it('should reject weak passwords', async () => {
      const userData = { email: 'test@example.com', password: '123' };
      
      await expect(registerUser(userData)).rejects.toThrow('Password must be at least 8 characters');
    });
  });
});
```

### Integration Testing

**API Endpoint Testing**:
- Test all REST endpoints with various inputs
- Verify correct status codes and response formats
- Test authentication and authorization middleware
- Test rate limiting behavior

**Database Integration**:
- Test CRUD operations for all models
- Verify indexes are used correctly
- Test cascading deletes and updates
- Test transaction handling

**Cloud Storage Integration**:
- Test file upload and retrieval
- Test error handling for storage failures
- Verify URL generation and access

### End-to-End Testing

**Critical User Flows**:
1. User registration → Email verification → Login → Watch video
2. Admin login → Create course → Upload lesson → Publish
3. User completes course → Certificate generation → Download
4. User likes video → Adds to favorites → Views history
5. Payment flow → Subscription activation → Premium content access

**Testing Tools**:
- Frontend E2E: Cypress or Playwright
- API Testing: Supertest
- Load Testing: Artillery or k6

### Performance Testing

**Metrics to Monitor**:
- API response times (target: < 200ms for most endpoints)
- Video streaming startup time (target: < 2 seconds)
- Page load times (target: < 3 seconds)
- Database query performance

**Load Testing Scenarios**:
- Concurrent user logins (target: 1000 concurrent users)
- Simultaneous video streaming (target: 500 concurrent streams)
- Course search under load (target: 100 requests/second)

### Security Testing

**Automated Security Scans**:
- Dependency vulnerability scanning (npm audit)
- Static code analysis (ESLint security rules)
- OWASP Top 10 vulnerability testing

**Manual Security Testing**:
- Penetration testing for authentication bypass
- SQL injection and NoSQL injection attempts
- XSS and CSRF vulnerability testing
- Rate limiting effectiveness
- JWT token security

### Continuous Integration

**CI Pipeline Steps**:
1. Run linters and code formatters
2. Run unit tests
3. Run property-based tests
4. Run integration tests
5. Generate coverage reports
6. Build Docker containers
7. Run security scans
8. Deploy to staging (if all tests pass)

**Quality Gates**:
- All tests must pass
- Code coverage >= 80%
- No critical security vulnerabilities
- No linting errors

This comprehensive testing strategy ensures the AIDEVIX platform is reliable, secure, and performant across all features and use cases.
