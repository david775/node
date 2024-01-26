const path = require('node:path')

// Barra separadora de carpetas segun SO
console.log(path.sep)

// Unir rutas con path join
const filePath = path.join('content', 'subfolder', 'test.txt')
console.log(filePath)

// Da el nombre del fichero
const base = path.basename('/tmp/hd-secret-files/password.txt')
console.log(base)

// Da el nombre del fichero sin la extension
const fileName = path.basename('/tmp/hd-secret-files/password.txt', '.txt')
console.log(fileName)

// Da el nombre del fichero sin la extension
const extension = path.extension('image.jpg')
console.log(extension)