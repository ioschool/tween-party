var eventToKey = require('keycode')

module.exports = keyup

function keyup (name, callback) {
  window.addEventListener('keyup', function (ev) {
    if (eventToKey(ev) === name) {
      callback(ev)
    }
  })
}
