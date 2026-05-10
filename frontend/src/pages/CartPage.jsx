import React from 'react';
import { Link } from 'react-router-dom';

const CartPage = ({ kosar, onEltavolitas, onUrits, onMennyisegModositas }) => {
  const osszesen = kosar.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', color: 'white' }}>
      <h2 style={{ fontSize: '2em', marginBottom: '30px' }}>Kosár</h2>
      
      {kosar.length === 0 ? (
        <div style={{ textAlign: 'center', marginTop: '100px' }}>
          <p style={{ color: '#8e8e93', fontSize: '1.2em' }}>Üres a kosarad.</p>
          <Link to="/" style={{ color: '#0a84ff', textDecoration: 'none' }}>Vissza a boltba</Link>
        </div>
      ) : (
        <div style={{ background: '#1c1c1e', borderRadius: '32px', padding: '30px', border: '1px solid #333' }}>
          {kosar.map((item) => (
            <div key={item.id} style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '20px 0',
              borderBottom: '1px solid #333'
            }}>
              <div style={{ flex: 1 }}>
                <h4 style={{ margin: '0 0 5px 0', fontSize: '1.1em' }}>{item.name}</h4>
                <span style={{ color: '#8e8e93' }}>{item.price.toLocaleString()} Ft / db</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', flex: 1, justifyContent: 'center' }}>
                <button 
                  onClick={() => onMennyisegModositas(item.id, -1)}
                  style={{ background: '#3a3a3c', color: 'white', border: 'none', width: '30px', height: '30px', borderRadius: '50%', cursor: 'pointer', fontWeight: 'bold' }}
                >-</button>
                <span style={{ fontSize: '1.1em', width: '20px', textAlign: 'center' }}>{item.quantity}</span>
                <button 
                  onClick={() => onMennyisegModositas(item.id, 1)}
                  style={{ background: '#3a3a3c', color: 'white', border: 'none', width: '30px', height: '30px', borderRadius: '50%', cursor: 'pointer', fontWeight: 'bold' }}
                >+</button>
              </div>

              <div style={{ flex: 1, textAlign: 'right' }}>
                <div style={{ fontWeight: '600', marginBottom: '10px' }}>{(item.price * item.quantity).toLocaleString()} Ft</div>
                <button 
                  onClick={() => onEltavolitas(item.id)}
                  style={{ background: 'transparent', color: '#ff453a', border: 'none', cursor: 'pointer', fontSize: '0.9em' }}
                >Eltávolítás</button>
              </div>
            </div>
          ))}

          <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'space-between', fontSize: '1.5em', fontWeight: 'bold' }}>
            <span>Összesen</span>
            <span>{osszesen.toLocaleString()} Ft</span>
          </div>

          <div style={{ marginTop: '40px', display: 'flex', gap: '15px' }}>
            <button onClick={onUrits} style={{ flex: 1, padding: '18px', background: '#3a3a3c', color: 'white', border: 'none', borderRadius: '40px', fontWeight: 'bold', cursor: 'pointer' }}>
              Ürítés
            </button>
            <button style={{ flex: 2, padding: '18px', background: '#ffffff', color: '#000', border: 'none', borderRadius: '40px', fontWeight: 'bold', cursor: 'pointer' }}>
              Fizetés
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;