import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaUser, FaShoppingCart, FaTimes, FaBars } from 'react-icons/fa';
import LOGO from "../assets/logo.png";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [email, setEmail] = useState(localStorage.getItem('email'));
  const [showLogout, setShowLogout] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowLogout(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('email');
    setEmail(null);
    setShowLogout(false);
  };

  const navLinks = [
    { path: "/", text: "Home" },
    { path: "/shop", text: "Shop" },
    { path: "/wishlist", text: "Wishlist" },
    { path: "/blog", text: "Blog" },
    { path: "/about", text: "About" },
    { path: "/contact", text: "Contact" }
  ];

  return (
    <header className="bg-[#e7ceb4] shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img src={LOGO} alt="Logo" className="h-10" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <div key={link.path} className="relative">
              <Link 
                to={link.path} 
                className={`text-[#1a1a1a] text-base font-semibold hover:text-[#088178] transition-colors duration-300 ${
                  location.pathname === link.path ? 'text-[#088178]' : ''
                }`}
              >
                {link.text}
              </Link>
              {(location.pathname === link.path || mobileMenuOpen) && (
                <div className="absolute bottom-[-6px] left-1/2 transform -translate-x-1/2 w-[30%] h-[2px] bg-[#088178]"></div>
              )}
            </div>
          ))}
        </nav>

        {/* Icons */}
        <div className="flex items-center space-x-6 relative">
          {email ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowLogout(prev => !prev)}
                className="flex items-center text-[#1a1a1a] hover:text-[#088178] transition-colors duration-300"
              >
                <FaUser className="mr-1" />
                <span>{email}</span>
              </button>
              {showLogout && (
                <div className="absolute top-8 right-0 bg-white shadow-lg rounded-md px-4 py-2 text-sm text-[#1a1a1a] z-50">
                  <button 
                    onClick={handleLogout} 
                    className="hover:text-red-500 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link 
              to="/login" 
              className="text-[#1a1a1a] hover:text-[#088178] transition-colors duration-300"
            >
              <FaUser className="text-xl" />
            </Link>
          )}

          <Link 
            to="/cart" 
            className="text-[#1a1a1a] hover:text-[#088178] transition-colors duration-300"
          >
            <FaShoppingCart className="text-xl" />
          </Link>

          <button 
            className="md:hidden text-[#1a1a1a] hover:text-[#088178] transition-colors duration-300"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 right-0 bg-[#e7ceb4] shadow-lg py-4 px-6">
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <div key={link.path} className="relative">
                  <Link 
                    to={link.path} 
                    className={`text-[#1a1a1a] text-base font-semibold hover:text-[#088178] transition-colors duration-300 ${
                      location.pathname === link.path ? 'text-[#088178]' : ''
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.text}
                  </Link>
                  {location.pathname === link.path && (
                    <div className="absolute bottom-[-6px] left-0 w-[30%] h-[2px] bg-[#088178]"></div>
                  )}
                </div>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
