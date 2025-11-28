const About = () => {
  return (
    <section id="about" className="about">
      <div className="container">
        <div className="about-content">
          <div className="about-text">
            <h2>About Chops Juice Drops</h2>
            <p>Founded in 2018, Chops Juice Drops has been at the forefront of the vaping industry, providing premium quality vape juices and devices to enthusiasts worldwide.</p>
            <p>Our mission is to deliver exceptional vaping experiences through carefully crafted flavors, state-of-the-art technology, and unparalleled customer service.</p>
            <p>All our products are manufactured in FDA-approved facilities and undergo rigorous quality testing to ensure safety and satisfaction.</p>
            <a href="#" className="btn">Learn More</a>
          </div>
          <div className="about-image">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3307.052597!2d18.482258!3d-34.052597!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1dcc6a7f8b8b8b8b%3A0x8b8b8b8b8b8b8b8b!2s35%20Hector%20Ave%2C%20Lotus%20River%2C%20Cape%20Town%2C%207941!5e0!3m2!1sen!2sza!4v1234567890123!5m2!1sen!2sza"
              width="100%"
              height="100%"
              style={{ border: 0, borderRadius: '15px' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Chops Juice Drops Location"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;