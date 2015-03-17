var select = require('dom-select')
var createSvgElement = require('svg-node')
var randomNumber = require('random-number-in-range')

module.exports = Circle

function Circle (options) {
  // allow for both `new Circle(...)` or `Circle(...)`
  if (!(this instanceof Circle)) { return new Circle(options) }

  // default options
  options = options || {} 

  this.state = options.state || {}
  this.element = options.element || createSvgElement('circle')
}

Circle.randomState = function (bounds) {
  var minBound = Math.floor(Math.min.apply(Math, bounds) / 4)
  return {
    hue: randomNumber(0, 360),
    radius: randomNumber(1, minBound),
    position: [
      randomNumber(0, bounds[0]),
      randomNumber(0, bounds[1]),
    ],
  }
}

Circle.prototype.render = function () {
  this.element.setAttribute('r', this.state.radius)
  this.element.setAttribute('cx', this.state.position[0])
  this.element.setAttribute('cy', this.state.position[1])
  this.element.setAttribute('fill',
    'hsl(' + this.state.hue + ', 100%, 50%)'
  )
}


Circle.prototype.appendTo = function (target) {
  if (typeof target === 'string') {
    target = select(target)
  }
  target.appendChild(this.element)
}
