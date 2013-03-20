#= require application
#= require lib/models/config
#= require sinon

describe "LDR.Config", ->
  describe "#constructor", ->
    it "has onConfigChange", ->
      config = new LDR.Config
      expect(config.onConfigChange).deep.equal {}

  describe "#addCallback", ->
    it "add callback to onConfigChange", (done)->
      config = new LDR.Config
      config.addCallback 'foo', done
      config.onConfigChange['foo']()

  describe "#set", ->
    it "call #save after set", ->
      config = new LDR.Config
      saveStub = sinon.stub(config, 'set').returns ''
      config.set 'param', 1
      expect(saveStub.called).equal true

    it "callback onConfigChange methods with old and new", (done) ->
      config = new LDR.Config
      config.save = ->
      key = 'param'
      callback = (old, current) ->
        done() if current is 2 and old is 1
      config.addCallback key, callback
      config.set key, 1
      config.set key, 2

  describe "#save", ->
    it "post to server", ->
      postSpy = sinon.spy()
      LDR.API = class
        post: postSpy

      config = new LDR.Config
      config.save()
      expect(postSpy.called).to.be.true

  describe "#load", ->
    # not valid case
    it "load config from server", ->
      config = new LDR.Config

      postSpy = sinon.spy()
      LDR.API = class
        post: postSpy
      config.save()

      expect(postSpy.called).to.be.true

  describe "#startListener", ->
    # not valid case
    it "listen config value", ->
      config = new LDR.Config
      spy = sinon.spy()
      config.addCallback = spy
      config.startListener()

      expect(spy.withArgs('view_mode', sinon.match.any).calledOnce).to.be.true
      expect(spy.withArgs('sort_mode', sinon.match.any).calledOnce).to.be.true
      expect(spy.withArgs('current_font', sinon.match.any).calledOnce).to.be.true
      expect(spy.withArgs('show_all', sinon.match.any).calledOnce).to.be.true

