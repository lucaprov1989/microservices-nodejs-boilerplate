"use strict"
const status = require("http-status")

module.exports = ({ repo }, app) => {

  app.get("/objects", async (req, res, next) => {
    try {
      const cinemas = await repo.getObjectsByCity(req.query.cityId)
      res.status(status.OK).json(cinemas)
    } catch (err) {
      next(err)
    }
  })
}
