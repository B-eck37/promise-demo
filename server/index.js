const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())

app.get('/ip', (req, res) => {
  res.json({ ip: '127.0.0.1' })
})
app.get('/location', (req, res) => {
  res.json({ location: {
    lat: 30.6,
    lon: 111.6,
  }})
})
app.get('/zip', (req, res) => {
  res.json({ zip: '85003' })
  // res.status(500).send()
})

const PORT = 5000
app.listen(PORT, () => {
  console.log('Server now listening on port ' + PORT)
})
