import { useState } from 'react';
import { FaUsers, FaVideo, FaBook, FaChartLine, FaPlus } from 'react-icons/fa';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = {
    totalUsers: 1250,
    totalCourses: 12,
    totalVideos: 450,
    totalRevenue: 15000000
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Admin Panel</h1>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Foydalanuvchilar</p>
                <p className="text-3xl font-bold">{stats.totalUsers}</p>
              </div>
              <FaUsers className="text-4xl text-primary" />
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Kurslar</p>
                <p className="text-3xl font-bold">{stats.totalCourses}</p>
              </div>
              <FaBook className="text-4xl text-secondary" />
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Videolar</p>
                <p className="text-3xl font-bold">{stats.totalVideos}</p>
              </div>
              <FaVideo className="text-4xl text-primary" />
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Daromad</p>
                <p className="text-2xl font-bold">{(stats.totalRevenue / 1000000).toFixed(1)}M</p>
              </div>
              <FaChartLine className="text-4xl text-green-500" />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="card mb-8">
          <div className="flex border-b border-gray-700">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-6 py-4 font-semibold ${
                activeTab === 'overview'
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-gray-400'
              }`}
            >
              Umumiy
            </button>
            <button
              onClick={() => setActiveTab('courses')}
              className={`px-6 py-4 font-semibold ${
                activeTab === 'courses'
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-gray-400'
              }`}
            >
              Kurslar
            </button>
            <button
              onClick={() => setActiveTab('videos')}
              className={`px-6 py-4 font-semibold ${
                activeTab === 'videos'
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-gray-400'
              }`}
            >
              Videolar
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`px-6 py-4 font-semibold ${
                activeTab === 'users'
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-gray-400'
              }`}
            >
              Foydalanuvchilar
            </button>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Umumiy ko'rinish</h2>
                <p className="text-gray-400">Platforma statistikasi va hisobotlar</p>
              </div>
            )}

            {activeTab === 'courses' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">Kurslar</h2>
                  <button className="btn-primary flex items-center">
                    <FaPlus className="mr-2" />
                    Yangi kurs
                  </button>
                </div>
                <div className="space-y-4">
                  <div className="bg-gray-800 p-4 rounded-lg flex justify-between items-center">
                    <div>
                      <h3 className="font-bold">React.js - To'liq kurs</h3>
                      <p className="text-sm text-gray-400">120 dars • 1250 o'quvchi</p>
                    </div>
                    <div className="flex space-x-2">
                      <button className="px-4 py-2 bg-blue-600 rounded-lg">Tahrirlash</button>
                      <button className="px-4 py-2 bg-red-600 rounded-lg">O'chirish</button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'videos' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">Videolar</h2>
                  <button className="btn-primary flex items-center">
                    <FaPlus className="mr-2" />
                    Yangi video
                  </button>
                </div>
                <p className="text-gray-400">Video boshqaruv paneli</p>
              </div>
            )}

            {activeTab === 'users' && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Foydalanuvchilar</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-800">
                      <tr>
                        <th className="px-4 py-3 text-left">Ism</th>
                        <th className="px-4 py-3 text-left">Email</th>
                        <th className="px-4 py-3 text-left">Tarif</th>
                        <th className="px-4 py-3 text-left">Ro'yxatdan o'tgan</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                      <tr className="hover:bg-gray-800">
                        <td className="px-4 py-3">Test User</td>
                        <td className="px-4 py-3">test@example.com</td>
                        <td className="px-4 py-3">
                          <span className="bg-purple-600 px-2 py-1 rounded text-sm">PRO</span>
                        </td>
                        <td className="px-4 py-3">2026-01-15</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
