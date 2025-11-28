// CartModal.jsx - Simplified (No User Check)
const CartModal = ({ isOpen, onClose, cart, onRemoveFromCart, onUpdateQuantity, onCheckout, total }) => {
  const handleCheckout = () => {
    try {
      onCheckout();
      onClose();
    } catch (error) {
      alert(error.message);
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className={`cart-modal ${isOpen ? 'open' : ''}`} onClick={handleOverlayClick}>
      <div className="cart-content" onClick={(e) => e.stopPropagation()}>
        <div className="cart-header">
          <h3>Your Cart</h3>
          <button className="close-cart" onClick={onClose}>&times;</button>
        </div>
        <div className="cart-items">
          {cart.length === 0 ? (
            <p style={{ textAlign: 'center', padding: '20px', color: 'var(--text-color)', opacity: 0.7 }}>
              Your cart is empty
            </p>
          ) : (
            cart.map(item => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-img">
                  {item.image ? (
                    <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }} />
                  ) : (
                    <i className="fas fa-wine-bottle"></i>
                  )}
                </div>
                <div className="cart-item-info">
                  <div className="cart-item-name">{item.name}</div>
                  <div className="cart-item-price">
                    R{(parseFloat(item.price.replace('R', '')) * item.quantity).toFixed(2)}
                  </div>
                  <div className="cart-item-quantity">
                    <button 
                      className="quantity-btn" 
                      onClick={() => onUpdateQuantity(item.id, -1)}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button 
                      className="quantity-btn" 
                      onClick={() => onUpdateQuantity(item.id, 1)}
                    >
                      +
                    </button>
                    <button 
                      className="remove-item" 
                      onClick={() => onRemoveFromCart(item.id)}
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="cart-total">
          <h4>Total: R{total.toFixed(2)}</h4>
          <button 
            className="checkout-btn" 
            onClick={handleCheckout}
            disabled={cart.length === 0}
          >
            <i className="fab fa-whatsapp"></i> Order via WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartModal;