import { useState } from 'react';

const Newsletter = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      alert(`Thank you for subscribing with ${email}! You'll receive our latest updates soon.`);
      setEmail('');
    }
  };

  return (
    <section className="newsletter">
      <div className="container">
        <h2>Join Our Newsletter</h2>
        <p>Subscribe to receive updates on new flavors, exclusive deals, and vaping tips.</p>
        <form className="newsletter-form" onSubmit={handleSubmit}>
          <input 
            type="email" 
            placeholder="Enter your email address" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
          />
          <button type="submit" className="btn">Subscribe</button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;