#= require application

describe "LDR.Application", ->

  describe "getInstance", ->
    it "return same instance", ->
      app1 = LDR.Application.getInstance()
      app2 = LDR.Application.getInstance()
      expect(app1).equal(app2)

  describe "#load", ->
    it "callback with `initialized` true", (done) ->
      app = LDR.Application.getInstance()
      expect(app.initialized).to.be.false

      # TODO: sinon stub when internal initializers affect to others
      app.load {}, ->
        expect(app.initialized).to.be.true
        done()

