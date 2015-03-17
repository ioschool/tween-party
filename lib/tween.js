var Tweenr = require('tweenr')
var extend = require('xtend')

module.exports = tween

function tween (options) {
  var tweenr = Tweenr()

  step(tweenr, options)
  .on('complete', function () {
    step(tweenr, options)
  })

  return tweenr
}

function step (tweenr, options) {
  return tweenr.to(
    options.state,
    extend(options.nextState(), {
      duration: options.duration,
      ease: options.ease,
    })
  )
}
