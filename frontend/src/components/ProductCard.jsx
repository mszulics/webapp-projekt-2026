import React, { useState } from 'react';

const ProductCard = ({ termek, onKosarba }) => {
  const [showDetails, setShowDetails] = useState(false);
  const flags = typeof termek.flags === 'string' ? JSON.parse(termek.flags) : (termek.flags || []);
  const isSoldOut = flags.includes("SoldOut") || termek.purchasable === 0;
  const canBuy = termek.purchasable === 1 && !isSoldOut;

  return (
    <div 
      style={{
        background: '#1c1c1e',
        borderRadius: '28px',
        padding: '20px',
        margin: '10px',
        width: '260px',
        height: '340px',
        display: 'inline-block',
        verticalAlign: 'top',
        border: '1px solid #333',
        color: 'white',
        position: 'relative',
        transition: 'transform 0.3s ease',
      }}
    >
      <div style={{ height: '24px', marginBottom: '12px' }}>
        {isSoldOut && (
          <span style={{
            fontSize: '10px',
            background: '#ff453a',
            color: 'white',
            padding: '4px 12px',
            borderRadius: '20px',
            fontWeight: '700',
            textTransform: 'uppercase'
          }}>
            Sold Out
          </span>
        )}
      </div>

      <h3 style={{ margin: '0 0 8px 0', fontSize: '1.2em', fontWeight: '600' }}>{termek.name}</h3>
      <p style={{ 
        fontSize: '0.85em', 
        color: '#8e8e93', 
        lineHeight: '1.4', 
        margin: '0',
        display: '-webkit-box',
        WebkitLineClamp: '3',
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden'
      }}>
        {termek.desc}
      </p>

      <div style={{
        position: 'absolute',
        bottom: '85px',
        left: '0',
        right: '0',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '1.4em', fontWeight: '700' }}>
          {termek.price?.toLocaleString()} Ft
        </div>
      </div>

      {showDetails && (
        <div style={{
          position: 'absolute',
          bottom: '120px',
          left: '20px',
          right: '20px',
          background: 'rgba(44, 44, 46, 0.98)',
          backdropFilter: 'blur(10px)',
          padding: '15px',
          borderRadius: '18px',
          fontSize: '0.8em',
          lineHeight: '1.4',
          border: '1px solid #444',
          boxShadow: '0 10px 20px rgba(0,0,0,0.5)',
          zIndex: 10,
          color: '#efeff4'
        }}>
          <div style={{ fontWeight: '700', color: '#0a84ff', marginBottom: '5px' }}>TERMÉKINFÓ</div>
          {termek.longdesc}
        </div>
      )}

      <div style={{
        display: 'flex',
        gap: '10px',
        position: 'absolute',
        bottom: '20px',
        left: '20px',
        right: '20px'
      }}>
        <button 
          onClick={() => onKosarba(termek)}
          disabled={!canBuy}
          style={{
            flex: 1,
            padding: '12px',
            backgroundColor: canBuy ? '#ffffff' : '#3a3a3c',
            color: canBuy ? '#000000' : '#8e8e93',
            border: 'none',
            borderRadius: '40px',
            cursor: canBuy ? 'pointer' : 'not-allowed',
            fontWeight: '700',
            fontSize: '0.9em'
          }}
        >
          {isSoldOut ? 'ELFOGYOTT' : 'KOSÁRBA'}
        </button>

        <div 
          onMouseEnter={() => setShowDetails(true)}
          onMouseLeave={() => setShowDetails(false)}
          style={{
            width: '45px',
            height: '45px',
            borderRadius: '50%',
            backgroundColor: '#3a3a3c',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'help',
            border: '1px solid #444',
            color: '#0a84ff',
            fontWeight: 'bold',
            fontSize: '1.2em',
            flexShrink: 0
          }}
        >
          i
        </div>
      </div>
    </div>
  );
};

export default ProductCard;