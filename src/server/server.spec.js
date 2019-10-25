/* eslint-env mocha */
const server = require("./server")
const { createContainer, asValue } = require("awilix")

describe("Server", () => {
  it("should require a port to start", () => {
    const container = createContainer()
    container.register({
      serverSettings: asValue({}),
      repo: asValue({})
    })
    return server
      .start(container)
      .should.be.rejectedWith(
        "The server must be started with an available port"
      )
  })

  it("should require a repository to start", () => {
    const container = createContainer()
    container.register({
      serverSettings: asValue({ port: 3005 })
    })
    return server.start(container).should.be.rejected()
  })
})
