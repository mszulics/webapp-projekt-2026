import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      onLogin({ email });
      navigate('/');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '100px auto', padding: '20px' }}>
      <div style={{ 
        background: '#1c1c1e', 
        padding: '40px', 
        borderRadius: '32px', 
        border: '1px solid #333',
        textAlign: 'center'
      }}>
        <h2 style={{ fontSize: '2em', marginBottom: '30px', fontWeight: '700' }}>Bejelentkezés</h2>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input 
            type="email" 
            placeholder="Email cím" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              padding: '15px 20px',
              borderRadius: '20px',
              border: '1px solid #333',
              background: '#2c2c2e',
              color: 'white',
              fontSize: '1em',
              outline: 'none'
            }}
          />
          <input 
            type="password" 
            placeholder="Jelszó" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              padding: '15px 20px',
              borderRadius: '20px',
              border: '1px solid #333',
              background: '#2c2c2e',
              color: 'white',
              fontSize: '1em',
              outline: 'none'
            }}
          />
          <button 
            type="submit"
            style={{
              marginTop: '10px',
              padding: '15px',
              borderRadius: '40px',
              border: 'none',
              background: '#ffffff',
              color: '#000',
              fontWeight: '700',
              fontSize: '1em',
              cursor: 'pointer'
            }}
          >
            Belépés
          </button>
        </form>
        
        <p style={{ marginTop: '20px', color: '#8e8e93', fontSize: '0.9em' }}>
          Nincs még fiókod? <span style={{ color: '#0a84ff', cursor: 'pointer' }}>Regisztráció</span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;