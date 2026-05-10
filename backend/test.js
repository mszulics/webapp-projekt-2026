import { addProduct, registerUser, loginUser, deleteUser, hasProductName } from './dbconnection.js';

// Név, rövid leírás, hosszú leírás, ár, vásárolható-e (1/0), flagek
if (!hasProductName("Gamer Asztal Nagyon Jo"))
{
    addProduct(
        "Gamer Asztal Nagyon Jo", 
        "Nagyon jo", 
        "Ez a legújabb modell, erős szerkezettel", 
        22000, 
        1, 
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