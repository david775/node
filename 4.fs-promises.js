// esto solo en los modulos nativos
// que no tienen promesas nativas
// const fs = require('node:fs')
// const { promisify } = require('node:util')

// const readFilePromise = promisify(fs.readFile)

// console.log('leyendo el primer archivo')
// readFilePromise('./archivo.txt', 'utf-8') 
// .then( text =>{
//     console.log(text)
// })
// console.log('hacer cosas mientras lee el archivo')

const fs = require('node:fs/promises')

console.log('leyendo el primer archivo')
fs.readFile('./archivo.txt', 'utf-8')
    .then( text => {
        console.log('primer texto: ', text)
    })
console.log('hacer cosas mientras lee el archivo')

console.log('leyendo el segundo archivo')
fs.readFile('./archivo2.txt', 'utf-8')
    .then(text=>{
        console.log('segundo texto: ', text)
    })
console.log('hacer otras cosas mientras lee el archivo')