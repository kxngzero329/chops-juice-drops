import { useCart } from '../hooks/useCart';

const Products = ({ onAddToCart }) => {
  const products = [
    {
      id: 1,
      name: "NASTY BAR D9Ki",
      price: "R250.00",
      description: "Premium disposable vape with 9000 puffs and rich flavor.",
      image: "/images/d9ki-aloegrape.webp"
    },
    {
      id: 2,
      name: "NASTY POD PX10 Pods",
      price: "R250.00",
      description: "Refillable pods with exceptional flavor delivery.",
      image: "/images/D14Ki_strawberry_mint_lemonade.webp"
    },
    {
      id: 3,
      name: "NASTY BAR D14Ki",
      price: "R280.00",
      description: "Extended battery life with 14000 puffs capacity.",
      image: "/images/d16ki-strawberryice.webp"
    }
  ];

  const handleAddToCart = (product) => {
    onAddToCart(product);
  };

  return (
    <section id="products" className="products">
      <div className="container">
        <h2 className="section-title">Best Sellers</h2>
        <div className="products-grid">
          {products.map(product => (
            <div key={product.id} className="product-card">
              <div className="product-img">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="product-image"
                  onError={(e) => {
                    e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' fill='%23f8f8f8'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='18' fill='%23ff6600'%3EProduct Image%3C/text%3E%3C/svg%3E";
                  }}
                />
              </div>
              <div className="product-info">
                <h3 className="product-title">{product.name}</h3>
                <p className="product-price">{product.price}</p>
                <p className="product-description">{product.description}</p>
                <div className="product-actions">
                  <button 
                    className="product-btn"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;