var Tweenr = require('tweenr')
var extend = require('xtend')

module.exports = tween

function tween (options) {
  var tweenr = Tweenr()

  recursiveStep(tweenr, options)

  return tweenr
}

function recursiveStep (tweenr, options) {
  return tweenr.to(
    options.state,
    extend(options.nextState(), {
      duration: options.duration,
      ease: options.ease,
    })
  )
  .on('complete', function () {
    recursiveStep(tweenr, options)
  })
}