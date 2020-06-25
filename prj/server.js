const express = require("express")

const studentsRouters = require("./src/students")

const server = express()

server.use(express.json())

server.use("/students", studentsRouters)


server.listen(4000, () => console.log("the server is running on the port 4000"))