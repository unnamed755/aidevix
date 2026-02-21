import { FaInstagram, FaTelegram, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 mt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold text-primary mb-4">AIDEVIX</h3>
            <p className="text-gray-400">Professional dasturlash kurslari platformasi</p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Havolalar</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/courses" className="hover:text-primary transition">Kurslar</a></li>
              <li><a href="/pricing" className="hover:text-primary transition">Tariflar</a></li>
              <li><a href="/about" className="hover:text-primary transition">Biz haqimizda</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Ijtimoiy tarmoqlar</h4>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/aidevix?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" 
                 className="text-2xl hover:text-pink-500 transition">
                <FaInstagram />
              </a>
              <a href="https://t.me/aidevix" target="_blank" rel="noopener noreferrer"
                 className="text-2xl hover:text-blue-400 transition">
                <FaTelegram />
              </a>
              <a href="https://youtube.com/@aidevix" target="_blank" rel="noopener noreferrer"
                 className="text-2xl hover:text-red-500 transition">
                <FaYoutube />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2026 AIDEVIX. Barcha huquqlar himoyalangan.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
