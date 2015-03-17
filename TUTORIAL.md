# tween party!

in this tutorial, we will be [playing](http://www.creativebloq.com/design/examples-svg-7112785) with [HTML5](http://diveintohtml5.info/) [SVG](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Introduction)s using [easing](http://easings.net/) [tweening](https://en.wikipedia.org/wiki/Inbetweening).

let's get started! :3

# setup initial project

there are two ways to setup our project, we can either

clone this project (which has this tutorial, tests, and all the packages we need already in the package.json):

```
$ git clone https://github.com/ioschool/tween-party
$ cd tween-party
$ npm install
```

or generate a fresh project:

```
$ npm install -g slush slush-pages
$ slush pages
[slush] Using slushfile /home/dinosaur/.nvm/versions/io.js/v1.4.2/lib/node_modules/slush-pages/slushfile.js
? Give your app a name: tween-party
? How would you describe the app? tweening graphics like what
? What is your name on GitHub? ohmyname
? Choose a license: ISC
```

# start server

```
$ npm start
> tween-party@1.0.0 start /home/dinosaur/repos/ioschool/tween-party
> beefy index.js:bundle.js 5000 --live

beefy (v2.1.3) is listening on http://127.0.0.1:5000
```

browse to <http://localhost:5000>. (=^.^=)

# add svg to html

```html
<!-- index.html -->
<!-- ... -->
<main>
  <svg height="100%" width="100%">
  </svg>
</main>
<!-- ... -->
```

# normalize page in css

```css
<!-- index.css -->
html, body, main {
  height: 100%;
  width: 100%;
  padding: 0;
  margin: 0;
}
```

# render a random circle in js

write a `Circle` [component](https://github.com/substack/browserify-handbook#reusable-components) in `./lib/circle` that allows for the following:

```javascript
// index.js
var Circle = require('./lib/circle')

var bounds = [
  document.body.clientWidth,
  document.body.clientHeight,
]

// get a randomState function with
// the bounds arguments already applied
var randomState = Circle.randomState.bind(null, bounds)

var circle = Circle({
  state: randomState,
})
circle.render()
circle.appendTo('svg')
```

where `circle.state` is of the form:

```javascript
{
  hue: 0, // color as a number from 0 to 360, inclusive
  radius: 0, // size of circle
  position: [0, 0], // [x, y] position of circle
}
```

, `circle.element` is a `circle` [SVG element](https://npmjs.com/package/svg-node)

, `circle.render()` is a function that [sets the attributes](https://developer.mozilla.org/en-US/docs/Web/API/Element/setAttribute) in `circle.state` onto `circle.element` using the following mapping:

```
hue -> setAttribute('fill', 'hsl('+ hue + ', 100%, 50%)')
radius -> setAttribute('r', radius)
position ->
  setAttribute('cx', position[0])
  setAttribute('cy', position[1])
```

, and `circle.appendTo(target)` is a function that appends `circle.element` to `target`, where `target` can be either a DOM element or a querySelector string.

# randomly tween our circle

now we'll use the [`tweenr` module](https://npmjs.com/package/tweenr) to animate our circle from one random state to another random state to another random state and so on.

we'll write a `tween` function in `lib/tween.js` that allows for the following:

```javascript
// index.js

// ...

var tween = require('./lib/tween')

// ...

tween({
  state: circle.state,
  nextState: randomState,
  duration: 5,
  ease: "quadOut",
})
.on('tick', function () {
  circle.render()
})
```

where `state` is the object being tweened

, `nextState` is a function to generate the next `state` to tween to

, `duration` is the time in seconds to run each tween

, `tick` is an event being emitted by the object returned by the `tween` function

, and `ease` is the name of the [easing function](https://npmjs.com/package/eases) to run on each tween.


# more circles

we need more circles! let's add another circle every time we enter the spacebar.

let's write a `keyup` module in `lib/keyup.js` that allows for the following:

```
var keyUp = require('./lib/keyup')

keyUp('space', function () {
  startCircle()
})
```

where `startCircle` is our previous code to start a new circle made into a function.

where `keyUp` is a function that takes in a [key name](http://npmjs.com/package/keycode) and a callback and calls the callback every time the [keyup](https://developer.mozilla.org/en-US/docs/Web/Events/keyup) event is fired on the global `window`.
