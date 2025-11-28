const Hero = () => {
  const scrollToCategories = () => {
    const element = document.getElementById('categories');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero" id="hero">
      <video className="hero-video" autoPlay muted loop>
        <source src="/videos/3068-165796695 - Trim.mp4" type="video/mp4" />
      </video>
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <h1>Premium <span>Vape Juice</span> & Accessories</h1>
        <p>Discover our exclusive collection of high-quality vape juices, devices, and accessories. Elevate your vaping experience with Chops Juice Drops.</p>
        <a href="#categories" className="btn" onClick={(e) => { e.preventDefault(); scrollToCategories(); }}>
          Shop Categories
        </a>
      </div>
    </section>
  );
};

export default Hero;