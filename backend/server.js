import express from 'express'
import { getAllProducts } from './dbconnection.js'
const app = express()
const port = 7777

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/api/products', (req, res) => {
  res.send(getAllProducts())
})

app.listen(port, () => {
  console.log(`Backend listening on port ${port}`)
})