const express = require("express")

const app = express()
app.use(express.json())
const studentRouter = require("./src/routes/students")

app.get("/hello", async (req, res) => {
    console.log("something is happening")
    res.status(200).send("Marigona")
})

app.use("/students", studentRouter)

app.listen(3000, () => console.log("hey, the server is running on port 3000"))