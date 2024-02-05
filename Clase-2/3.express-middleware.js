const ditto = require('./pokemon/ditto.json')
const express = require('express')

const PORT = process.env.PORT ?? '1234'

const app = express()
app.disable('x-powered-by')

// use tiene otro parámetro que va de primero "app.use('/url',(req, res, next) ={} )" y es el url
// en el caso del middleware, cuando no hay url significa que afecta a todos los request
// si la hay significa que solo afecta a los que estén abarcados por la url que en piece por "app.use('/url/*',(req, res, next) ={} )"
// también se puede usar para request especificas como GET, POST, etc...
app.use((req, res, next) => {
  console.log('Mi primer middleware')
  // se puede hacer comprobaciones o cualquier cosa intermedia previa a lo requerido
  // como
  // trackear la request a la base de datos
  // revisar si el usuario tiene cookies
  next()
})

app.get('/pokemon/ditto', (req, res) => {
  // res.send('<h1>Mi página</h1>')
  res.json(ditto)
})

app.post('/pokemon', (req, res) => {
  let body = ''

  // escuchar el evento data
  req.on('data', chunk => {
    body += chunk.toString()
  })

  req.on('end', () => {
    const data = JSON.parse(body)
    data.timestamp = Date.now()
    res.status(201).json(data)
  })
})

app.use((req, res) => {
  res.status(404).send('<h1>404</h1>')
})

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`)
})
