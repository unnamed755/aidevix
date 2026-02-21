import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaPlay, FaClock, FaLock, FaStar, FaUsers, FaBook } from 'react-icons/fa';

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [course, setCourse] = useState(null);
  const [expandedModules, setExpandedModules] = useState([1]); // First module expanded by default

  useEffect(() => {
    // Mock data with more lessons
    setCourse({
      id: 1,
      title: 'React.js - To\'liq kurs',
      description: 'React.js ni 0 dan professional darajagacha o\'rganing. Zamonaviy web ilovalar yaratishni boshlang. Hooks, Context API, Redux va boshqa advanced mavzular.',
      category: 'react',
      thumbnail: 'https://img.youtube.com/vi/SqcY0GlETPk/maxresdefault.jpg',
      instructor: 'AIDEVIX Team',
      rating: 4.8,
      students: 1250,
      totalLessons: 85,
      totalDuration: '42 soat',
      modules: [
        {
          id: 1,
          title: 'React Asoslari',
          description: 'React.js ga kirish va asosiy tushunchalar',
          lessons: [
            { id: 1, title: 'React nima? Kirish', duration: '15:30', youtubeId: 'SqcY0GlETPk', tier: 'free', completed: false },
            { id: 2, title: 'React o\'rnatish va sozlash', duration: '12:45', youtubeId: 'SqcY0GlETPk', tier: 'free', completed: false },
            { id: 3, title: 'JSX nima?', duration: '18:20', youtubeId: 'SqcY0GlETPk', tier: 'free', completed: false },
            { id: 4, title: 'Components yaratish', duration: '20:45', youtubeId: 'SqcY0GlETPk', tier: 'free', completed: false },
            { id: 5, title: 'Props va State', duration: '25:15', youtubeId: 'SqcY0GlETPk', tier: 'plus', completed: false },
            { id: 6, title: 'Event Handling', duration: '16:30', youtubeId: 'SqcY0GlETPk', tier: 'plus', completed: false },
            { id: 7, title: 'Conditional Rendering', duration: '14:20', youtubeId: 'SqcY0GlETPk', tier: 'plus', completed: false },
            { id: 8, title: 'Lists va Keys', duration: '19:10', youtubeId: 'SqcY0GlETPk', tier: 'plus', completed: false },
          ]
        },
        {
          id: 2,
          title: 'React Hooks',
          description: 'useState, useEffect va boshqa hooklar',
          lessons: [
            { id: 9, title: 'Hooks ga kirish', duration: '13:20', youtubeId: 'SqcY0GlETPk', tier: 'plus', completed: false },
            { id: 10, title: 'useState Hook', duration: '18:20', youtubeId: 'SqcY0GlETPk', tier: 'plus', completed: false },
            { id: 11, title: 'useEffect Hook - 1 qism', duration: '22:30', youtubeId: 'SqcY0GlETPk', tier: 'plus', completed: false },
            { id: 12, title: 'useEffect Hook - 2 qism', duration: '20:15', youtubeId: 'SqcY0GlETPk', tier: 'plus', completed: false },
            { id: 13, title: 'useContext Hook', duration: '24:40', youtubeId: 'SqcY0GlETPk', tier: 'pro', completed: false },
            { id: 14, title: 'useReducer Hook', duration: '26:50', youtubeId: 'SqcY0GlETPk', tier: 'pro', completed: false },
            { id: 15, title: 'useRef Hook', duration: '17:30', youtubeId: 'SqcY0GlETPk', tier: 'pro', completed: false },
            { id: 16, title: 'useMemo va useCallback', duration: '28:20', youtubeId: 'SqcY0GlETPk', tier: 'pro', completed: false },
            { id: 17, title: 'Custom Hooks yaratish', duration: '30:00', youtubeId: 'SqcY0GlETPk', tier: 'pro', completed: false },
          ]
        },
        {
          id: 3,
          title: 'React Router',
          description: 'Single Page Application yaratish',
          lessons: [
            { id: 18, title: 'React Router kirish', duration: '15:20', youtubeId: 'SqcY0GlETPk', tier: 'plus', completed: false },
            { id: 19, title: 'Routes va Navigation', duration: '22:30', youtubeId: 'SqcY0GlETPk', tier: 'plus', completed: false },
            { id: 20, title: 'Dynamic Routes', duration: '19:45', youtubeId: 'SqcY0GlETPk', tier: 'plus', completed: false },
            { id: 21, title: 'Nested Routes', duration: '24:10', youtubeId: 'SqcY0GlETPk', tier: 'pro', completed: false },
            { id: 22, title: 'Protected Routes', duration: '26:30', youtubeId: 'SqcY0GlETPk', tier: 'pro', completed: false },
            { id: 23, title: 'useNavigate va useParams', duration: '18:50', youtubeId: 'SqcY0GlETPk', tier: 'pro', completed: false },
          ]
        },
        {
          id: 4,
          title: 'State Management',
          description: 'Context API va Redux',
          lessons: [
            { id: 24, title: 'Context API', duration: '28:45', youtubeId: 'SqcY0GlETPk', tier: 'pro', completed: false },
            { id: 25, title: 'Redux kirish', duration: '25:20', youtubeId: 'SqcY0GlETPk', tier: 'pro', completed: false },
            { id: 26, title: 'Redux Toolkit', duration: '35:20', youtubeId: 'SqcY0GlETPk', tier: 'pro', completed: false },
            { id: 27, title: 'Redux Slices', duration: '30:15', youtubeId: 'SqcY0GlETPk', tier: 'pro', completed: false },
            { id: 28, title: 'Redux Thunk', duration: '32:40', youtubeId: 'SqcY0GlETPk', tier: 'pro', completed: false },
            { id: 29, title: 'Redux Persist', duration: '22:30', youtubeId: 'SqcY0GlETPk', tier: 'pro', completed: false },
          ]
        },
        {
          id: 5,
          title: 'API Integration',
          description: 'Backend bilan ishlash',
          lessons: [
            { id: 30, title: 'Fetch API', duration: '20:30', youtubeId: 'SqcY0GlETPk', tier: 'plus', completed: false },
            { id: 31, title: 'Axios kutubxonasi', duration: '24:15', youtubeId: 'SqcY0GlETPk', tier: 'plus', completed: false },
            { id: 32, title: 'GET requests', duration: '18:40', youtubeId: 'SqcY0GlETPk', tier: 'plus', completed: false },
            { id: 33, title: 'POST requests', duration: '22:20', youtubeId: 'SqcY0GlETPk', tier: 'plus', completed: false },
            { id: 34, title: 'PUT va DELETE', duration: '19:50', youtubeId: 'SqcY0GlETPk', tier: 'pro', completed: false },
            { id: 35, title: 'Error Handling', duration: '21:30', youtubeId: 'SqcY0GlETPk', tier: 'pro', completed: false },
            { id: 36, title: 'Loading States', duration: '17:20', youtubeId: 'SqcY0GlETPk', tier: 'pro', completed: false },
            { id: 37, title: 'Authentication', duration: '35:40', youtubeId: 'SqcY0GlETPk', tier: 'pro', completed: false },
          ]
        },
        {
          id: 6,
          title: 'Styling',
          description: 'CSS va UI kutubxonalari',
          lessons: [
            { id: 38, title: 'CSS Modules', duration: '16:30', youtubeId: 'SqcY0GlETPk', tier: 'free', completed: false },
            { id: 39, title: 'Styled Components', duration: '24:20', youtubeId: 'SqcY0GlETPk', tier: 'plus', completed: false },
            { id: 40, title: 'Tailwind CSS', duration: '28:45', youtubeId: 'SqcY0GlETPk', tier: 'plus', completed: false },
            { id: 41, title: 'Material-UI', duration: '32:10', youtubeId: 'SqcY0GlETPk', tier: 'pro', completed: false },
            { id: 42, title: 'Chakra UI', duration: '26:30', youtubeId: 'SqcY0GlETPk', tier: 'pro', completed: false },
          ]
        },
        {
          id: 7,
          title: 'Performance Optimization',
          description: 'Ilovani tezlashtirish',
          lessons: [
            { id: 43, title: 'React.memo', duration: '19:20', youtubeId: 'SqcY0GlETPk', tier: 'pro', completed: false },
            { id: 44, title: 'useMemo Hook', duration: '22:40', youtubeId: 'SqcY0GlETPk', tier: 'pro', completed: false },
            { id: 45, title: 'useCallback Hook', duration: '20:15', youtubeId: 'SqcY0GlETPk', tier: 'pro', completed: false },
            { id: 46, title: 'Code Splitting', duration: '25:30', youtubeId: 'SqcY0GlETPk', tier: 'pro', completed: false },
            { id: 47, title: 'Lazy Loading', duration: '23:50', youtubeId: 'SqcY0GlETPk', tier: 'pro', completed: false },
            { id: 48, title: 'React Suspense', duration: '21:20', youtubeId: 'SqcY0GlETPk', tier: 'pro', completed: false },
          ]
        },
        {
          id: 8,
          title: 'Testing',
          description: 'React ilovalarni test qilish',
          lessons: [
            { id: 49, title: 'Testing kirish', duration: '18:30', youtubeId: 'SqcY0GlETPk', tier: 'pro', completed: false },
            { id: 50, title: 'Jest sozlash', duration: '20:15', youtubeId: 'SqcY0GlETPk', tier: 'pro', completed: false },
            { id: 51, title: 'React Testing Library', duration: '28:40', youtubeId: 'SqcY0GlETPk', tier: 'pro', completed: false },
            { id: 52, title: 'Component Testing', duration: '32:20', youtubeId: 'SqcY0GlETPk', tier: 'pro', completed: false },
            { id: 53, title: 'Integration Testing', duration: '35:50', youtubeId: 'SqcY0GlETPk', tier: 'pro', completed: false },
          ]
        },
        {
          id: 9,
          title: 'Real Project',
          description: 'To\'liq loyiha yaratish',
          lessons: [
            { id: 54, title: 'Loyiha rejasi', duration: '22:30', youtubeId: 'SqcY0GlETPk', tier: 'pro', completed: false },
            { id: 55, title: 'Dizayn va struktura', duration: '28:15', youtubeId: 'SqcY0GlETPk', tier: 'pro', completed: false },
            { id: 56, title: 'Authentication tizimi', duration: '42:30', youtubeId: 'SqcY0GlETPk', tier: 'pro', completed: false },
            { id: 57, title: 'CRUD operatsiyalar', duration: '38:45', youtubeId: 'SqcY0GlETPk', tier: 'pro', completed: false },
            { id: 58, title: 'File Upload', duration: '32:20', youtubeId: 'SqcY0GlETPk', tier: 'pro', completed: false },
            { id: 59, title: 'Search va Filter', duration: '29:40', youtubeId: 'SqcY0GlETPk', tier: 'pro', completed: false },
            { id: 60, title: 'Pagination', duration: '24:30', youtubeId: 'SqcY0GlETPk', tier: 'pro', completed: false },
            { id: 61, title: 'Deployment', duration: '35:20', youtubeId: 'SqcY0GlETPk', tier: 'pro', completed: false },
          ]
        }
      ]
    });
  }, [id]);

  const getTierBadge = (tier) => {
    const badges = {
      free: { color: 'bg-green-500', text: 'FREE', ring: 'ring-green-500' },
      plus: { color: 'bg-blue-500', text: 'PLUS', ring: 'ring-blue-500' },
      pro: { color: 'bg-purple-500', text: 'PRO', ring: 'ring-purple-500' }
    };
    return badges[tier];
  };

  const canAccessLesson = (tier) => {
    if (!user) return tier === 'free';
    if (!user.subscription) return tier === 'free';
    
    const tierLevels = { free: 0, plus: 1, pro: 2 };
    return tierLevels[user.subscription] >= tierLevels[tier];
  };

  const handleLessonClick = (lesson) => {
    if (!isAuthenticated) {
      navigate('/register');
      return;
    }

    if (!canAccessLesson(lesson.tier)) {
      navigate('/pricing');
      return;
    }

    navigate(`/watch/${lesson.id}`, { state: { lesson, course } });
  };

  const toggleModule = (moduleId) => {
    setExpandedModules(prev => 
      prev.includes(moduleId) 
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  if (!course) return (
    <div className="container mx-auto px-4 py-12 text-center">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary mx-auto"></div>
      <p className="mt-4 text-gray-400">Yuklanmoqda...</p>
    </div>
  );

  const totalFreeLessons = course.modules.reduce((acc, mod) => 
    acc + mod.lessons.filter(l => l.tier === 'free').length, 0
  );
  const totalPlusLessons = course.modules.reduce((acc, mod) => 
    acc + mod.lessons.filter(l => l.tier === 'plus').length, 0
  );
  const totalProLessons = course.modules.reduce((acc, mod) => 
    acc + mod.lessons.filter(l => l.tier === 'pro').length, 0
  );

  return (
    <div className="min-h-screen">
      {/* Course Header */}
      <div className="bg-gradient-to-r from-primary to-secondary py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="animate-slide-in-up">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{course.title}</h1>
              <p className="text-lg mb-6 text-gray-100">{course.description}</p>
              <div className="flex flex-wrap items-center gap-6 text-sm mb-6">
                <span className="flex items-center bg-white/20 px-4 py-2 rounded-lg">
                  <FaStar className="text-yellow-400 mr-2" />
                  {course.rating} rating
                </span>
                <span className="flex items-center bg-white/20 px-4 py-2 rounded-lg">
                  <FaUsers className="mr-2" />
                  {course.students} o'quvchi
                </span>
                <span className="flex items-center bg-white/20 px-4 py-2 rounded-lg">
                  <FaBook className="mr-2" />
                  {course.totalLessons} dars
                </span>
                <span className="flex items-center bg-white/20 px-4 py-2 rounded-lg">
                  <FaClock className="mr-2" />
                  {course.totalDuration}
                </span>
              </div>
              <div className="flex flex-wrap gap-3">
                <span className="bg-green-500 px-4 py-2 rounded-lg font-semibold">
                  {totalFreeLessons} FREE dars
                </span>
                <span className="bg-blue-500 px-4 py-2 rounded-lg font-semibold">
                  {totalPlusLessons} PLUS dars
                </span>
                <span className="bg-purple-500 px-4 py-2 rounded-lg font-semibold">
                  {totalProLessons} PRO dars
                </span>
              </div>
            </div>
            <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl animate-scale-in">
              <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8">Kurs tarkibi</h2>
        
        <div className="space-y-4">
          {course.modules.map((module, index) => {
            const isExpanded = expandedModules.includes(module.id);
            
            return (
              <div key={module.id} className="card animate-slide-in-up" style={{ animationDelay: `${index * 0.05}s` }}>
                <button
                  onClick={() => toggleModule(module.id)}
                  className="w-full p-6 bg-gray-700 hover:bg-gray-600 transition flex items-center justify-between"
                >
                  <div className="text-left">
                    <h3 className="text-xl font-bold mb-1">{module.title}</h3>
                    <p className="text-sm text-gray-400">{module.description} • {module.lessons.length} dars</p>
                  </div>
                  <div className={`transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>
                
                {isExpanded && (
                  <div className="divide-y divide-gray-700">
                    {module.lessons.map((lesson) => {
                      const canAccess = canAccessLesson(lesson.tier);
                      const badge = getTierBadge(lesson.tier);
                      
                      return (
                        <div
                          key={lesson.id}
                          onClick={() => handleLessonClick(lesson)}
                          className={`p-4 flex items-center justify-between ${
                            canAccess ? 'hover:bg-gray-700 cursor-pointer' : 'opacity-60'
                          } transition group`}
                        >
                          <div className="flex items-center space-x-4 flex-1">
                            <div className={`w-12 h-12 rounded-full ${canAccess ? 'bg-primary' : 'bg-gray-600'} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition`}>
                              {canAccess ? <FaPlay className="text-lg" /> : <FaLock className="text-lg" />}
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold">{lesson.title}</h4>
                              <div className="flex items-center space-x-3 text-sm text-gray-400 mt-1">
                                <span className="flex items-center">
                                  <FaClock className="mr-1" />
                                  {lesson.duration}
                                </span>
                                <span className={`${badge.color} text-white text-xs px-2 py-1 rounded`}>
                                  {badge.text}
                                </span>
                              </div>
                            </div>
                          </div>
                          {!canAccess && (
                            <Link to="/pricing" className="btn-primary text-sm px-4 py-2">
                              Obuna
                            </Link>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
