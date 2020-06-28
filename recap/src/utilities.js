const fs = require('fs-extra')

const readFile = (filePath) => {
    const buffer = fs.readFileSync(filePath)
    const bufferToString = buffer.toString()
    return JSON.parse(bufferToString)
}


module.exports = readFile