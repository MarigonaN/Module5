const express = require("express")
const fs = require('fs')
const path = require("path")
const router = express.Router()
const studentsFilePath = path.join(__dirname, "students.json")
router.get('/', (request, response)=>{
    
    console.log(__dirname + "\\students.json")
    console.log(path.join(__dirname, "students.json"))
  
    const fileContentAsBuffer = fs.readFileSync(studentsFilePath)
    const fileContent = fileContentAsBuffer.toString()
    response.send(JSON.parse(fileContent))

  
   
})

router.get('/:id', (request, response)=>{

    const fileContentAsBuffer = fs.readFileSync(studentsFilePath)
    const studentsArray = JSON.parse(fileContentAsBuffer.toString())
    console.log(studentsArray)

    console.log('ID: ', request.params.id)
    const student = studentsArray.filter((student)=> student.id === parseInt(request.params.id))
    console.log(student)
    response.send(student)
})

router.post('/', (request, response)=>{
    console.log(request.body)
    const fileContentAsBuffer = fs.readFileSync(studentsFilePath)
    const studentsArray = JSON.parse(fileContentAsBuffer.toString())

    studentsArray.push(newStudent)

    response.send(request.body)
})

router.put('/:id', (request, response)=>{})

router.delete('/:id', (request, response)=>{})

module.exports = router