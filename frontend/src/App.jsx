import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState } from 'react'
import ProductCard from './components/ProductCard' 

function App() {
  const [kosar, setKosar] = useState([])

  const termekek = [
    { id: 1, nev: "Gamer Egér", ar: 12000, kep: "https://via.placeholder.com/150" },
    { id: 2, nev: "Billentyűzet", ar: 25000, kep: "https://via.placeholder.com/150" },
    { id: 3, nev: "Fejhallgató", ar: 18000, kep: "https://via.placeholder.com/150" }
  ]

  const hozzaadasAKosarhoz = (termek) => {
    setKosar([...kosar, termek])
    console.log("Kosár tartalma:", kosar)
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #333' }}>
        <h1>🛒 TechStore 2026</h1>
        <h3>Kosár: {kosar.length} db</h3>
      </header>

      <main style={{ marginTop: '20px' }}>
        {termekek.map(t => (
          <ProductCard 
            key={t.id} 
            nev={t.nev} 
            ar={t.ar} 
            kep={t.kep} 
            onKosarba={() => hozzaadasAKosarhoz(t)} 
          />
        ))}
      </main>
    </div>
  )
}

export default App