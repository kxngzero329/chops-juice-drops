import { useState, useEffect } from 'react';

const AgeVerification = ({ onVerified }) => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const ageVerified = localStorage.getItem('ageVerified');
    if (ageVerified !== 'true') {
      setShowModal(true);
      document.body.style.overflow = 'hidden';
    } else {
      // If already verified, call onVerified immediately
      onVerified(true);
    }
  }, [onVerified]);

  const handleYes = () => {
    localStorage.setItem('ageVerified', 'true');
    setShowModal(false);
    document.body.style.overflow = 'auto';
    onVerified(true); // This is the key - call the callback
  };

  const handleNo = () => {
    setShowModal(false);
    document.body.style.overflow = 'auto';
    window.location.href = 'https://www.google.com';
  };

  if (!showModal) return null;

  return (
    <div className="age-verification-modal">
      <div className="age-verification-content">
        <h2>Age Verification Required</h2>
        <p>This website contains products that are intended for adults aged 18 and over only.</p>
        <p>By entering this site, you certify that you are at least 18 years old and agree to our Terms of Service and Privacy Policy.</p>
        <div className="age-verification-buttons">
          <button className="age-btn age-yes" onClick={handleYes}>
            Yes, I am 18 or older
          </button>
          <button className="age-btn age-no" onClick={handleNo}>
            No, I am under 18
          </button>
        </div>
      </div>
    </div>
  );
};

export default AgeVerification;