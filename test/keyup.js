var test = require('tape')
var keycodes = require('keycode').codes
var domEvent = require('synthetic-dom-events')

var keyup

test("can require keyup", function (t) {
  keyup = require('../lib/keyup')
  t.ok(keyup, "keyup is exported")
  t.equal(typeof keyup, 'function', "keyup is a function")
  t.end()
})

test("keyup calls callback on keyup events", function (t) {
  t.plan(Object.keys(keycodes).length)

  Object.keys(keycodes).forEach(function (name) {
    var keycode = keycodes[name]

    // setup keyup listener
    keyup(name, function () {
      t.ok(true, name + " key callback is called")
    })

    // fire keyup event
    var ev = domEvent('keyup', { keyCode: keycode })
    window.dispatchEvent(ev)
  })
})

