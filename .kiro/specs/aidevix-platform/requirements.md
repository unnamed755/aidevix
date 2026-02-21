# Requirements Document: AIDEVIX Platform

## Introduction

AIDEVIX is an online education platform designed to deliver programming courses through video content. The platform will initially operate on a social media subscription model (requiring users to follow Instagram, Telegram, and YouTube accounts) to build an audience, then transition to a paid model. The system supports multiple user roles (students and administrators), course categorization, video streaming, progress tracking, and comprehensive administrative controls.

## Glossary

- **Platform**: The AIDEVIX online education system
- **User**: A registered student who consumes course content
- **Admin**: A privileged user with content management and system administration capabilities
- **Course**: A collection of organized lessons within a specific programming topic
- **Lesson**: An individual video unit within a course
- **Reel**: A short-form video for promotional or educational purposes
- **Social_Verification**: The process of confirming a user has subscribed to required social media accounts
- **Watch_History**: A chronological record of videos a user has viewed
- **Favorites**: A user-curated collection of saved videos
- **JWT**: JSON Web Token used for authentication
- **Refresh_Token**: A long-lived token used to obtain new access tokens
- **Video_Player**: The component responsible for streaming and controlling video playback
- **Progress_Tracker**: The system that records and maintains user viewing progress
- **Certificate**: A digital credential issued upon course completion
- **2FA**: Two-Factor Authentication for enhanced security
- **Rate_Limiter**: A mechanism to prevent API abuse by limiting request frequency

## Requirements

### Requirement 1: User Registration and Authentication

**User Story:** As a new visitor, I want to register for an account, so that I can access course content on the platform.

#### Acceptance Criteria

1. WHEN a visitor provides valid registration information (email, password, name), THE Platform SHALL create a new user account
2. WHEN a user provides valid credentials, THE Platform SHALL authenticate the user and issue a JWT access token and refresh token
3. WHEN an access token expires, THE Platform SHALL accept a valid refresh token and issue a new access token
4. WHEN a user registers, THE Platform SHALL hash the password using bcrypt before storage
5. WHEN a user registers with an email, THE Platform SHALL send an email verification link
6. WHEN a user clicks the verification link, THE Platform SHALL mark the email as verified
7. WHEN a user requests password recovery, THE Platform SHALL send a password reset link to the registered email
8. WHEN a user submits a new password via the reset link, THE Platform SHALL update the password and invalidate the reset token

### Requirement 2: Social Media Verification

**User Story:** As a platform owner, I want users to subscribe to our social media accounts before watching videos, so that we can build our audience.

#### Acceptance Criteria

1. WHEN a user attempts to watch a video without completing social verification, THE Platform SHALL display a verification prompt requiring Instagram, Telegram, and YouTube subscriptions
2. WHEN a user claims to have subscribed to all required social media accounts, THE Platform SHALL mark the user as socially verified
3. WHEN a user is socially verified, THE Platform SHALL grant access to video content
4. WHERE the platform transitions to paid mode, THE Platform SHALL disable social verification requirements for paid users

### Requirement 3: Course and Lesson Management

**User Story:** As an admin, I want to create and organize courses with lessons, so that users can access structured learning content.

#### Acceptance Criteria

1. WHEN an admin creates a course with valid information (title, description, category, thumbnail), THE Platform SHALL store the course in the database
2. WHEN an admin adds a lesson to a course with valid information (title, description, video file, duration), THE Platform SHALL associate the lesson with the course
3. WHEN an admin updates course information, THE Platform SHALL persist the changes and maintain lesson associations
4. WHEN an admin deletes a course, THE Platform SHALL remove the course and all associated lessons
5. WHEN an admin uploads a video file, THE Platform SHALL store it in cloud storage (Cloudinary or AWS S3) and save the URL reference
6. THE Platform SHALL support the following course categories: React, HTML, CSS, Tailwind, React Native, Next.js, TypeScript

### Requirement 4: Video Streaming and Playback

**User Story:** As a user, I want to watch course videos with playback controls, so that I can learn at my own pace.

#### Acceptance Criteria

