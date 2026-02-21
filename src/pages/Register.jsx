import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaInstagram, FaTelegram, FaYoutube, FaExternalLinkAlt, FaCheckCircle, FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import Toast from '../components/Toast';
import { useToast } from '../hooks/useToast';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toasts, showToast, removeToast } = useToast();

  const socialLinks = {
    instagram: 'https://www.instagram.com/aidevix?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==',
    telegram: 'https://t.me/aidevix',
    youtube: 'https://youtube.com/@aidevix'
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      showToast('Parollar mos kelmadi!', 'error');
      return;
    }

    if (formData.password.length < 6) {
      showToast('Parol kamida 6 ta belgidan iborat bo\'lishi kerak!', 'error');
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      showToast('✅ Ro\'yxatdan o\'tish muvaffaqiyatli! Xush kelibsiz! 🎉', 'success', 3000);
      
      // Show reminder about social media
      setTimeout(() => {
        showToast('💡 Eslatma: Barcha videolarni ko\'rish uchun ijtimoiy tarmoqlarga obuna bo\'ling!', 'info', 5000);
      }, 1000);
      
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Info */}
        <div className="hidden lg:block animate-slide-in-up">
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            AIDEVIX ga xush kelibsiz!
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Professional dasturchi bo'lish yo'lingizni bugun boshlang
          </p>
          <div className="space-y-4">
            {[
              '1000+ faol o\'quvchilar',
              '50+ professional kurslar',
              '500+ video darslar',
              'Sertifikat olish imkoniyati'
            ].map((item, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <FaCheckCircle className="text-primary" />
                </div>
                <span className="text-gray-300">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="card p-8 animate-scale-in">
          <h2 className="text-3xl font-bold text-center mb-2">Ro'yxatdan o'tish</h2>
          <p className="text-center text-gray-400 mb-8">Hisob yarating va o'rganishni boshlang</p>
          
          {/* Social Media Info */}
          <div className="mb-6 p-5 rounded-xl bg-gradient-to-r from-pink-500/10 to-purple-500/10 border-2 border-pink-500/30">
            <div className="flex items-center justify-between mb-3">
              <p className="font-semibold text-lg">
                📢 Bizni kuzatib boring!
              </p>
            </div>
            <p className="text-sm text-gray-300 mb-4">
              Yangi darslar va qiziqarli kontentlardan xabardor bo'lish uchun ijtimoiy tarmoqlarimizga obuna bo'ling
            </p>
            
            <div className="space-y-3">
              {[
                { key: 'instagram', icon: FaInstagram, name: 'Instagram', link: socialLinks.instagram, color: 'pink' },
                { key: 'telegram', icon: FaTelegram, name: 'Telegram', link: socialLinks.telegram, color: 'blue' },
                { key: 'youtube', icon: FaYoutube, name: 'YouTube', link: socialLinks.youtube, color: 'red' }
              ].map(({ key, icon: Icon, name, link, color }) => (
                <a
                  key={key}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition-all group"
                >
                  <div className="flex items-center space-x-3">
                    <Icon className={`text-${color}-500 text-2xl`} />
                    <span className="font-medium">{name} @aidevix</span>
                  </div>
                  <div className={`text-sm py-2 px-4 flex items-center bg-gradient-to-r from-${color}-500 to-${color}-600 rounded-lg group-hover:scale-105 transition`}>
                    Obuna <FaExternalLinkAlt className="ml-2 text-xs" />
                  </div>
                </a>
              ))}
            </div>

            <div className="mt-4 p-3 bg-blue-900/20 border border-blue-500/30 rounded-lg">
              <p className="text-sm text-blue-200">
                💡 Obuna bo'lmasangiz ham ro'yxatdan o'tishingiz mumkin, lekin ba'zi videolar cheklangan bo'ladi.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block mb-2 font-semibold flex items-center">
                <FaUser className="mr-2 text-primary" />
                Ism
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition"
                placeholder="Ismingizni kiriting"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block mb-2 font-semibold flex items-center">
                <FaEnvelope className="mr-2 text-primary" />
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-4 py-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition"
                placeholder="email@example.com"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block mb-2 font-semibold flex items-center">
                <FaLock className="mr-2 text-primary" />
                Parol
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full px-4 py-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition"
                placeholder="Kamida 6 ta belgi"
                required
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block mb-2 font-semibold flex items-center">
                <FaLock className="mr-2 text-primary" />
                Parolni tasdiqlash
              </label>
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                className="w-full px-4 py-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition"
                placeholder="Parolni qayta kiriting"
                required
              />
            </div>

            <button 
              type="submit" 
              className="w-full btn-primary py-4 text-lg font-bold disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Ro'yxatdan o'tmoqda...
                </span>
              ) : (
                'Ro\'yxatdan o\'tish'
              )}
            </button>
          </form>

          <p className="text-center mt-6 text-gray-400">
            Akkauntingiz bormi?{' '}
            <Link to="/login" className="text-primary hover:underline font-semibold">
              Kirish
            </Link>
          </p>
        </div>
      </div>

      {/* Toasts */}
      {toasts.map(toast => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
};

export default Register;
