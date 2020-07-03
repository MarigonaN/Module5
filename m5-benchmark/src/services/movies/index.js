const express = require("express")
const path = require("path")
const { check, validationResult, sanitizeBody } = require("express-validator")
const fs = require("fs-extra")
const multer = require("multer")
const { join } = require("path")
const { readDB, writeDB } = require("../../utilities")

const moviesJsonPath = path.join(__dirname, "movies.json")
const reviewsJsonPath = path.join(__dirname, "reviews.json")

const moviesFolder = join(__dirname, "../../../public/img/movies/")
const upload = multer({})
const moviesRouter = express.Router()



moviesRouter.get("/", async (req, res, next) => {
  try {
    const data = await readDB(moviesJsonPath)

    res.send({ numberOfItems: data.length, data })
  } catch (error) {
    console.log(error)
    const err = new Error("While reading movies list a problem occurred!")
    next(err)
  }
})

moviesRouter.get("/:imdbID", async (req, res, next) => {
  try {
    const movies = await readDB(moviesJsonPath)
    const movie = movies.find((b) => b.imdbID === req.params.imdbID)
    if (movie) {
      res.send(movie)
    } else {
      const error = new Error()
      error.httpStatusCode = 404
      next(error)
    }
  } catch (error) {
    console.log(error)
    next("While reading movies list a problem occurred!")
  }
})

moviesRouter.post(
  "/",
  [
    check("imdbID").exists().withMessage("You should specify the imdbID"),
    check("Title").exists().withMessage("Title is required"),
    check("Type").exists().withMessage("Type is required"),
    check("Poster").exists().withMessage("Poster is required"),
    sanitizeBody("Year").toFloat(),
  ],
  async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      const error = new Error()
      error.httpStatusCode = 400
      error.message = errors
      next(error)
    }
    try {
      const movies = await readDB(moviesJsonPath)
      const imdbIDCheck = movies.find((x) => x.imdbID === req.body.imdbID) //get a previous element with the same imdbID
      if (imdbIDCheck) {
        //if there is one, just abort the operation
        const error = new Error()
        error.httpStatusCode = 400
        error.message = "imdbID should be unique"
        next(error)
      } else {
        movies.push(req.body)
        await writeDB(moviesJsonPath, movies)
        res.status(201).send("Created")
      }
    } catch (error) {
      next(error)
    }
  }
)



moviesRouter.put("/:imdbID", async (req, res, next) => {
  try {
    const movies = await readDB(moviesJsonPath)
    const movie = movies.find((b) => b.imdbID === req.params.imdbID)
    if (movie) {
      const position = movies.indexOf(movie)
      const movieUpdated = { ...movie, ...req.body } // In this way we can also implement the "patch" endpoint
      movies[position] = movieUpdated
      await writeDB(moviesJsonPath, movies)
      res.status(200).send("Updated")
    } else {
      const error = new Error(`movie with imdbID ${req.params.imdbID} not found`)
      error.httpStatusCode = 404
      next(error)
    }
  } catch (error) {
    next(error)
  }
})

moviesRouter.delete("/:imdbID", async (req, res, next) => {
  try {
    const movies = await readDB(moviesJsonPath)
    const movie = movies.find((b) => b.imdbID === req.params.imdbID)
    if (movie) {
      await writeDB(
        moviesJsonPath,
        movies.filter((x) => x.imdbID !== req.params.imdbID)
      )
      res.send("Deleted")
    } else {
      const error = new Error(`movie with imdbID ${req.params.imdbID} not found`)
      error.httpStatusCode = 404
      next(error)
    }
  } catch (error) {
    next(error)
  }
})

moviesRouter.post("/:imdbID/upload", upload.single("avatar"), async (req, res, next) => {
  try {
    const fileName = req.params.imdbID + path.extname(req.file.originalname)
    const fileDestination = join(moviesFolder, fileName)

    await fs.writeFile(
      fileDestination,
      req.file.buffer
    )

    const movies = await readDB(moviesJsonPath)
    const movie = movies.find((b) => b.imdbID === req.params.imdbID)
    if (movie) {
      const position = movies.indexOf(movie)
      const movieUpdated = { ...movie, Poster: "http://localhost:3001/img/movies/" + fileName } // In this way we can also implement the "patch" endpoint
      movies[position] = movieUpdated
      await writeDB(moviesJsonPath, movies)
      res.status(200).send("Updated")
    } else {
      const error = new Error(`movie with imdbID ${req.params.imdbID} not found`)
      error.httpStatusCode = 404
      next(error)
    }

  } catch (error) {
    next(error)
  }
  res.send("OK")
})

module.exports = moviesRouter
