"use strict"
const { EventEmitter } = require("events")
const server = require("./server/server")
const repository = require("./repository/repository")
const di = require("./config")
const mediator = new EventEmitter()
const { asValue } = require("awilix")

console.log("--- Starting Service ---")
console.log("Connecting to repository...")

process.on("uncaughtException", err => {
  console.error("Unhandled Exception", err)
})
process.on("uncaughtRejection", (err, promise) => {
  console.error("Unhandled Rejection", err)
})

mediator.on("di.ready", async container => {
  const repo = await repository.connect(container)
  container.register({ repo: asValue(repo) })
  const app = await server.start(container)
  console.log(
    `Server started succesfully, running on port: ${
      container.resolve("serverSettings").port
    }.`
  )
  app.on("close", () => {
    container.resolve("repo").disconnect()
  })
})
mediator.on("db.error", err => {
  console.error(err)
})

di.init(mediator)
mediator.emit("init")
