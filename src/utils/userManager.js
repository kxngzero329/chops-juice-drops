// utils/userManager.js
export class UserManager {
  constructor() {
    this.currentUser = null;
    this.users = JSON.parse(localStorage.getItem('vapeStoreUsers')) || [];
    this.cart = JSON.parse(localStorage.getItem('userCart')) || [];
    
    // Load current user from localStorage
    this.getCurrentUser();
  }

  register(userData) {
    // Check if user already exists
    if (this.users.find(user => user.email === userData.email)) {
      throw new Error('User already exists with this email');
    }

    const newUser = {
      id: Date.now().toString(),
      ...userData,
      createdAt: new Date().toISOString()
    };

    this.users.push(newUser);
    this.saveUsers();
    
    // Auto-login after registration
    return this.login(userData.email, userData.password);
  }

  login(email, password) {
    const user = this.users.find(u => u.email === email && u.password === password);
    if (!user) {
      throw new Error('Invalid email or password');
    }

    this.currentUser = user;
    localStorage.setItem('currentUser', JSON.stringify(user));
    
    // Load user's cart
    this.loadCart();
    
    return user;
  }

  logout() {
    this.currentUser = null;
    localStorage.removeItem('currentUser');
    this.cart = [];
    this.saveCart();
  }

  getCurrentUser() {
    if (!this.currentUser) {
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        this.currentUser = JSON.parse(storedUser);
      }
    }
    return this.currentUser;
  }

  saveUsers() {
    localStorage.setItem('vapeStoreUsers', JSON.stringify(this.users));
  }

  // Cart Management
  addToCart(product) {
    if (!this.currentUser) {
      throw new Error('Please login to add items to cart');
    }

    const existingItem = this.cart.find(item => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.cart.push({
        ...product,
        quantity: 1
      });
    }
    
    this.saveCart();
  }

  removeFromCart(productId) {
    this.cart = this.cart.filter(item => item.id !== productId);
    this.saveCart();
  }

  updateQuantity(productId, change) {
    const item = this.cart.find(item => item.id === productId);
    if (item) {
      item.quantity += change;
      if (item.quantity <= 0) {
        this.removeFromCart(productId);
      } else {
        this.saveCart();
      }
    }
  }

  getCartTotal() {
    return this.cart.reduce((total, item) => {
      const price = parseFloat(item.price.replace('R', '').replace(',', ''));
      return total + (price * item.quantity);
    }, 0);
  }

  clearCart() {
    this.cart = [];
    this.saveCart();
  }

  saveCart() {
    localStorage.setItem('userCart', JSON.stringify(this.cart));
  }

  loadCart() {
    this.cart = JSON.parse(localStorage.getItem('userCart')) || [];
  }

  sendWhatsAppOrder() {
    if (!this.currentUser) {
      throw new Error('Please login to place an order');
    }

    if (this.cart.length === 0) {
      throw new Error('Your cart is empty');
    }

    const phoneNumber = '27606876018';
    let message = `*NEW ORDER FROM CHOPS JUICE DROPS*%0A%0A`;
    message += `*Customer:* ${this.currentUser.name}%0A`;
    message += `*Email:* ${this.currentUser.email}%0A`;
    message += `*Phone:* ${this.currentUser.phone}%0A%0A`;
    message += `*Order Details:*%0A`;

    this.cart.forEach(item => {
      const price = parseFloat(item.price.replace('R', '').replace(',', ''));
      message += `• ${item.name} x${item.quantity} - R${(price * item.quantity).toFixed(2)}%0A`;
    });

    message += `%0A*Total: R${this.getCartTotal().toFixed(2)}*%0A%0A`;
    message += `Please confirm this order and provide delivery details.`;

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
    
    this.clearCart();
  }
}