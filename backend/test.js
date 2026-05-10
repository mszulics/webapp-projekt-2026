import { addProduct, registerUser, loginUser, deleteUser, hasProductName } from './dbconnection.js';

// Név, rövid leírás, hosszú leírás, ár, vásárolható-e (1/0), flagek
if (!hasProductName("Gamer Egér 2026"))
{
    addProduct(
        "Gamer Egér 2026", 
        "Szupergyors és világít és még meg is vásárolható!", 
        "Ez a legújabb modell, 25000 DPI felbontással.", 
        20000, 
        0, 
        []
    );

    console.log("Teszt termék(ek) hozzáadva az adatbázishoz!");
}
else
{
    console.log("Teszt termék(ek) hozzáadva az adatbázishoz!");
}

// login test
console.log(registerUser("test", "mate", "psw!!"));
console.log(loginUser("mate", "psw!!"));
console.log(loginUser("mate2", "psw!!"));
deleteUser("mate");