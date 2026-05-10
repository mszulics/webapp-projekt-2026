import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthPage = ({ onLogin }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Kezeli az űrlap beküldését: regisztrációkor ment, bejelentkezéskor ellenőriz.
  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');

    if (isRegister) {
      const exists = registeredUsers.find(u => u.email === email);
      if (exists) {
        setError('Ez az email már foglalt!');
        return;
      }
      const newUser = { email, password };
      localStorage.setItem('registeredUsers', JSON.stringify([...registeredUsers, newUser]));
      setIsRegister(false);
      setEmail('');
      setPassword('');
      alert('Sikeres regisztráció! Most már beléphetsz.');
    } else {
      const user = registeredUsers.find(u => u.email === email && u.password === password);
      if (user) {
        onLogin(user);
        navigate('/');
      } else {
        setError('Hibás email vagy jelszó!');
      }
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '80px auto', padding: '20px' }}>
      <div style={{ 
        background: '#1c1c1e', padding: '40px', borderRadius: '32px', border: '1px solid #333',
        textAlign: 'center', boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
      }}>
        <h2 style={{ fontSize: '2em', marginBottom: '10px', fontWeight: '700' }}>
          {isRegister ? 'Fiók létrehozása' : 'Üdvözöljük'}
        </h2>
        <p style={{ color: '#8e8e93', marginBottom: '30px' }}>
          {isRegister ? 'Regisztrálj az adatok megadásával.' : 'Jelentkezz be a vásárláshoz.'}
        </p>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {error && <div style={{ color: '#ff453a', fontSize: '0.85em', marginBottom: '10px' }}>{error}</div>}
          
          <input 
            type="email" placeholder="Email cím" required value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              padding: '16px 20px', borderRadius: '18px', border: '1px solid #333',
              background: '#2c2c2e', color: 'white', fontSize: '1em', outline: 'none'
            }}
          />
          <input 
            type="password" placeholder="Jelszó" required value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              padding: '16px 20px', borderRadius: '18px', border: '1px solid #333',
              background: '#2c2c2e', color: 'white', fontSize: '1em', outline: 'none'
            }}
          />
          <button 
            type="submit"
            style={{
              marginTop: '10px', padding: '16px', borderRadius: '40px', border: 'none',
              background: '#ffffff', color: '#000', fontWeight: '700', fontSize: '1em', cursor: 'pointer'
            }}
          >
            {isRegister ? 'Regisztráció' : 'Bejelentkezés'}
          </button>
        </form>
        
        <div style={{ marginTop: '25px', color: '#8e8e93', fontSize: '0.9em' }}>
          {isRegister ? 'Van már fiókod?' : 'Nincs még fiókod?'} 
          <span 
            onClick={() => { setIsRegister(!isRegister); setError(''); }}
            style={{ color: '#0a84ff', cursor: 'pointer', marginLeft: '5px', fontWeight: '600' }}
          >
            {isRegister ? 'Belépés' : 'Regisztráció most'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;