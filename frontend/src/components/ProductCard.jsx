function ProductCard({ nev, ar, kep, onKosarba }) {
  return (
    <div style={{
      border: '1px solid #ddd',
      padding: '15px',
      margin: '10px',
      borderRadius: '8px',
      width: '200px',
      display: 'inline-block',
      backgroundColor: 'white'
    }}>
      <img src={kep} alt={nev} style={{ width: '100%', borderRadius: '5px' }} />
      <h3>{nev}</h3>
      <p>{ar} Ft</p>
      <button 
        onClick={onKosarba}
        style={{ backgroundColor: '#007bff', color: 'white', border: 'none', padding: '10px', cursor: 'pointer', borderRadius: '5px' }}
      >
        Kosárba
      </button>
    </div>
  );
}

export default ProductCard;