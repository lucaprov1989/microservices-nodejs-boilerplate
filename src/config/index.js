const { dbSettings, serverSettings } = require("./config")
const db = require("./mongo")
const { initDI } = require("./di")
const init = initDI.bind(null, {
  serverSettings,
  dbSettings,
  db,
  ObjectID: db.ObjectID
})

module.exports = Object.assign({}, { init })
