import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaClock, FaVideo, FaStar } from 'react-icons/fa';

const Courses = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'Hammasi' },
    { id: 'react', name: 'React' },
    { id: 'nextjs', name: 'Next.js' },
    { id: 'typescript', name: 'TypeScript' },
    { id: 'html-css', name: 'HTML/CSS' },
    { id: 'tailwind', name: 'Tailwind CSS' },
    { id: 'react-native', name: 'React Native' },
  ];

  const courses = [
    {
      id: 1,
      title: 'React.js - To\'liq kurs',
      category: 'react',
      description: 'React.js ni 0 dan professional darajagacha o\'rganing',
      duration: '40 soat',
      lessons: 120,
      thumbnail: 'https://img.youtube.com/vi/SqcY0GlETPk/maxresdefault.jpg',
      tier: 'free',
      rating: 4.8,
      students: 1250,
    },
    {
      id: 2,
      title: 'Next.js - Full Stack',
      category: 'nextjs',
      description: 'Next.js bilan zamonaviy web ilovalar yarating',
      duration: '35 soat',
      lessons: 95,
      thumbnail: 'https://img.youtube.com/vi/Sklc_fQBmcs/maxresdefault.jpg',
      tier: 'plus',
      rating: 4.9,
      students: 890,
    },
    {
      id: 3,
      title: 'TypeScript Asoslari',
      category: 'typescript',
      description: 'TypeScript ni chuqur o\'rganing',
      duration: '25 soat',
      lessons: 70,
      thumbnail: 'https://img.youtube.com/vi/BwuLxPH8IDs/maxresdefault.jpg',
      tier: 'plus',
      rating: 4.7,
      students: 650,
    },
    {
      id: 4,
      title: 'HTML & CSS - Amaliy',
      category: 'html-css',
      description: 'Web development asoslari',
      duration: '30 soat',
      lessons: 85,
      thumbnail: 'https://img.youtube.com/vi/G3e-cpL7ofc/maxresdefault.jpg',
      tier: 'free',
      rating: 4.6,
      students: 2100,
    },
    {
      id: 5,
      title: 'Tailwind CSS Master',
      category: 'tailwind',
      description: 'Tailwind CSS bilan tez va chiroyli dizayn',
      duration: '20 soat',
      lessons: 60,
      thumbnail: 'https://img.youtube.com/vi/pfaSUYaSgRo/maxresdefault.jpg',
      tier: 'plus',
      rating: 4.8,
      students: 780,
    },
    {
      id: 6,
      title: 'React Native - Mobile',
      category: 'react-native',
      description: 'iOS va Android ilovalar yarating',
      duration: '45 soat',
      lessons: 130,
      thumbnail: 'https://img.youtube.com/vi/0-S5a0eXPoc/maxresdefault.jpg',
      tier: 'pro',
      rating: 4.9,
      students: 450,
    },
  ];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Kurslar</h1>

      {/* Search and Filter */}
      <div className="mb-8 space-y-4">
        <div className="relative">
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Kurs qidirish..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="flex flex-wrap gap-3">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-lg transition ${
                selectedCategory === cat.id
                  ? 'bg-primary text-white'
                  : 'bg-gray-800 hover:bg-gray-700'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map(course => {
          const tierBadge = {
            free: { color: 'bg-green-500', text: 'FREE' },
            plus: { color: 'bg-blue-500', text: 'PLUS' },
            pro: { color: 'bg-purple-500', text: 'PRO' }
          }[course.tier];

          return (
            <Link key={course.id} to={`/course/${course.id}`} className="card group">
              <div className="aspect-video bg-gray-700 overflow-hidden">
                <img 
                  src={course.thumbnail} 
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4 md:p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs md:text-sm text-primary font-semibold">
                    {categories.find(c => c.id === course.category)?.name}
                  </span>
                  <span className={`text-xs ${tierBadge.color} text-white px-2 py-1 rounded`}>
                    {tierBadge.text}
                  </span>
                </div>
                <h3 className="text-lg md:text-xl font-bold mb-2 group-hover:text-primary transition line-clamp-2">
                  {course.title}
                </h3>
                <p className="text-sm md:text-base text-gray-400 mb-4 line-clamp-2">{course.description}</p>
                <div className="flex items-center justify-between text-xs md:text-sm text-gray-400">
                  <span className="flex items-center">
                    <FaClock className="mr-1 md:mr-2" />
                    {course.duration}
                  </span>
                  <span className="flex items-center">
                    <FaVideo className="mr-1 md:mr-2" />
                    {course.lessons} dars
                  </span>
                </div>
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-700">
                  <span className="flex items-center text-yellow-400 text-sm">
                    <FaStar className="mr-1" />
                    {course.rating}
                  </span>
                  <span className="text-gray-400 text-xs md:text-sm">{course.students} o'quvchi</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Courses;
