import express from 'express'
import cors from 'cors'
import { getAllProducts, loginUser, registerUser } from './dbconnection.js'
const app = express()
const port = 7777

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// product related api
app.get('/api/products', (req, res) => {
  res.send(getAllProducts())
})

// user related api
app.post('/api/register', (req, res) => {
  const { name, mail, psw } = req.body;
  if (name == undefined || mail == undefined || psw == undefined)
  {
    // code 3 means something is not right!
    res.json({ code: 3 }); // VÁLTOZÁS: res.send(3) helyett res.json({ code: 3 })
    return;
  }
  
  
  const rsp = registerUser(name, mail, psw);

  res.json({ code: rsp }); // VÁLTOZÁS: res.send(rsp) helyett res.json({ code: rsp })
})

app.post('/api/login', (req, res) => {
  const { mail, psw } = req.body;
  if ( mail == undefined || psw == undefined)
  {
    res.json({ success: false }); // VÁLTOZÁS: res.send(false) helyett JSON objektum
    return;
  }

  const rsp = loginUser(mail, psw); // Ez most már vagy false, vagy a felhasználó neve

  // VÁLTOZÁS: Szintén JSON formátumban küldjük vissza, hozzácsapva a kapott nevet
  res.json({ success: rsp !== false, name: rsp });
})


app.listen(port, () => {
  console.log(`Backend listening on port ${port}`)
})