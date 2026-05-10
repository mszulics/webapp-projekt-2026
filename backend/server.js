import express from 'express'
import { getAllProducts, loginUser, registerUser } from './dbconnection.js'
const app = express()
const port = 7777

app.use(express.json())
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
    res.send(3);
    return;
  }
  req.cookies.get
  const rsp = registerUser(name, mail, psw);

  res.send(rsp);
})

app.post('/api/login', (req, res) => {
  const { mail, psw } = req.body;
  if ( mail == undefined || psw == undefined)
  {
    res.send(false);
    return;
  }

  const rsp = loginUser(mail, psw);

  res.send(rsp);
})


app.listen(port, () => {
  console.log(`Backend listening on port ${port}`)
})