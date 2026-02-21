import { useState, useEffect, useRef } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FaHeart, FaRegHeart, FaArrowLeft, FaCheckCircle } from 'react-icons/fa';
import { addToFavorites, removeFromFavorites, addToHistory } from '../store/slices/courseSlice';

const VideoPlayer = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { favorites } = useSelector((state) => state.courses);
  const { user } = useSelector((state) => state.auth);
  
  const [lesson, setLesson] = useState(location.state?.lesson);
  const [course, setCourse] = useState(location.state?.course);
  const [isFavorite, setIsFavorite] = useState(false);
  const [progress, setProgress] = useState(0);
  const [watchedTime, setWatchedTime] = useState(0);
  const [isVideoWatched, setIsVideoWatched] = useState(false);
  const playerRef = useRef(null);
  const progressIntervalRef = useRef(null);

  useEffect(() => {
    if (lesson) {
      setIsFavorite(favorites.includes(lesson.id));
      
      // Add to history
      dispatch(addToHistory({ 
        videoId: lesson.id, 
        timestamp: Date.now(),
        title: lesson.title,
        courseTitle: course?.title
      }));

      // Load saved progress from localStorage
      const savedProgress = localStorage.getItem(`video_progress_${lesson.id}`);
      if (savedProgress) {
        const progressData = JSON.parse(savedProgress);
        setProgress(progressData.progress);
        setWatchedTime(progressData.watchedTime);
        if (progressData.progress >= 90) {
          setIsVideoWatched(true);
        }
      }

      // Start tracking progress
      startProgressTracking();
    }

    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, [lesson, favorites, dispatch, course]);

  const startProgressTracking = () => {
    // Simulate video progress tracking
    progressIntervalRef.current = setInterval(() => {
      setWatchedTime(prev => {
        const newTime = prev + 1;
        const duration = parseDuration(lesson.duration);
        const newProgress = Math.min(Math.round((newTime / duration) * 100), 100);
        
        setProgress(newProgress);

        // Save progress to localStorage
        const progressData = {
          progress: newProgress,
          watchedTime: newTime,
          lastWatched: Date.now()
        };
        localStorage.setItem(`video_progress_${lesson.id}`, JSON.stringify(progressData));

        // Mark as watched if progress >= 90%
        if (newProgress >= 90 && !isVideoWatched) {
          setIsVideoWatched(true);
          // Save to watched videos
          const watchedVideos = JSON.parse(localStorage.getItem('watched_videos') || '[]');
          if (!watchedVideos.includes(lesson.id)) {
            watchedVideos.push(lesson.id);
            localStorage.setItem('watched_videos', JSON.stringify(watchedVideos));
          }
        }

        return newTime;
      });
    }, 1000); // Update every second
  };

  const parseDuration = (duration) => {
    // Parse duration like "15:30" to seconds
    const parts = duration.split(':');
    return parseInt(parts[0]) * 60 + parseInt(parts[1]);
  };

  const toggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(lesson.id));
    } else {
      dispatch(addToFavorites(lesson.id));
    }
    setIsFavorite(!isFavorite);
  };

  const handleLessonChange = (newLesson) => {
    // Save current progress before changing
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }
    
    setLesson(newLesson);
    setProgress(0);
    setWatchedTime(0);
    setIsVideoWatched(false);
    
    // Load new lesson progress
    const savedProgress = localStorage.getItem(`video_progress_${newLesson.id}`);
    if (savedProgress) {
      const progressData = JSON.parse(savedProgress);
      setProgress(progressData.progress);
      setWatchedTime(progressData.watchedTime);
      if (progressData.progress >= 90) {
        setIsVideoWatched(true);
      }
    }
  };

  if (!lesson) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p className="text-xl mb-4">Video topilmadi</p>
        <button onClick={() => navigate('/courses')} className="btn-primary">
          Kurslarga qaytish
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-4 md:py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-white hover:text-primary transition mb-4 md:mb-6 text-sm md:text-base"
        >
          <FaArrowLeft className="mr-2" />
          Orqaga
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8">
          {/* Video Player */}
          <div className="lg:col-span-2">
            <div className="aspect-video bg-gray-900 rounded-lg md:rounded-xl overflow-hidden mb-4 md:mb-6 relative">
              <iframe
                ref={playerRef}
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${lesson.youtubeId}?autoplay=1&enablejsapi=1`}
                title={lesson.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
              
              {/* Watched Badge */}
              {isVideoWatched && (
                <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full flex items-center text-sm font-semibold shadow-lg">
                  <FaCheckCircle className="mr-2" />
                  Ko'rilgan
                </div>
              )}
            </div>

            {/* Video Info */}
            <div className="bg-gray-900 rounded-lg md:rounded-xl p-4 md:p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1 pr-4">
                  <h1 className="text-xl md:text-2xl font-bold text-white mb-2">{lesson.title}</h1>
                  <p className="text-sm md:text-base text-gray-400">{course?.title}</p>
                </div>
                <button
                  onClick={toggleFavorite}
                  className="text-2xl md:text-3xl hover:scale-110 transition flex-shrink-0"
                >
                  {isFavorite ? (
                    <FaHeart className="text-red-500" />
                  ) : (
                    <FaRegHeart className="text-gray-400" />
                  )}
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-2 md:gap-4 text-xs md:text-sm text-gray-400 mb-4">
                <span>Davomiyligi: {lesson.duration}</span>
                <span>•</span>
                <span className="capitalize">{lesson.tier} tier</span>
                <span>•</span>
                <span>Ko'rilgan vaqt: {Math.floor(watchedTime / 60)}:{(watchedTime % 60).toString().padStart(2, '0')}</span>
              </div>

              {/* Progress Bar */}
              <div className="mt-4 md:mt-6">
                <div className="flex justify-between text-xs md:text-sm text-gray-400 mb-2">
                  <span>Progress</span>
                  <span>{progress}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full transition-all ${
                      progress >= 90 ? 'bg-green-500' : 'bg-primary'
                    }`}
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                {progress >= 90 && (
                  <p className="text-green-400 text-sm mt-2 flex items-center">
                    <FaCheckCircle className="mr-2" />
                    Tabriklaymiz! Siz bu videoni to'liq ko'rdingiz
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Playlist */}
          <div className="lg:col-span-1">
            <div className="bg-gray-900 rounded-lg md:rounded-xl p-4 md:p-6 lg:sticky lg:top-24">
              <h3 className="text-lg md:text-xl font-bold text-white mb-4">Kurs darslari</h3>
              <div className="space-y-2 max-h-[400px] md:max-h-[600px] overflow-y-auto">
                {course?.modules?.map((module) => (
                  <div key={module.id}>
                    <h4 className="text-xs md:text-sm font-semibold text-gray-400 mb-2 mt-4">
                      {module.title}
                    </h4>
                    {module.lessons.map((l) => {
                      const lessonProgress = JSON.parse(localStorage.getItem(`video_progress_${l.id}`) || '{"progress": 0}');
                      const isWatched = lessonProgress.progress >= 90;
                      
                      return (
                        <div
                          key={l.id}
                          onClick={() => handleLessonChange(l)}
                          className={`p-2 md:p-3 rounded-lg cursor-pointer transition relative ${
                            l.id === lesson.id
                              ? 'bg-primary text-white'
                              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                          }`}
                        >
                          {isWatched && (
                            <FaCheckCircle className="absolute top-2 right-2 text-green-400 text-sm" />
                          )}
                          <p className="font-semibold text-xs md:text-sm line-clamp-2 pr-6">{l.title}</p>
                          <div className="flex items-center justify-between mt-1">
                            <p className="text-xs opacity-75">{l.duration}</p>
                            {lessonProgress.progress > 0 && lessonProgress.progress < 90 && (
                              <span className="text-xs text-primary">{lessonProgress.progress}%</span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
