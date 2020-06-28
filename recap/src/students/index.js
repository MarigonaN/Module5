const express = require("express")


const studentsRouter = express.Router()

studentsRouter.get("/", (req, res) => {
    res.send("ok")
} )
studentsRouter.get("/:id", (req, res) => {
    res.send("ok")
})
studentsRouter.post("/", (req, res) => {
    res.send("ok")
})
studentsRouter.put("/:id", (req, res) => {
    res.send("ok")
})
studentsRouter.delete("/:id", (req, res) => {
    res.send("ok")
})


module.exports = studentsRouter