const fs = require('node:fs/promises')
const path = require('node:path')

const folder = process.argv[2] ?? '.'

async function ls(folder) {
    let files
    
    try{
        files = await fs.readdir(folder)
    } catch {
        console.error(`No se pudo leer el directorio ${folder}`)
        process.exit(1)
    }

    const filesPromises = files.map( async file=> {
        const filePath = path.join(folder, file)
        let stats

        try{
            stats = await fs.stat(filePath)
        } catch {
            console.error(`No se pudo leer el archivo ${filePath}`)
            process.exit(1)
        }

        const isDirectory = stats.isDirectory()
        const fileType = isDirectory ? 'd' : 'f'
        const fileSize = stats.size.toString()
        const fileModified = stats.mtime.toLocaleString()

        return `${fileType} ${file.padEnd(20)} ${fileSize.padStart(10)} ${fileModified}`
    })

    const filesInfo = await Promise.all(filesPromises)

    filesInfo.forEach(fileInfo => console.log(fileInfo))
}

ls(folder)










// const fs = require('node:fs/promises')

// const folder = process.argv[2] ?? '.'

// fs.readdir(folder)
//     .then(files=>{
//         files.forEach(file=>{
//             console.log(file)
//         })
//     })
//     .catch(err=>{
//         if (err) {
//             console.error("Error al leer el directorio: ", err)        
//             return
//         }
//     })