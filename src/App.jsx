// App.jsx - Fixed Warning Banner
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useCart } from './hooks/useCart';
import AgeVerification from './components/AgeVerification';
import Header from './components/Header';
import Hero from './components/Hero';
import Categories from './components/Categories';
import Products from './components/Products';
import Shop from './components/Shop';
import About from './components/About';
import Testimonials from './components/Testimonials';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import CartModal from './components/CartModal';
import ScrollToTop from './components/ScrollToTop';

function App() {
  const { cart, addToCart, removeFromCart, updateQuantity, getCartTotal, sendWhatsAppOrder, getCartCount } = useCart();
  const [showCartModal, setShowCartModal] = useState(false);
  const [showAgeModal, setShowAgeModal] = useState(false);
  const [ageVerified, setAgeVerified] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  // Clear localStorage on hard refresh (Ctrl + Shift + R)
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.shiftKey && event.key === 'R') {
        console.log('Hard refresh detected - clearing age verification');
        localStorage.removeItem('ageVerified');
        localStorage.removeItem('userCart');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Check age verification on component mount
  useEffect(() => {
    const isAgeVerified = localStorage.getItem('ageVerified') === 'true';
    console.log('Age verification check:', isAgeVerified);
    
    setAgeVerified(isAgeVerified);
    
    if (!isAgeVerified) {
      setShowAgeModal(true);
      document.body.style.overflow = 'hidden';
    }
  }, []);

  // Handle body class for warning banner spacing
  useEffect(() => {
    if (ageVerified) {
      document.body.classList.add('has-warning-banner');
    } else {
      document.body.classList.remove('has-warning-banner');
    }
  }, [ageVerified]);

  useEffect(() => {
    setCartCount(getCartCount());
  }, [cart, getCartCount]);

  const handleAgeYes = () => {
    localStorage.setItem('ageVerified', 'true');
    setAgeVerified(true);
    setShowAgeModal(false);
    document.body.style.overflow = 'auto';
  };

  const handleAgeNo = () => {
    setShowAgeModal(false);
    document.body.style.overflow = 'auto';
    window.location.href = 'https://www.google.com';
  };

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  // Home Page Component
  const HomePage = () => (
    <>
      <Hero />
      <Categories />
      <Products onAddToCart={handleAddToCart} />
      <About />
      <Testimonials />
      <Newsletter />
    </>
  );

  return (
    <Router>
      <div className="App">
        <ScrollToTop />
        
        {/* Age Verification Modal */}
        {showAgeModal && (
          <div className="age-verification-modal">
            <div className="age-verification-content">
              <h2>Age Verification Required</h2>
              <p>This website contains products that are intended for adults aged 18 and over only.</p>
              <p>By entering this site, you certify that you are at least 18 years old and agree to our Terms of Service and Privacy Policy.</p>
              <div className="age-verification-buttons">
                <button className="age-btn age-yes" onClick={handleAgeYes}>
                  Yes, I am 18 or older
                </button>
                <button className="age-btn age-no" onClick={handleAgeNo}>
                  No, I am under 18
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* Warning Banner - Fixed positioning */}
        {ageVerified && (
          <div className="warning-banner">
            <div className="warning-banner-content">
              WARNING: This product contains nicotine. Nicotine is an addictive chemical.
            </div>
          </div>
        )}

        <Header 
          onCartOpen={() => setShowCartModal(true)}
          cartCount={cartCount}
        />

        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/shop" element={<Shop onAddToCart={handleAddToCart} />} />
          </Routes>
        </main>

        <Footer />

        <CartModal
          isOpen={showCartModal}
          onClose={() => setShowCartModal(false)}
          cart={cart}
          onRemoveFromCart={removeFromCart}
          onUpdateQuantity={updateQuantity}
          onCheckout={sendWhatsAppOrder}
          total={getCartTotal()}
        />
      </div>
    </Router>
  );
}

export default App;