1. WHEN a verified user selects a lesson, THE Video_Player SHALL stream the video content
2. WHEN a user interacts with playback controls, THE Video_Player SHALL support play, pause, seek, volume adjustment, and playback speed control (0.5x, 1x, 1.25x, 1.5x, 2x)
3. WHEN a user requests fullscreen mode, THE Video_Player SHALL expand to fullscreen
4. WHEN a user exits a video, THE Progress_Tracker SHALL save the current playback position
5. WHEN a user returns to a previously watched video, THE Video_Player SHALL resume from the saved position
6. WHEN a user watches a video to completion, THE Progress_Tracker SHALL mark the lesson as completed

### Requirement 5: User Engagement Features

**User Story:** As a user, I want to like videos and save them to favorites, so that I can easily find content I enjoy.

#### Acceptance Criteria

1. WHEN a user clicks the like button on a video, THE Platform SHALL increment the video's like count and record the user's like
2. WHEN a user clicks the like button again on a liked video, THE Platform SHALL decrement the like count and remove the user's like
3. WHEN a user adds a video to favorites, THE Platform SHALL save the video to the user's favorites collection
4. WHEN a user removes a video from favorites, THE Platform SHALL remove the video from the user's favorites collection
5. WHEN a user views their favorites, THE Platform SHALL display all saved videos with thumbnails and titles

### Requirement 6: Watch History and Progress Tracking

**User Story:** As a user, I want to see my watch history and course progress, so that I can track my learning journey.

#### Acceptance Criteria

1. WHEN a user watches a video, THE Platform SHALL record the viewing event in the user's watch history with timestamp
2. WHEN a user views their watch history, THE Platform SHALL display videos in reverse chronological order
3. WHEN a user completes lessons in a course, THE Platform SHALL calculate and display course completion percentage
4. WHEN a user completes all lessons in a course, THE Platform SHALL mark the course as completed

### Requirement 7: User Profile Management

**User Story:** As a user, I want to manage my profile information, so that I can keep my account details current.

#### Acceptance Criteria

1. WHEN a user updates profile information (name, bio, avatar), THE Platform SHALL persist the changes
2. WHEN a user uploads a profile avatar, THE Platform SHALL store it in cloud storage and update the user's profile
3. WHEN a user requests to change their password, THE Platform SHALL require the current password for verification
4. WHEN a user provides a valid current password and new password, THE Platform SHALL hash and update the password
5. WHEN a user views their profile, THE Platform SHALL display personal information, watch history, favorites, and course progress

### Requirement 8: Search and Filtering

**User Story:** As a user, I want to search and filter courses, so that I can find relevant learning content quickly.

#### Acceptance Criteria

1. WHEN a user enters a search query, THE Platform SHALL return courses and lessons matching the query in title or description
2. WHEN a user selects a category filter, THE Platform SHALL display only courses in that category
3. WHEN a user sorts by "Popular", THE Platform SHALL order courses by total views or likes
4. WHEN a user sorts by "New", THE Platform SHALL order courses by creation date in descending order
5. WHEN no results match the search criteria, THE Platform SHALL display a "no results found" message

### Requirement 9: Reels Management

**User Story:** As an admin, I want to upload and manage short-form Reels videos, so that I can promote courses and engage users.

#### Acceptance Criteria

1. WHEN an admin uploads a Reel with valid information (title, video file, thumbnail), THE Platform SHALL store the Reel
2. WHEN an admin deletes a Reel, THE Platform SHALL remove it from the platform
3. WHEN a user visits the home page, THE Platform SHALL display Reels in a scrollable format
4. WHEN a user plays a Reel, THE Video_Player SHALL auto-play the video with appropriate controls

### Requirement 10: Admin Dashboard and Analytics

**User Story:** As an admin, I want to view platform statistics, so that I can monitor platform performance and user engagement.

#### Acceptance Criteria

1. WHEN an admin accesses the dashboard, THE Platform SHALL display total user count, active users (logged in within 30 days), and total courses
2. WHEN an admin views course analytics, THE Platform SHALL display the most watched courses with view counts
3. WHEN an admin selects a time range, THE Platform SHALL display daily or monthly statistics for user registrations and video views
4. WHEN an admin views user analytics, THE Platform SHALL display user growth trends and engagement metrics

### Requirement 11: Admin Content Management

**User Story:** As an admin, I want to manage all platform content, so that I can maintain quality and relevance.

#### Acceptance Criteria

