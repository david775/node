const fs = require('node:fs')

console.log('leyendo el primer archivo')
fs.readFile('./archivo.txt', 'utf-8', (err,text)=>{
    console.log(text)
} )
console.log('hacer cosas mientras lee el archivo')

console.log('leyendo el segundo archivo')
fs.readFile('./archivo2.txt', 'utf-8', (err,text)=>{
    console.log(text)
} )
console.log('hacer otras cosas mientras lee el archivo')