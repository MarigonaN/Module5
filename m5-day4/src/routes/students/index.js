const express = require("express")
const fs = require("fs")
const path = require("path")

const getStudents = () => {
    const studentJsonPath = path.join(__dirname, "students.json")
    const studentBuffer = fs.readFileSync(studentJsonPath)
    const studentString = studentBuffer.toString()
    const students = JSON.parse(studentString)
    return students

}
const writeStudents = (students) => {
    const studentJsonPath = path.join(__dirname, "students.json")
    fs.writeFileSync(studentJsonPath, JSON.stringify(students))
}


const studentRouter = express.Router()

studentRouter.get("/:id", (req, res) => {
    const students = getStudents()
    const student = students.find(b => b.id === req.params.id)
    if (student)
    res.send(student)
    else
    res.status(404).send("Not Found")
})


studentRouter.get("/", (req, res) => {
    const students = getStudents()
   
    res.send(students)
})


studentRouter.post("/", (req, res)=>{
    console.log(req.body)
    const students = getStudents()
    students.push(req.body)
    writeStudents(students)
    res.status(201).send(req.body)
})


studentRouter.put("/:id", (req, res)=>{
const students = getStudents()
const index = students.map(x => x.id).indexOf(req.params.id)
if(index === -1)
return res.status(404).send("Not Found")
else{
    students[index] = req.body
writeStudents(students)
    res.send("Put")
}
})


studentRouter.delete("/:id", (req, res)=>{
    const students = getStudents()
    const filtered = students.filter(student => student.id !== req.params.id)
    if(students.length === filtered.length)
    return res.status(404).send("Not Found")
    else{
        writeStudents(filtered)
        res.send("Delete")
    }
    
})
module.exports = studentRouter