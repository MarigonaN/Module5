const express = require("express")
const path = require("path")
const uniqid = require("uniqid")
const fs = require("fs-extra")
const readFile = require("../utilities")
const { request, response } = require("express")

const studentsRouter = express.Router()
const studentsFilePath = path.join(__dirname, "students.json")



studentsRouter.get("/", (req, res) => {
    try{
    const arrayOfStudents = readFile(studentsFilePath)
    if(arrayOfStudents.length > 0){
        res.send(arrayOfStudents)
    }else{
        res.status(404).send("no students found")
    }
}catch(error){
    res.status(500).send("No file found")
}  
})




studentsRouter.get("/:id", (req, res) => {
    const arrayOfStudents = readFile(studentsFilePath)
   const studentFound = arrayOfStudents.find(  //we can also use the filter (but filter return us an array)
       student => student.id === req.params.id)
       console.log(studentFound)
       if(!studentFound){
        res.status(404).send(`student with id ${req.params.id} not found!`)
       }else{
    res.send(studentFound)
       }
})




studentsRouter.post("/", (req, res) => {
    const newStudent = { ...req.body, id: uniqid(), createdAt: new Date(), numberOfProjects: 0,}
    console.log(newStudent)
    const arrayOfStudents = readFile(studentsFilePath)
    arrayOfStudents.push(newStudent)
    fs.writeFileSync(studentsFilePath, JSON.stringify(arrayOfStudents))
    res.status(201).send(newStudent)
})



studentsRouter.put("/:id", (req, res) => {
    res.send("ok")
})
studentsRouter.delete("/:id", (req, res) => {
    res.send("ok")
})


module.exports = studentsRouter