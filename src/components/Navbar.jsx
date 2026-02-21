import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import { FaUser, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    setIsMobileMenuOpen(false);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-gray-900 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="text-2xl md:text-3xl font-bold text-primary" onClick={closeMobileMenu}>
            AIDEVIX
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="hover:text-primary transition">Bosh sahifa</Link>
            <Link to="/courses" className="hover:text-primary transition">Kurslar</Link>
            <Link to="/pricing" className="hover:text-primary transition">Tariflar</Link>
            <Link to="/about" className="hover:text-primary transition">Biz haqimizda</Link>
          </div>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link to="/profile" className="flex items-center space-x-2 hover:text-primary transition">
                  <FaUser />
                  <span>{user?.name || 'Profil'}</span>
                </Link>
                <button onClick={handleLogout} className="flex items-center space-x-2 hover:text-red-500 transition">
                  <FaSignOutAlt />
                  <span>Chiqish</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-primary transition">Kirish</Link>
                <Link to="/register" className="btn-primary">Ro'yxatdan o'tish</Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-2xl hover:text-primary transition"
          >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 animate-slide-in-up">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="hover:text-primary transition py-2 border-b border-gray-800"
                onClick={closeMobileMenu}
              >
                Bosh sahifa
              </Link>
              <Link 
                to="/courses" 
                className="hover:text-primary transition py-2 border-b border-gray-800"
                onClick={closeMobileMenu}
              >
                Kurslar
              </Link>
              <Link 
                to="/pricing" 
                className="hover:text-primary transition py-2 border-b border-gray-800"
                onClick={closeMobileMenu}
              >
                Tariflar
              </Link>
              <Link 
                to="/about" 
                className="hover:text-primary transition py-2 border-b border-gray-800"
                onClick={closeMobileMenu}
              >
                Biz haqimizda
              </Link>

              {isAuthenticated ? (
                <>
                  <Link 
                    to="/profile" 
                    className="flex items-center space-x-2 hover:text-primary transition py-2 border-b border-gray-800"
                    onClick={closeMobileMenu}
                  >
                    <FaUser />
                    <span>{user?.name || 'Profil'}</span>
                  </Link>
                  <button 
                    onClick={handleLogout} 
                    className="flex items-center space-x-2 hover:text-red-500 transition py-2 text-left"
                  >
                    <FaSignOutAlt />
                    <span>Chiqish</span>
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className="hover:text-primary transition py-2 border-b border-gray-800"
                    onClick={closeMobileMenu}
                  >
                    Kirish
                  </Link>
                  <Link 
                    to="/register" 
                    className="btn-primary text-center"
                    onClick={closeMobileMenu}
                  >
                    Ro'yxatdan o'tish
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
