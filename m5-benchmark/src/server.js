const express = require("express")
const cors = require("cors")
const { join } = require("path")
const listEndpoints = require("express-list-endpoints")
const helmet = require("helmet")

const moviesRouter = require("./services/movies")
const {
    notFoundHandler,
    badRequestHandler,
    genericErrorHandler,
} = require("./errorHandlers")

const server = express()

const port = process.env.PORT || 3000

// MIDDLEWARES
const staticFolderPath = join(__dirname, "../public")
server.use(express.static(staticFolderPath))
server.use(express.json())



server.use(helmet())

//ROUTES
server.use("/movies", moviesRouter)

// ERROR HANDLERS
server.use(badRequestHandler)
server.use(notFoundHandler)
server.use(genericErrorHandler)

console.log(listEndpoints(server))

server.listen(port, () => {
    console.log("Running on port", port)
})
