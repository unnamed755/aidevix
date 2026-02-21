import { Link } from 'react-router-dom';
import { FaPlay, FaGraduationCap, FaCertificate, FaUsers, FaInstagram } from 'react-icons/fa';

const Home = () => {
  const instagramReels = [
    {
      id: 1,
      url: 'https://www.instagram.com/reel/DCwZqJqoXMN/',
      title: 'React Tips'
    },
    {
      id: 2,
      url: 'https://www.instagram.com/reel/DCt0sFqIqYu/',
      title: 'JavaScript Tricks'
    },
    {
      id: 3,
      url: 'https://www.instagram.com/reel/DCrPxqMIBYu/',
      title: 'CSS Magic'
    },
    {
      id: 4,
      url: 'https://www.instagram.com/reel/DCopqJMIqYu/',
      title: 'Web Dev'
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 md:py-20">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            AIDEVIX bilan dasturlashni o'rganing
          </h1>
          <p className="text-base md:text-xl text-gray-300 mb-6 md:mb-8 px-4">
            Professional dasturlash kurslari va amaliy loyihalar orqali karyerangizni boshlang
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4 px-4">
            <Link to="/courses" className="btn-primary text-base md:text-lg">
              <FaPlay className="inline mr-2" />
              Kurslarni ko'rish
            </Link>
            <Link to="/pricing" className="btn-secondary text-base md:text-lg">
              Tariflar
            </Link>
            <a 
              href="https://www.instagram.com/aidevix?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-2 px-4 md:px-6 rounded-lg transition-all duration-300 flex items-center justify-center text-base md:text-lg"
            >
              <FaInstagram className="inline mr-2" />
              Instagram
            </a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-8">
          <div className="card p-6 md:p-8 text-center hover:scale-105 transition-transform">
            <div className="text-3xl md:text-5xl font-bold text-primary mb-2">1000+</div>
            <p className="text-sm md:text-base text-gray-400">Faol o'quvchilar</p>
          </div>
          <div className="card p-6 md:p-8 text-center hover:scale-105 transition-transform">
            <div className="text-3xl md:text-5xl font-bold text-secondary mb-2">50+</div>
            <p className="text-sm md:text-base text-gray-400">Video kurslar</p>
          </div>
          <div className="card p-6 md:p-8 text-center hover:scale-105 transition-transform">
            <div className="text-3xl md:text-5xl font-bold text-primary mb-2">500+</div>
            <p className="text-sm md:text-base text-gray-400">Video darslar</p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-12 md:py-16">
        <h2 className="text-2xl md:text-4xl font-bold text-center mb-8 md:mb-12">Nima uchun AIDEVIX?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <div className="card p-6 md:p-8 text-center hover:shadow-2xl transition-shadow">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-r from-primary to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
              <FaGraduationCap className="text-3xl md:text-4xl text-white" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-3">Professional ta'lim</h3>
            <p className="text-sm md:text-base text-gray-400">React, Next.js, TypeScript va boshqa zamonaviy texnologiyalarni o'rganing</p>
          </div>

          <div className="card p-6 md:p-8 text-center hover:shadow-2xl transition-shadow">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-r from-secondary to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
              <FaCertificate className="text-3xl md:text-4xl text-white" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-3">Sertifikat</h3>
            <p className="text-sm md:text-base text-gray-400">Kursni tugatganingizdan keyin rasmiy sertifikat oling</p>
          </div>

          <div className="card p-6 md:p-8 text-center hover:shadow-2xl transition-shadow">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-r from-primary to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
              <FaUsers className="text-3xl md:text-4xl text-white" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-3">Kuchli jamoa</h3>
            <p className="text-sm md:text-base text-gray-400">Tajribali mentorlar va faol o'quvchilar jamoasiga qo'shiling</p>
          </div>
        </div>
      </section>

      {/* Instagram Reels Section */}
      <section className="bg-gradient-to-b from-gray-900 to-black py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-4xl font-bold mb-3 md:mb-4">Instagram Reels</h2>
            <p className="text-sm md:text-base text-gray-400 mb-4 md:mb-6">Qisqa va foydali dasturlash maslahatlar</p>
            <a 
              href="https://www.instagram.com/aidevix?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-2 md:py-3 px-6 md:px-8 rounded-lg transition-all duration-300 text-sm md:text-base"
            >
              <FaInstagram className="mr-2 text-lg md:text-xl" />
              @aidevix ga obuna bo'ling
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
            {instagramReels.map((reel) => (
              <a
                key={reel.id}
                href={reel.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative aspect-[9/16] rounded-lg md:rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-purple-600/20 flex items-center justify-center">
                  <FaInstagram className="text-4xl md:text-6xl text-white/30" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 md:p-6">
                    <FaPlay className="text-2xl md:text-4xl text-white" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-2 md:p-4 z-20">
                  <p className="text-white font-semibold text-xs md:text-sm">{reel.title}</p>
                  <p className="text-gray-300 text-xs flex items-center mt-1">
                    <FaInstagram className="mr-1" />
                    Instagram Reel
                  </p>
                </div>
                <div className="absolute top-2 right-2 md:top-4 md:right-4 z-20">
                  <FaInstagram className="text-2xl md:text-3xl text-pink-500 drop-shadow-lg" />
                </div>
              </a>
            ))}
          </div>

          <div className="text-center mt-6 md:mt-8">
            <p className="text-sm md:text-base text-gray-400">
              Ko'proq videolar uchun Instagram sahifamizga tashrif buyuring
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="card p-8 md:p-12 text-center bg-gradient-to-r from-primary to-secondary">
          <h2 className="text-2xl md:text-4xl font-bold mb-3 md:mb-4">Bugun boshlang!</h2>
          <p className="text-base md:text-xl mb-6 md:mb-8 text-gray-100">
            Professional dasturchi bo'lish yo'lingizni hoziroq boshlang
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4">
            <Link to="/register" className="bg-white text-primary hover:bg-gray-100 font-semibold py-2 md:py-3 px-6 md:px-8 rounded-lg transition text-base md:text-lg">
              Ro'yxatdan o'tish
            </Link>
            <Link to="/courses" className="bg-transparent border-2 border-white hover:bg-white hover:text-primary font-semibold py-2 md:py-3 px-6 md:px-8 rounded-lg transition text-base md:text-lg">
              Kurslarni ko'rish
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