1. WHEN an admin accesses the content management interface, THE Platform SHALL display options to manage courses, lessons, Reels, users, and hero sections
2. WHEN an admin edits a course, THE Platform SHALL display a form pre-filled with current course data
3. WHEN an admin manages users, THE Platform SHALL support viewing user details, deactivating accounts, and resetting passwords
4. WHEN an admin updates hero section content (title, description, image, CTA buttons), THE Platform SHALL persist the changes and display them on the home page
5. WHEN an admin uploads banner images, THE Platform SHALL optimize and store them for display

### Requirement 12: Role-Based Access Control

**User Story:** As a system administrator, I want to enforce role-based permissions, so that only authorized users can access administrative functions.

#### Acceptance Criteria

1. WHEN a user without admin role attempts to access admin routes, THE Platform SHALL return a 403 Forbidden error
2. WHEN an admin user accesses admin routes with a valid JWT, THE Platform SHALL grant access
3. WHEN a JWT is validated, THE Platform SHALL verify the user's role from the token payload
4. THE Platform SHALL restrict course creation, editing, and deletion to admin users only
5. THE Platform SHALL restrict user management functions to admin users only

### Requirement 13: Security Measures

**User Story:** As a platform owner, I want robust security measures, so that user data and platform integrity are protected.

#### Acceptance Criteria

1. WHEN the Platform communicates with clients, THE Platform SHALL use HTTPS for all connections
2. WHEN a user or admin authenticates, THE Platform SHALL issue a short-lived JWT (15 minutes) and a long-lived refresh token (7 days)
3. WHEN an API endpoint receives requests, THE Rate_Limiter SHALL limit requests to prevent abuse (e.g., 100 requests per 15 minutes per IP)
4. WHEN storing sensitive data, THE Platform SHALL encrypt passwords using bcrypt with a minimum cost factor of 10
5. WHERE an admin enables 2FA, THE Platform SHALL require a time-based one-time password (TOTP) in addition to credentials
6. WHEN a 2FA-enabled admin logs in, THE Platform SHALL verify both password and TOTP before issuing tokens

### Requirement 14: Certificate Issuance

**User Story:** As a user, I want to receive a certificate upon course completion, so that I can demonstrate my achievement.

#### Acceptance Criteria

1. WHEN a user completes all lessons in a course, THE Platform SHALL generate a digital certificate with the user's name, course title, and completion date
2. WHEN a certificate is generated, THE Platform SHALL store it and make it available for download
3. WHEN a user views their completed courses, THE Platform SHALL display a "Download Certificate" button for each completed course
4. WHEN a user downloads a certificate, THE Platform SHALL provide it in PDF format with a unique verification code

### Requirement 15: Comment System

**User Story:** As a user, I want to comment on lessons, so that I can ask questions and engage with other learners.

#### Acceptance Criteria

1. WHEN a user submits a comment on a lesson, THE Platform SHALL store the comment with timestamp and user information
2. WHEN a user views a lesson, THE Platform SHALL display all comments in chronological order
3. WHEN a user edits their own comment, THE Platform SHALL update the comment and mark it as edited
4. WHEN a user or admin deletes a comment, THE Platform SHALL remove it from display
5. WHEN an admin moderates comments, THE Platform SHALL support hiding or removing inappropriate comments

### Requirement 16: Notification System

**User Story:** As a user, I want to receive notifications about platform updates, so that I stay informed about new content and activities.

#### Acceptance Criteria

1. WHEN a new course is published, THE Platform SHALL send notifications to all users
2. WHEN a user receives a reply to their comment, THE Platform SHALL notify the user
3. WHEN an admin makes an announcement, THE Platform SHALL send notifications to all users
4. WHEN a user views notifications, THE Platform SHALL display unread notifications prominently
5. WHEN a user clicks a notification, THE Platform SHALL mark it as read and navigate to the relevant content

### Requirement 17: Blog System

**User Story:** As an admin, I want to publish blog posts, so that I can improve SEO and provide additional educational content.

#### Acceptance Criteria

1. WHEN an admin creates a blog post with valid information (title, content, featured image, tags), THE Platform SHALL publish the post
2. WHEN a user visits the blog section, THE Platform SHALL display published posts in reverse chronological order
3. WHEN a user clicks on a blog post, THE Platform SHALL display the full content with formatting
4. WHEN a blog post is published, THE Platform SHALL generate SEO-friendly metadata (title tags, meta descriptions, Open Graph tags)
5. WHEN an admin edits or deletes a blog post, THE Platform SHALL persist the changes

