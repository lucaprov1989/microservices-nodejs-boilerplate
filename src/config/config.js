const dotenv = require("dotenv").config()

const dbSettings = {
  db: process.env.DB || "exampleDB",
  dbHost: process.env.DB_HOST || "localhost:27017"
}

const serverSettings = {
  port: process.env.PORT || 5000
}

module.exports = Object.assign({}, { dbSettings, serverSettings })
