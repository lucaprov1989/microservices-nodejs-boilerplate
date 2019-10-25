"use strict"
const express = require("express")
const morgan = require("morgan")
const helmet = require("helmet")
const exampleAPI = require("../api/api")

const start = async container => {
  const { port } = container.resolve("serverSettings")
  const repo = container.resolve("repo")
  if (!repo) {
    throw new Error("The server must be started with a connected repository")
  }
  if (!port) {
    throw new Error("The server must be started with an available port")
  }

  const app = express()
  app.use(morgan("dev"))
  app.use(helmet())
  app.use((err, req, res, next) => {
    res.status(500).send("Something went wrong!")
  })
  app.use((req, res, next) => {
    req.container = container.createScope()
    next()
  })

  const api = exampleAPI.bind(null, { repo })

  api(app)

  const server = app.listen(port)
  return server
}

module.exports = Object.assign({}, { start })
