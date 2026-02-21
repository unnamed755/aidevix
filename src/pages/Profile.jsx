import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaHeart, FaHistory, FaUser, FaCrown, FaCheckCircle, FaPlay } from 'react-icons/fa';

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const { favorites } = useSelector((state) => state.courses);
  const [watchedVideos, setWatchedVideos] = useState([]);
  const [watchHistory, setWatchHistory] = useState([]);
  const [stats, setStats] = useState({
    totalWatched: 0,
    totalProgress: 0,
    completedVideos: 0
  });

  useEffect(() => {
    // Load watched videos from localStorage
    const watched = JSON.parse(localStorage.getItem('watched_videos') || '[]');
    setWatchedVideos(watched);

    // Load watch history
    const history = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith('video_progress_')) {
        const videoId = key.replace('video_progress_', '');
        const data = JSON.parse(localStorage.getItem(key));
        history.push({
          videoId,
          ...data
        });
      }
    }
    
    // Sort by last watched
    history.sort((a, b) => b.lastWatched - a.lastWatched);
    setWatchHistory(history.slice(0, 10)); // Show last 10

    // Calculate stats
    const totalVideos = history.length;
    const completed = history.filter(v => v.progress >= 90).length;
    const avgProgress = totalVideos > 0 
      ? Math.round(history.reduce((sum, v) => sum + v.progress, 0) / totalVideos)
      : 0;

    setStats({
      totalWatched: totalVideos,
      totalProgress: avgProgress,
      completedVideos: completed
    });
  }, []);

  const getSubscriptionBadge = () => {
    const subscription = user?.subscription || 'free';
    const badges = {
      free: { color: 'bg-gray-600', text: 'FREE', icon: null },
      plus: { color: 'bg-blue-500', text: 'PLUS', icon: null },
      pro: { color: 'bg-gradient-to-r from-purple-500 to-pink-500', text: 'PRO', icon: <FaCrown /> }
    };
    return badges[subscription];
  };

  const badge = getSubscriptionBadge();

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="max-w-6xl mx-auto">
        {/* Profile Header */}
        <div className="card p-6 md:p-8 mb-6 md:mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
            <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center flex-shrink-0">
              <FaUser className="text-3xl md:text-4xl" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-2xl md:text-3xl font-bold mb-2">{user?.name || 'Foydalanuvchi'}</h1>
              <p className="text-sm md:text-base text-gray-400 mb-3">{user?.email}</p>
              <div className={`inline-flex items-center ${badge.color} text-white px-4 py-2 rounded-lg font-semibold`}>
                {badge.icon && <span className="mr-2">{badge.icon}</span>}
                {badge.text} obuna
              </div>
            </div>
            <Link to="/pricing" className="btn-primary text-sm md:text-base">
              Obunani yangilash
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
          <div className="card p-4 md:p-6 text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stats.totalWatched}</div>
            <p className="text-sm md:text-base text-gray-400">Boshlangan videolar</p>
          </div>

          <div className="card p-4 md:p-6 text-center">
            <div className="text-3xl md:text-4xl font-bold text-green-500 mb-2">{stats.completedVideos}</div>
            <p className="text-sm md:text-base text-gray-400">Tugatilgan videolar</p>
          </div>

          <div className="card p-4 md:p-6 text-center">
            <div className="text-3xl md:text-4xl font-bold text-secondary mb-2">{stats.totalProgress}%</div>
            <p className="text-sm md:text-base text-gray-400">O'rtacha progress</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {/* Watch History */}
          <div className="card p-4 md:p-6">
            <h2 className="text-xl md:text-2xl font-bold mb-4 flex items-center">
              <FaHistory className="mr-2 text-blue-500" />
              So'nggi ko'rilgan videolar
            </h2>
            
            {watchHistory.length > 0 ? (
              <div className="space-y-3">
                {watchHistory.map((item, index) => (
                  <div key={index} className="bg-gray-700 p-3 md:p-4 rounded-lg hover:bg-gray-600 transition">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-semibold text-sm md:text-base line-clamp-1">Video #{item.videoId}</p>
                      {item.progress >= 90 && (
                        <FaCheckCircle className="text-green-400 flex-shrink-0 ml-2" />
                      )}
                    </div>
                    <div className="flex items-center justify-between text-xs md:text-sm text-gray-400">
                      <span>{new Date(item.lastWatched).toLocaleDateString('uz-UZ')}</span>
                      <span className={item.progress >= 90 ? 'text-green-400' : 'text-primary'}>
                        {item.progress}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-600 rounded-full h-2 mt-2">
                      <div
                        className={`h-2 rounded-full ${item.progress >= 90 ? 'bg-green-500' : 'bg-primary'}`}
                        style={{ width: `${item.progress}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-400">
                <FaHistory className="text-4xl mx-auto mb-3 opacity-50" />
                <p>Hali videolar ko'rilmagan</p>
                <Link to="/courses" className="btn-primary mt-4 inline-block text-sm">
                  Kurslarni ko'rish
                </Link>
              </div>
            )}
          </div>

          {/* Favorites */}
          <div className="card p-4 md:p-6">
            <h2 className="text-xl md:text-2xl font-bold mb-4 flex items-center">
              <FaHeart className="mr-2 text-red-500" />
              Saqlangan videolar
            </h2>
            
            {favorites.length > 0 ? (
              <div className="space-y-3">
                {favorites.map((videoId, index) => (
                  <div key={index} className="bg-gray-700 p-3 md:p-4 rounded-lg hover:bg-gray-600 transition cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                          <FaPlay />
                        </div>
                        <div>
                          <p className="font-semibold text-sm md:text-base">Video #{videoId}</p>
                          <p className="text-xs md:text-sm text-gray-400">Saqlangan</p>
                        </div>
                      </div>
                      <FaHeart className="text-red-500 flex-shrink-0" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-400">
                <FaHeart className="text-4xl mx-auto mb-3 opacity-50" />
                <p>Saqlangan videolar yo'q</p>
                <Link to="/courses" className="btn-primary mt-4 inline-block text-sm">
                  Videolarni ko'rish
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Completed Videos */}
        {watchedVideos.length > 0 && (
          <div className="card p-4 md:p-6 mt-6 md:mt-8">
            <h2 className="text-xl md:text-2xl font-bold mb-4 flex items-center">
              <FaCheckCircle className="mr-2 text-green-500" />
              Tugatilgan videolar ({watchedVideos.length})
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
              {watchedVideos.map((videoId, index) => (
                <div key={index} className="bg-gray-700 p-3 md:p-4 rounded-lg text-center hover:bg-gray-600 transition">
                  <FaCheckCircle className="text-2xl md:text-3xl text-green-400 mx-auto mb-2" />
                  <p className="text-xs md:text-sm font-semibold">Video #{videoId}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
