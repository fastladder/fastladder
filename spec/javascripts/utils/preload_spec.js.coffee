#= require application
describe "LDR.preload", ->
  it "callback after all image fetched", (done) ->
    # Image class stubbing is a bit difficult...
    # https://github.com/cjohansen/Sinon.JS/issues/189
    assets = [
      '/img/rate/0.gif'
      '/img/rate/1.gif'
      '/img/rate/2.gif'
    ]
    LDR.preload assets, ->
      done()


