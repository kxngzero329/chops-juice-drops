// Header.jsx - Fixed with proper theme handling
import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';

const Header = ({ onCartOpen, cartCount }) => {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const mobileMenuRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 100;
      setScrolled(isScrolled);
    };

    const handleClickOutside = (event) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target) && 
          !event.target.closest('.mobile-menu-toggle')) {
        setShowMobileMenu(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);

    // Set initial scroll state
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [location.pathname]);

  // Apply theme class to body for CSS targeting
  useEffect(() => {
    document.body.className = theme + '-mode';
  }, [theme]);

  // Handle body scroll locking when mobile menu is open
  useEffect(() => {
    if (showMobileMenu) {
      document.body.classList.add('mobile-menu-open');
    } else {
      document.body.classList.remove('mobile-menu-open');
    }
    
    return () => {
      document.body.classList.remove('mobile-menu-open');
    };
  }, [showMobileMenu]);

  const scrollToSection = (sectionId) => {
    if (location.pathname === '/') {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.location.href = `/#${sectionId}`;
    }
    setShowMobileMenu(false);
  };

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  const closeMobileMenu = () => {
    setShowMobileMenu(false);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  // Determine header class based on scroll
  const headerClass = scrolled ? 'scrolled' : '';

  return (
    <>
      <header className={headerClass}>
        <div className="container header-content">
          <Link to="/" className="logo" onClick={closeMobileMenu}>
            <img 
              src="/images/Gemini_Generated_Image_sn6sq8sn6sq8sn6s.png" 
              alt="Chops Juice Drops" 
              className="light-logo" 
            />
            <img 
              src="/images/Logo-removebg-preview.png" 
              alt="Chops Juice Drops" 
              className="dark-logo" 
            />
          </Link>
          
          <nav ref={mobileMenuRef}>
            {/* Mobile Menu Overlay */}
            <div className={`mobile-menu-overlay ${showMobileMenu ? 'active' : ''}`} onClick={closeMobileMenu}></div>
            
            {/* Mobile Menu */}
            <div className={`mobile-menu-panel ${showMobileMenu ? 'active' : ''}`}>
              <div className="mobile-menu-header">
                <Link to="/" className="mobile-logo" onClick={closeMobileMenu}>
                  <img 
                    src={theme === 'light' ? "/images/Gemini_Generated_Image_sn6sq8sn6sq8sn6s.png" : "/images/Logo-removebg-preview.png"} 
                    alt="Chops Juice Drops" 
                  />
                </Link>
                <button 
                  className="mobile-menu-close"
                  onClick={closeMobileMenu}
                  aria-label="Close menu"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>

              <ul className="mobile-nav-list">
                <li>
                  <Link 
                    to="/" 
                    className={isActive('/') ? 'active' : ''}
                    onClick={closeMobileMenu}
                  >
                    <i className="fas fa-home"></i> Home
                  </Link>
                </li>
                
                <li>
                  <Link 
                    to="/shop"
                    className={isActive('/shop') ? 'active' : ''}
                    onClick={closeMobileMenu}
                  >
                    <i className="fas fa-shopping-bag"></i> Shop
                  </Link>
                </li>
                
                {/* Home page only links */}
                {location.pathname === '/' && (
                  <>
                    <li>
                      <a href="#categories" onClick={(e) => { e.preventDefault(); scrollToSection('categories'); }}>
                        <i className="fas fa-th-large"></i> Categories
                      </a>
                    </li>
                    <li>
                      <a href="#products" onClick={(e) => { e.preventDefault(); scrollToSection('products'); }}>
                        <i className="fas fa-star"></i> Best Sellers
                      </a>
                    </li>
                    <li>
                      <a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}>
                        <i className="fas fa-info-circle"></i> About
                      </a>
                    </li>
                    <li>
                      <a href="#testimonials" onClick={(e) => { e.preventDefault(); scrollToSection('testimonials'); }}>
                        <i className="fas fa-comments"></i> Reviews
                      </a>
                    </li>
                  </>
                )}
              </ul>

              <div className="mobile-menu-footer">
                <div className="mobile-actions">
                  <button 
                    className="mobile-cart-btn"
                    onClick={() => {
                      onCartOpen();
                      closeMobileMenu();
                    }}
                  >
                    <i className="fas fa-shopping-cart"></i>
                    <span className="mobile-cart-count">{cartCount}</span>
                    Cart
                  </button>
                  
                  <button 
                    className="mobile-theme-toggle"
                    onClick={() => {
                      toggleTheme();
                      closeMobileMenu();
                    }}
                  >
                    <i className={theme === 'light' ? 'fas fa-moon' : 'fas fa-sun'}></i>
                    {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
                  </button>
                </div>
              </div>
            </div>
          </nav>
          
          {/* Desktop Navigation */}
          <ul className="desktop-nav">
            <li>
              <Link 
                to="/" 
                className={isActive('/') ? 'active' : ''}
              >
                Home
              </Link>
            </li>
            
            <li>
              <Link 
                to="/shop"
                className={isActive('/shop') ? 'active' : ''}
              >
                Shop
              </Link>
            </li>
            
            {location.pathname === '/' && (
              <>
                <li>
                  <a href="#categories" onClick={(e) => { e.preventDefault(); scrollToSection('categories'); }}>
                    Categories
                  </a>
                </li>
                <li>
                  <a href="#products" onClick={(e) => { e.preventDefault(); scrollToSection('products'); }}>
                    Best Sellers
                  </a>
                </li>
                <li>
                  <a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}>
                    About
                  </a>
                </li>
                <li>
                  <a href="#testimonials" onClick={(e) => { e.preventDefault(); scrollToSection('testimonials'); }}>
                    Reviews
                  </a>
                </li>
              </>
            )}
          </ul>

          <div className="header-actions">
            <button 
              className="theme-toggle" 
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              <i className={theme === 'light' ? 'fas fa-moon' : 'fas fa-sun'}></i>
            </button>
            
            <div className="cart-icon" onClick={onCartOpen}>
              <i className="fas fa-shopping-cart"></i>
              <span className="cart-count">{cartCount}</span>
            </div>

            <button 
              className="mobile-menu-toggle"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              <i className="fas fa-bars"></i>
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;