### Requirement 18: Theme Customization

**User Story:** As a user, I want to switch between dark and light modes, so that I can use the platform comfortably in different lighting conditions.

#### Acceptance Criteria

1. WHEN a user toggles the theme switch, THE Platform SHALL change the color scheme to dark or light mode
2. WHEN a user selects a theme preference, THE Platform SHALL persist the preference in local storage
3. WHEN a user returns to the platform, THE Platform SHALL apply the saved theme preference
4. THE Platform SHALL ensure all UI components are readable and accessible in both themes

### Requirement 19: Performance Optimization

**User Story:** As a user, I want fast page loads and smooth video playback, so that I have a seamless learning experience.

#### Acceptance Criteria

1. WHEN the Platform loads pages, THE Platform SHALL implement code splitting to load only necessary JavaScript bundles
2. WHEN the Platform displays images, THE Platform SHALL optimize and lazy-load images below the fold
3. WHEN the Platform serves video content, THE Platform SHALL use a CDN for efficient delivery
4. WHEN the Platform serves static assets, THE Platform SHALL implement caching headers for browser caching
5. WHEN the Platform renders course lists, THE Platform SHALL implement pagination or infinite scroll to limit initial data load

### Requirement 20: Payment Integration (Future)

**User Story:** As a platform owner, I want to transition to a paid model, so that I can monetize the platform after building an audience.

#### Acceptance Criteria

1. WHERE the platform operates in paid mode, WHEN a user attempts to access premium content, THE Platform SHALL require an active subscription or course purchase
2. WHERE payment is enabled, WHEN a user completes a payment transaction, THE Platform SHALL grant access to the purchased content
3. WHERE payment is enabled, THE Platform SHALL support subscription plans (monthly, yearly) with automatic renewal
4. WHERE payment is enabled, WHEN a subscription expires, THE Platform SHALL revoke access to premium content
5. WHERE payment is enabled, THE Platform SHALL integrate with a payment gateway (Stripe, PayPal) for secure transactions

### Requirement 21: Responsive Design

**User Story:** As a user, I want to access the platform on any device, so that I can learn on desktop, tablet, or mobile.

#### Acceptance Criteria

1. WHEN a user accesses the Platform on different screen sizes, THE Platform SHALL adapt the layout responsively
2. WHEN a user accesses the Platform on mobile devices, THE Platform SHALL provide touch-friendly controls for video playback
3. WHEN a user navigates on mobile, THE Platform SHALL provide a mobile-optimized menu and navigation
4. THE Platform SHALL ensure all interactive elements are accessible and usable on touch devices

### Requirement 22: Data Backup and Recovery

**User Story:** As a platform owner, I want automated data backups, so that I can recover from data loss incidents.

#### Acceptance Criteria

1. THE Platform SHALL perform automated daily backups of the MongoDB database
2. WHEN a backup is created, THE Platform SHALL store it securely with encryption
3. WHEN a data recovery is needed, THE Platform SHALL support restoring from backup within 1 hour
4. THE Platform SHALL retain backups for a minimum of 30 days

### Requirement 23: API Rate Limiting and Abuse Prevention

**User Story:** As a platform owner, I want to prevent API abuse, so that the platform remains available and performant for legitimate users.

#### Acceptance Criteria

1. WHEN an IP address exceeds the rate limit (100 requests per 15 minutes), THE Rate_Limiter SHALL return a 429 Too Many Requests error
2. WHEN a user attempts multiple failed login attempts (5 within 15 minutes), THE Platform SHALL temporarily lock the account for 15 minutes
3. WHEN suspicious activity is detected, THE Platform SHALL log the event for admin review
4. THE Platform SHALL implement CAPTCHA verification for registration and login after failed attempts

### Requirement 24: Deployment and DevOps

**User Story:** As a developer, I want automated deployment pipelines, so that updates can be deployed reliably and efficiently.

#### Acceptance Criteria

1. WHEN code is pushed to the main branch, THE CI/CD pipeline SHALL run automated tests
2. WHEN all tests pass, THE CI/CD pipeline SHALL build Docker containers for frontend and backend
3. WHEN Docker containers are built, THE CI/CD pipeline SHALL deploy them to the production environment
4. THE Platform SHALL use Nginx as a reverse proxy for load balancing and SSL termination
5. WHEN deployment completes, THE Platform SHALL perform health checks to verify service availability
