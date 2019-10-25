"use strict"
const repository = container => {
  const ObjectID = container.resolve("ObjectID")
  const db = container.resolve("db")

  const getObjectsByCity = async city => {
    const query = { city }
    const projection = { _id: 1, name: 1 }

    return db
      .collection("objects")
      .find(query, projection)
      .toArray()
  }

  const getObjectById = async id => {
    const query = { _id: new ObjectID(id) }
    const projection = {
      _id: 1,
      name: 1,
      cinemaPremieres: 1
    }
    return db.collection("objects").findOne(query, projection)
  }

  const disconnect = () => {
    db.close()
  }

  return Object.create({
    getObjectsByCity,
    getObjectById,
    disconnect
  })
}

const connect = async container => {
  if (!container.resolve("db")) throw new Error("connection db not supplied!")
  if (!container.resolve("ObjectID")) throw new Error("objectId not supplied!")
  return repository(container)
}

module.exports = Object.assign({}, { connect })
