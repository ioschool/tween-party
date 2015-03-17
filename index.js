var Circle = require('./lib/circle')
var tween = require('./lib/tween')
var keyUp = require('./lib/keyup')

keyUp('space', function () {
  startCircle()
})

var bounds = [
  document.body.clientWidth,
  document.body.clientHeight,
]
var randomState = Circle.randomState.bind(null, bounds)

function startCircle () {

  var circle = Circle({
    state: randomState(),
  })
  circle.render()
  circle.appendTo('svg')

  tween({
    state: circle.state,
    nextState: randomState,
    duration: 5,
    ease: "quadOut",
  })
  .on('tick', function () {
    console.log("tick", circle.state)
    circle.render()
  })

}
