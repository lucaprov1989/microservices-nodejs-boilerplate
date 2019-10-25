describe("Test API", () => {
  let testRepo = {
    async getObjectsByCity() {
      return { testObject: "" }
    }
  }

  beforeEach(async () => {
    const container = createContainer()

    container.register({
      repo: asValue(testRepo),
      serverSettings: asValue(serverSettings)
    })

    app = await server.start(container)
  })

  afterEach(() => {
    app.close()
    app = null
  })

  it("can return objects", done => {

  })
})
