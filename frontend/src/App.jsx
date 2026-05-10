import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ProductCard from './components/ProductCard';
import CartPage from './pages/CartPage';
import AuthPage from './pages/AuthPage';

const App = () => {
  // A termékeket kezdetben üres listaként definiáljuk.
  const [termekek, setTermekek] = useState([]);
  // Jelzi, hogy folyamatban van-e az adatok letöltése.
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Mind');

  // Lekéri a termékeket a társad backendjétől (7777-es port).
  useEffect(() => {
    document.title = "Webshop";

    fetch('http://localhost:7777/api/products')
      .then(res => res.json())
      .then(data => {
        setTermekek(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Nem sikerült elérni a backendet:", err);
        setLoading(false);
      });
  }, []);

  const [kosar, setKosar] = useState(() => {
    const mentett = localStorage.getItem('kosar');
    return mentett ? JSON.parse(mentett) : [];
  });

  const [user, setUser] = useState(() => {
    const mentettUser = localStorage.getItem('user');
    return mentettUser ? JSON.parse(mentettUser) : null;
  });

  // Elmenti a kosár aktuális állapotát a böngésző memóriájába.
  useEffect(() => {
    localStorage.setItem('kosar', JSON.stringify(kosar));
  }, [kosar]);

  // Elmenti a bejelentkezett felhasználó adatait.
  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  // Beteszi a terméket a kosárba, vagy ha már ott van, növeli a darabszámot.
  const hozzaadasAKosarhoz = (termek) => {
    setKosar(prevKosar => {
      const letezik = prevKosar.find(item => item.id === termek.id);
      if (letezik) {
        return prevKosar.map(item =>
          item.id === termek.id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
        );
      }
      return [...prevKosar, { ...termek, quantity: 1 }];
    });
  };

  // Növeli vagy csökkenti egy kosárban lévő termék mennyiségét.
  const mennyisegModositasa = (id, valtozas) => {
    setKosar(prevKosar => prevKosar.map(item => {
      if (item.id === id) {
        const ujMennyiseg = (item.quantity || 1) + valtozas;
        return { ...item, quantity: ujMennyiseg > 0 ? ujMennyiseg : 1 };
      }
      return item;
    }));
  };

  // Kitörli a kijelölt terméket a kosárból.
  const eltavolitasAKosarbol = (id) => setKosar(kosar.filter(item => item.id !== id));
  
  // Üressé teszi a teljes kosarat.
  const kosarUrítése = () => setKosar([]);
  
  // Kijelentkezteti a felhasználót és törli a mentett session-t.
  const handleLogout = () => setUser(null);

  // Kiszűri a listából azokat a termékeket, amik megfelelnek a keresésnek.
  const szurtTermekek = termekek.filter(t => {
    const matchesSearch = t.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Mind' || t.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Létrehoz egy listát az elérhető termékkategóriákból a szűrőgombokhoz.
  const kategoriak = ['Mind', ...new Set(termekek.map(t => t.category || 'Egyéb'))];

  return (
    <Router>
      <div style={{ backgroundColor: '#000000', minHeight: '100vh', color: 'white', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
        
        <div style={{ display: 'flex', justifyContent: 'center', padding: '20px', position: 'sticky', top: '0', zIndex: '100' }}>
          <nav style={{ 
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', maxWidth: '1200px',
            background: 'rgba(28, 28, 30, 0.8)', backdropFilter: 'blur(20px)', padding: '10px 25px', borderRadius: '40px', border: '1px solid #333'
          }}>
            <Link to="/" style={{ color: 'white', textDecoration: 'none', fontWeight: '700', fontSize: '1.2em' }}>Webshop</Link>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <Link to="/kosar" style={{ color: '#fff', textDecoration: 'none', fontSize: '0.9em', display: 'flex', alignItems: 'center', gap: '8px' }}>
                🛒 ({kosar.reduce((acc, item) => acc + (item.quantity || 0), 0)})
              </Link>
              {user ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <span style={{ fontSize: '0.85em', color: '#8e8e93' }}>{user.email}</span>
                  <button onClick={handleLogout} style={{ background: '#3a3a3c', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '20px', cursor: 'pointer', fontSize: '0.8em' }}>Kilépés</button>
                </div>
              ) : (
                <Link to="/login" style={{ color: '#000', textDecoration: 'none', background: '#fff', padding: '8px 20px', borderRadius: '20px', fontWeight: '600', fontSize: '0.9em' }}>Belépés</Link>
              )}
            </div>
          </nav>
        </div>

        <div style={{ padding: '20px' }}>
          {loading ? (
            <div style={{ textAlign: 'center', marginTop: '100px', fontSize: '1.2em', color: '#8e8e93' }}>Termékek betöltése...</div>
          ) : (
            <Routes>
              <Route path="/" element={
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                  <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <input 
                      type="text" placeholder="Keresés..." value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      style={{
                        width: '100%', maxWidth: '500px', padding: '15px 25px', borderRadius: '30px', border: '1px solid #333',
                        background: '#1c1c1e', color: 'white', outline: 'none', fontSize: '1.1em', marginBottom: '20px'
                      }}
                    />
                    <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
                      {kategoriak.map(kat => (
                        <button 
                          key={kat} onClick={() => setSelectedCategory(kat)}
                          style={{
                            padding: '10px 20px', borderRadius: '20px', border: 'none', cursor: 'pointer',
                            background: selectedCategory === kat ? '#ffffff' : '#1c1c1e',
                            color: selectedCategory === kat ? '#000' : '#8e8e93',
                            fontWeight: '600', transition: '0.3s'
                          }}
                        >
                          {kat}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
                    {szurtTermekek.map(termek => (
                      <ProductCard key={termek.id} termek={termek} onKosarba={hozzaadasAKosarhoz} />
                    ))}
                  </div>
                </div>
              } />
              <Route path="/kosar" element={<CartPage kosar={kosar} onEltavolitas={eltavolitasAKosarbol} onUrits={kosarUrítése} onMennyisegModositas={mennyisegModositasa} />} />
              <Route path="/login" element={<AuthPage onLogin={setUser} />} />
            </Routes>
          )}
        </div>
      </div>
    </Router>
  );
};

export default App;