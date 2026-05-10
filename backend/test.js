import { addProduct } from './dbconnection.js';

// Név, rövid leírás, hosszú leírás, ár, vásárolható-e (1/0), flagek
addProduct(
    "Gamer Egér 2026", 
    "Szupergyors és világít és még meg is vásárolható!", 
    "Ez a legújabb modell, 25000 DPI felbontással.", 
    20000, 
    0, 
    []
);

console.log("Teszt termék(ek) hozzáadva az adatbázishoz!");