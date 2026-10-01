const fs = require('fs/promises')
const path = require('path')

const filepath = path.join(__dirname, 'db.json')

async function readData() {
    const data = await fs.readFile(filepath, 'utf-8')

    return JSON.parse(data)
}

async function writeData(data) {
    await fs.writeFile(
        filepath,
        JSON.stringify(data, null, 2)
    )
}

module.exports = {
    readData,
    writeData
}