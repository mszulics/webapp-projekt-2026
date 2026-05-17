import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthPage = ({ onLogin }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState(''); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState(''); // Új: a felugró ablak helyett
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    // --- REGISZTRÁCIÓ ---
    if (isRegister) {
      try {
        const response = await fetch('http://localhost:7777/api/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, mail: email, psw: password })
        });

        if (!response.ok) throw new Error('Szerver hiba');

        const data = await response.json();
        const kapottKod = (data && typeof data === 'object') ? data.code : data;

        switch (Number(kapottKod)) {
          case 0:
            setSuccessMsg('Sikeres regisztráció! Most már beléphetsz.');
            setIsRegister(false); // Átdobjuk a felhasználót a belépés fülre
            setName('');
            setPassword('');
            break;
          case 1:
            // Már regisztrált, egyből beléptetjük csendben
            onLogin({ email });
            navigate('/');
            break;
          case 2:
            setError('Ez az email cím már foglalt!');
            break;
          case 3:
            setError('Hiányzó adatok! Kérjük, tölts ki minden mezőt.');
            break;
          default:
            setError('Ismeretlen hiba történt a regisztráció során.');
        }
      } catch (err) {
        setError('A szerver nem érhető el!');
      }
    } 
    // --- BEJELENTKEZÉS ---
    else {
      try {
        const response = await fetch('http://localhost:7777/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ mail: email, psw: password })
        });

        if (!response.ok) throw new Error('Szerver hiba');

        const data = await response.json();
        const IsSikeres = (data && typeof data === 'object') ? data.success : data;

        if (IsSikeres === true || IsSikeres === "true") {
          onLogin({ email });
          navigate('/');
        } else {
          setError('Hibás email vagy jelszó!');
        }
      } catch (err) {
        setError('A szerver nem érhető el!');
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
          {/* Hiba és Siker üzenetek diszkrét megjelenítése */}
          {error && <div style={{ color: '#ff453a', fontSize: '0.85em', marginBottom: '5px' }}>{error}</div>}
          {successMsg && <div style={{ color: '#32d74b', fontSize: '0.85em', marginBottom: '5px' }}>{successMsg}</div>}
          
          {isRegister && (
            <input 
              type="text" placeholder="Felhasználónév" required value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                padding: '16px 20px', borderRadius: '18px', border: '1px solid #333',
                background: '#2c2c2e', color: 'white', fontSize: '1em', outline: 'none'
              }}
            />
          )}

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
            onClick={() => { setIsRegister(!isRegister); setError(''); setSuccessMsg(''); }}
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