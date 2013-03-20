#= require application
#= require lib/ldr
#= require sinon

describe "LDR.Application", ->
  before ->
    window.ApiKey = 'dummy'
    LDR.StateClass = ->
      this.startListener = ->
    LDR.StateClass::startListener = ->
    LDR.Config = ->

  describe "getInstance", ->
    it "return same instance", ->
      app1 = LDR.Application.getInstance()
      app2 = LDR.Application.getInstance()
      expect(app1).equal(app2)

  describe "#load", ->
    it "callback with `initialized` true", (done) ->
      app = LDR.Application.getInstance()

      # bind function can't stub...
      app.config = startListener: ->

      app.load {}, ->
        expect(app.initialized).to.be.true
        done()

