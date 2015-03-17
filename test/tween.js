var test = require('tape')

var tween

test("can require tween", function (t) {
  tween = require('../lib/tween')
  t.ok(tween, "tween is exported")
  t.equal(typeof tween, 'function', "tween is a function")
  t.end()
})

test("tween() tweens", function (t) {
  t.end()
})

test("tween() ticks", function (t) {
  t.end()
})
