const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      text: "The Tropical Fusion flavor is absolutely amazing! Smooth hit and great clouds. Will definitely be ordering again.",
      author: "Michael Johnson",
      initials: "MJ"
    },
    {
      id: 2,
      text: "Best vape juice I've ever tried. The flavors are rich and authentic, not artificial like others I've purchased.",
      author: "Sarah Roberts",
      initials: "SR"
    },
    {
      id: 3,
      text: "Fast shipping and excellent customer service. The Vape Pro X device is a game-changer with its long battery life.",
      author: "David Chen",
      initials: "DC"
    }
  ];

  return (
    <section id="testimonials" className="testimonials">
      <div className="container">
        <h2 className="section-title">Customer Reviews</h2>
        <div className="testimonials-grid">
          {testimonials.map(testimonial => (
            <div key={testimonial.id} className="testimonial-card">
              <p className="testimonial-text">{testimonial.text}</p>
              <div className="testimonial-author">
                <div className="author-avatar">{testimonial.initials}</div>
                <div className="author-info">
                  <h4>{testimonial.author}</h4>
                  <p>Verified Customer</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;