const http = require('node:http')
const { findAvailablePort } = require('./10.free-port')
const desiredPort = process.env.PORT ?? 3000
// los servidores puede hacer dos cosas o resibir una petición o enviar un respuesta
const server = http.createServer((req, res) => {
  console.log('request received')
  res.end('Hola mundo')
})

findAvailablePort(desiredPort).then(port => {
  console.log('puerto: ', port)
  server.listen(port, () => {
    console.log(`server listening on port http://localhost:${port}`)
  })
})

// server.listen(0, () => {
//   console.log(`server listening on port http://localhost:${server.address().port}`)
// })
