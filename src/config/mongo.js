const { MongoClient, ObjectID } = require("mongodb")

const getMongoURL = options => {
  console.log(`mongodb://${options.dbHost}/${options.db}`)
  return `mongodb://${options.dbHost}/${options.db}`
}

const connect = (options, mediator) => {
  mediator.once("boot.ready", async () => {
    try {
      const db = await MongoClient.connect(getMongoURL(options))
      mediator.emit("db.ready", db)
    } catch (err) {
      mediator.emit("db.error", err)
    }
  })
}

module.exports = Object.assign({}, { connect, ObjectID })
