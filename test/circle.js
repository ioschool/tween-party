var test = require('tape')
var createSvgElement = require('svg-node')

var Circle

test("can require Circle", function (t) {
  Circle = require('../lib/circle')
  t.ok(Circle, "Circle is exported")
  t.equal(typeof Circle, 'function', "Circle is a function")
  t.end()
})

test("can create empty circle", function (t) {
  var circle = Circle()
  t.equal(typeof circle, 'object', "Circle() returns object")
  t.ok(circle.state, "circle.state exists")
  t.deepEqual(circle.state, {}, "circle.state defaults to {}")
  t.ok(circle.element, "circle.element exists")
  t.equal(circle.element.nodeName.toLowerCase(), 'circle', "circle.element defaults to a circle node")
  t.equal(typeof circle.render, 'function', "circle.render is a function")
  t.equal(typeof circle.appendTo, 'function', "circle.appendTo is a function")
  t.end()
})

function addSvg () {
  var svg = createSvgElement('svg')
  document.body.appendChild(svg)
  return svg
}

function removeSvg (svg) {
  document.body.removeChild(svg)
}

test("can append circle to dom", function (t) {
  var svg = addSvg()
  var circle = Circle()
  t.notOk(svg.contains(circle.element), "svg doesn't contain circle before append")
  circle.appendTo("svg")
  t.ok(svg.contains(circle.element), "svg contains circle after append")
  removeSvg(svg)
  t.end()
})

test("can render circle based on state", function (t) {
  var state = {
    hue: 180,
    radius: 50,
    position: [100, 200],
  }
  var circle = Circle({ state: state })
  t.equal(state, circle.state)
  circle.render()
  t.equal(circle.element.getAttribute('r'), state.radius.toString())
  t.equal(circle.element.getAttribute('cx'), state.position[0].toString())
  t.equal(circle.element.getAttribute('cy'), state.position[1].toString())
  t.equal(
    circle.element.getAttribute('fill'),
    "hsl(" + state.hue + ", 100%, 50%)"
  )
  t.end()
})
