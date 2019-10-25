const { createContainer, asValue } = require("awilix")

function initDI({ serverSettings, db, ObjectID  }, mediator) {
  mediator.once("init", () => {
    const container = createContainer()

    container.register({
      db: asValue(db),
      ObjectID: asValue(ObjectID),
      serverSettings: asValue(serverSettings)
    })

    mediator.emit("di.ready", container)
  })
}

module.exports.initDI = initDI
