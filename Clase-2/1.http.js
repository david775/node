const http = require('node:http')
const fs = require('node:fs')
const desiredPort = process.env.PORT ?? 3000

const processRequest = (req, res) => {
  console.log('request received', req.url)
  res.setHeader('Content-Type', 'text/html; Charset=utf-8')
  if (req.url === '/') {
    res.end('<h1>Bienvenido a mi página de inicio</h1>')
  } else if (req.url === '/imagen-super-bonita.jpg') {
    fs.readFile('./perfil.jpg', (err, data) => {
      if (err) {
        res.statusCode = 500
        res.end('<h1>500 Internal Server Error</h1>')
      } else {
        res.setHeader('Content-Type', 'image/jpg')
        res.end(data)
      }
    })
  } else if (req.url === '/contacto') {
    res.end('<h1>Contacto</h1>')
  } else {
    res.statusCode = 404 // not found
    res.end('<h1>404</h1>')
  }
}

const server = http.createServer(processRequest)

server.listen(desiredPort, () => {
  console.log(`server listening on port http://localhost:${desiredPort}`)
})
