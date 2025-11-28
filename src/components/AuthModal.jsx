import { useState } from 'react';
import { useUser } from '../hooks/useUser';

const AuthModal = ({ isOpen, onClose }) => {
  const { register, login } = useUser();
  const [activeTab, setActiveTab] = useState('login');
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({ 
    name: '', 
    email: '', 
    password: '', 
    phone: '' 
  });

  if (!isOpen) return null;

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(loginData.email, loginData.password);
      onClose();
      setLoginData({ email: '', password: '' });
    } catch (error) {
      alert(error.message);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await register(registerData);
      onClose();
      setRegisterData({ name: '', email: '', password: '', phone: '' });
    } catch (error) {
      alert(error.message);
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="auth-modal" onClick={handleOverlayClick}>
      <div className="auth-content">
        <div className="auth-tabs">
          <button 
            className={`auth-tab ${activeTab === 'login' ? 'active' : ''}`}
            onClick={() => setActiveTab('login')}
          >
            Login
          </button>
          <button 
            className={`auth-tab ${activeTab === 'register' ? 'active' : ''}`}
            onClick={() => setActiveTab('register')}
          >
            Register
          </button>
        </div>
        
        {activeTab === 'login' && (
          <form className="auth-form active" onSubmit={handleLogin}>
            <input 
              type="email" 
              placeholder="Email" 
              value={loginData.email}
              onChange={(e) => setLoginData({...loginData, email: e.target.value})}
              required 
            />
            <input 
              type="password" 
              placeholder="Password" 
              value={loginData.password}
              onChange={(e) => setLoginData({...loginData, password: e.target.value})}
              required 
            />
            <button type="submit" className="auth-btn">Login</button>
          </form>
        )}
        
        {activeTab === 'register' && (
          <form className="auth-form active" onSubmit={handleRegister}>
            <input 
              type="text" 
              placeholder="Full Name" 
              value={registerData.name}
              onChange={(e) => setRegisterData({...registerData, name: e.target.value})}
              required 
            />
            <input 
              type="email" 
              placeholder="Email" 
              value={registerData.email}
              onChange={(e) => setRegisterData({...registerData, email: e.target.value})}
              required 
            />
            <input 
              type="password" 
              placeholder="Password" 
              value={registerData.password}
              onChange={(e) => setRegisterData({...registerData, password: e.target.value})}
              required 
            />
            <input 
              type="tel" 
              placeholder="Phone Number" 
              value={registerData.phone}
              onChange={(e) => setRegisterData({...registerData, phone: e.target.value})}
              required 
            />
            <button type="submit" className="auth-btn">Create Account</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AuthModal;