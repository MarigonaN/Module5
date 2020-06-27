const express = require("express")
const studentsRouter = require('./students')

const server = express()

const port = process.env.PORT || 3000

server.use
server.listen(port, () => {
    console.log(`Server is running on port ${port}`)

})

