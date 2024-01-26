const fs = require('node:fs/promises')

// IIFE - Inmedeatly Invoked Function Expression
;(
    async () => {
        console.log('leyendo el primer archivo')
        const text = await fs.readFile('./archivo.txt', 'utf-8')
        console.log('primer texto: ', text)
        console.log('-> hacer cosas mientras lee el archivo')

        console.log('leyendo el segundo archivo')
        const secondText = await fs.readFile('./archivo2.txt', 'utf-8')
        console.log('segundo texto: ', secondText)
        console.log('hacer otras cosas mientras lee el archivo')
    }
)()