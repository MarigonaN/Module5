const express = require("express")
const listEndpoints = require("express-list-endpoints")
const studentsRouter = require('./students')

const server = express()

const port = process.env.PORT || 3002

server.use(express.json())

server.use("/students", studentsRouter)

console.log(listEndpoints(server))

server.listen(port, () => {
    console.log(`Server is running on port ${port}`)

})

