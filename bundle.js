(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
function startCircle(){var e=Circle({state:randomState()});e.render(),e.appendTo("svg"),tween({state:e.state,nextState:randomState,duration:5,ease:"quadOut"}).on("tick",function(){console.log("tick",e.state),e.render()})}var Circle=require("./lib/circle"),tween=require("./lib/tween"),keyUp=require("./lib/keyup");keyUp("space",function(){startCircle()});var bounds=[document.body.clientWidth,document.body.clientHeight],randomState=Circle.randomState.bind(null,bounds);
},{"./lib/circle":2,"./lib/keyup":3,"./lib/tween":4}],2:[function(require,module,exports){
function Circle(e){return this instanceof Circle?(e=e||{},this.state=e.state||{},void(this.element=e.element||createSvgElement("circle"))):new Circle(e)}var select=require("dom-select"),createSvgElement=require("svg-node"),randomNumber=require("random-number-in-range");module.exports=Circle,Circle.randomState=function(e){var t=Math.floor(Math.min.apply(Math,e)/4);return{hue:randomNumber(0,360),radius:randomNumber(1,t),position:[randomNumber(0,e[0]),randomNumber(0,e[1])]}},Circle.prototype.render=function(){this.element.setAttribute("r",this.state.radius),this.element.setAttribute("cx",this.state.position[0]),this.element.setAttribute("cy",this.state.position[1]),this.element.setAttribute("fill","hsl("+this.state.hue+", 100%, 50%)")},Circle.prototype.appendTo=function(e){"string"==typeof e&&(e=select(e)),e.appendChild(this.element)};


},{"dom-select":8,"random-number-in-range":11,"svg-node":12}],3:[function(require,module,exports){
function keyup(e,n){window.addEventListener("keyup",function(o){eventToKey(o)===e&&n(o)})}var eventToKey=require("keycode");module.exports=keyup;


},{"keycode":10}],4:[function(require,module,exports){
function tween(e){var t=Tweenr();return step(t,e).on("complete",function(){step(t,e)}),t}function step(e,t){return e.to(t.state,extend(t.nextState(),{duration:t.duration,ease:t.ease}))}var Tweenr=require("tweenr"),extend=require("xtend");module.exports=tween;


},{"tweenr":13,"xtend":63}],5:[function(require,module,exports){
function EventEmitter(){this._events=this._events||{},this._maxListeners=this._maxListeners||void 0}function isFunction(e){return"function"==typeof e}function isNumber(e){return"number"==typeof e}function isObject(e){return"object"==typeof e&&null!==e}function isUndefined(e){return void 0===e}module.exports=EventEmitter,EventEmitter.EventEmitter=EventEmitter,EventEmitter.prototype._events=void 0,EventEmitter.prototype._maxListeners=void 0,EventEmitter.defaultMaxListeners=10,EventEmitter.prototype.setMaxListeners=function(e){if(!isNumber(e)||0>e||isNaN(e))throw TypeError("n must be a positive number");return this._maxListeners=e,this},EventEmitter.prototype.emit=function(e){var t,n,s,i,r,o;if(this._events||(this._events={}),"error"===e&&(!this._events.error||isObject(this._events.error)&&!this._events.error.length)){if(t=arguments[1],t instanceof Error)throw t;throw TypeError('Uncaught, unspecified "error" event.')}if(n=this._events[e],isUndefined(n))return!1;if(isFunction(n))switch(arguments.length){case 1:n.call(this);break;case 2:n.call(this,arguments[1]);break;case 3:n.call(this,arguments[1],arguments[2]);break;default:for(s=arguments.length,i=new Array(s-1),r=1;s>r;r++)i[r-1]=arguments[r];n.apply(this,i)}else if(isObject(n)){for(s=arguments.length,i=new Array(s-1),r=1;s>r;r++)i[r-1]=arguments[r];for(o=n.slice(),s=o.length,r=0;s>r;r++)o[r].apply(this,i)}return!0},EventEmitter.prototype.addListener=function(e,t){var n;if(!isFunction(t))throw TypeError("listener must be a function");if(this._events||(this._events={}),this._events.newListener&&this.emit("newListener",e,isFunction(t.listener)?t.listener:t),this._events[e]?isObject(this._events[e])?this._events[e].push(t):this._events[e]=[this._events[e],t]:this._events[e]=t,isObject(this._events[e])&&!this._events[e].warned){var n;n=isUndefined(this._maxListeners)?EventEmitter.defaultMaxListeners:this._maxListeners,n&&n>0&&this._events[e].length>n&&(this._events[e].warned=!0,console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.",this._events[e].length),"function"==typeof console.trace&&console.trace())}return this},EventEmitter.prototype.on=EventEmitter.prototype.addListener,EventEmitter.prototype.once=function(e,t){function n(){this.removeListener(e,n),s||(s=!0,t.apply(this,arguments))}if(!isFunction(t))throw TypeError("listener must be a function");var s=!1;return n.listener=t,this.on(e,n),this},EventEmitter.prototype.removeListener=function(e,t){var n,s,i,r;if(!isFunction(t))throw TypeError("listener must be a function");if(!this._events||!this._events[e])return this;if(n=this._events[e],i=n.length,s=-1,n===t||isFunction(n.listener)&&n.listener===t)delete this._events[e],this._events.removeListener&&this.emit("removeListener",e,t);else if(isObject(n)){for(r=i;r-->0;)if(n[r]===t||n[r].listener&&n[r].listener===t){s=r;break}if(0>s)return this;1===n.length?(n.length=0,delete this._events[e]):n.splice(s,1),this._events.removeListener&&this.emit("removeListener",e,t)}return this},EventEmitter.prototype.removeAllListeners=function(e){var t,n;if(!this._events)return this;if(!this._events.removeListener)return 0===arguments.length?this._events={}:this._events[e]&&delete this._events[e],this;if(0===arguments.length){for(t in this._events)"removeListener"!==t&&this.removeAllListeners(t);return this.removeAllListeners("removeListener"),this._events={},this}if(n=this._events[e],isFunction(n))this.removeListener(e,n);else for(;n.length;)this.removeListener(e,n[n.length-1]);return delete this._events[e],this},EventEmitter.prototype.listeners=function(e){var t;return t=this._events&&this._events[e]?isFunction(this._events[e])?[this._events[e]]:this._events[e].slice():[]},EventEmitter.listenerCount=function(e,t){var n;return n=e._events&&e._events[t]?isFunction(e._events[t])?1:e._events[t].length:0};


},{}],6:[function(require,module,exports){
function drainQueue(){if(!draining){draining=!0;for(var e,o=queue.length;o;){e=queue,queue=[];for(var r=-1;++r<o;)e[r]();o=queue.length}draining=!1}}function noop(){}var process=module.exports={},queue=[],draining=!1;process.nextTick=function(e){queue.push(e),draining||setTimeout(drainQueue,0)},process.title="browser",process.browser=!0,process.env={},process.argv=[],process.version="",process.versions={},process.on=noop,process.addListener=noop,process.once=noop,process.off=noop,process.removeListener=noop,process.removeAllListeners=noop,process.emit=noop,process.binding=function(){throw new Error("process.binding is not supported")},process.cwd=function(){return"/"},process.chdir=function(){throw new Error("process.chdir is not supported")},process.umask=function(){return 0};


},{}],7:[function(require,module,exports){
function all(e,r){return qwery(e,r)}function one(e,r){return all(e,r)[0]}var qwery=require("qwery");module.exports={one:one,all:all};


},{"qwery":9}],8:[function(require,module,exports){
function one(l,e){return e||(e=document),e.querySelector?e.querySelector(l):fallback.one(l,e)}function all(l,e){return e||(e=document),e.querySelectorAll?e.querySelectorAll(l):fallback.all(l,e)}var fallback=require("./fallback");module.exports=one,module.exports.all=all;


},{"./fallback":7}],9:[function(require,module,exports){
!function(t,e,n){"undefined"!=typeof module&&module.exports?module.exports=n():"function"==typeof define&&define.amd?define(n):e[t]=n()}("qwery",this,function(){function t(){this.c={}}function e(t){return U.g(t)||U.s(t,"(^|\\s+)"+t+"(\\s+|$)",1)}function n(t,e){for(var n=0,r=t.length;r>n;n++)e(t[n])}function r(t){for(var e=[],n=0,r=t.length;r>n;++n)m(t[n])?e=e.concat(t[n]):e[e.length]=t[n];return e}function i(t){for(var e=0,n=t.length,r=[];n>e;e++)r[e]=t[e];return r}function u(t){for(;(t=t.previousSibling)&&1!=t[D];);return t}function o(t){return t.match(J)}function c(t,n,r,i,u,o,c,s,a,l,g){var h,p,m,d,w;if(1!==this[D])return!1;if(n&&"*"!==n&&this[q]&&this[q].toLowerCase()!==n)return!1;if(r&&(p=r.match(R))&&p[1]!==this.id)return!1;if(r&&(w=r.match(B)))for(h=w.length;h--;)if(!e(w[h].slice(1)).test(this.className))return!1;if(a&&v.pseudos[a]&&!v.pseudos[a](this,g))return!1;if(i&&!c){d=this.attributes;for(m in d)if(Object.prototype.hasOwnProperty.call(d,m)&&(d[m].name||m)==u)return this}return i&&!f(o,Z(this,u)||"",c)?!1:this}function s(t){return V.g(t)||V.s(t,t.replace(_,"\\$1"))}function f(t,e,n){switch(t){case"=":return e==n;case"^=":return e.match(W.g("^="+n)||W.s("^="+n,"^"+s(n),1));case"$=":return e.match(W.g("$="+n)||W.s("$="+n,s(n)+"$",1));case"*=":return e.match(W.g(n)||W.s(n,s(n),1));case"~=":return e.match(W.g("~="+n)||W.s("~="+n,"(?:^|\\s+)"+s(n)+"(?:\\s+|$)",1));case"|=":return e.match(W.g("|="+n)||W.s("|="+n,"^"+s(n)+"(-|$)",1))}return 0}function a(t,e){var r,i,u,s,f,a,l,h=[],p=[],m=e,d=X.g(t)||X.s(t,t.split(G)),v=t.match(k);if(!d.length)return h;if(s=(d=d.slice(0)).pop(),d.length&&(u=d[d.length-1].match(C))&&(m=w(e,u[1])),!m)return h;for(a=o(s),f=m!==e&&9!==m[D]&&v&&/^[+~]$/.test(v[v.length-1])?function(t){for(;m=m.nextSibling;)1==m[D]&&(a[1]?a[1]==m[q].toLowerCase():1)&&(t[t.length]=m);return t}([]):m[E](a[1]||"*"),r=0,i=f.length;i>r;r++)(l=c.apply(f[r],a))&&(h[h.length]=l);return d.length?(n(h,function(t){g(t,d,v)&&(p[p.length]=t)}),p):h}function l(t,e,n){if(h(e))return t==e;if(m(e))return!!~r(e).indexOf(t);for(var i,u,s=e.split(",");e=s.pop();)if(i=X.g(e)||X.s(e,e.split(G)),u=e.match(k),i=i.slice(0),c.apply(t,o(i.pop()))&&(!i.length||g(t,i,u,n)))return!0;return!1}function g(t,e,n,r){function i(t,r,s){for(;s=K[n[r]](s,t);)if(h(s)&&c.apply(s,o(e[r]))){if(!r)return s;if(u=i(s,r-1,s))return u}}var u;return(u=i(t,e.length-1,t))&&(!r||Y(u,r))}function h(t,e){return t&&"object"==typeof t&&(e=t[D])&&(1==e||9==e)}function p(t){var e,n,r=[];t:for(e=0;e<t.length;++e){for(n=0;n<r.length;++n)if(r[n]==t[e])continue t;r[r.length]=t[e]}return r}function m(t){return"object"==typeof t&&isFinite(t.length)}function d(t){return t?"string"==typeof t?v(t)[0]:!t[D]&&m(t)?t[0]:t:b}function w(t,e,n){return 9===t[D]?t.getElementById(e):t.ownerDocument&&((n=t.ownerDocument.getElementById(e))&&Y(n,t)&&n||!Y(t,t.ownerDocument)&&$('[id="'+e+'"]',t)[0])}function v(t,e){var n,u,o=d(e);if(!o||!t)return[];if(t===window||h(t))return!e||t!==window&&h(o)&&Y(t,o)?[t]:[];if(t&&m(t))return r(t);if(n=t.match(M)){if(n[1])return(u=w(o,n[1]))?[u]:[];if(n[2])return i(o[E](n[2]));if(tt&&n[3])return i(o[x](n[3]))}return $(t,o)}function y(t,e){return function(n){var r,i;return P.test(n)?void(9!==t[D]&&((i=r=t.getAttribute("id"))||t.setAttribute("id",i="__qwerymeupscotty"),n='[id="'+i+'"]'+n,e(t.parentNode||t,n,!0),r||t.removeAttribute("id"))):void(n.length&&e(t,n,!1))}}var $,b=document,N=b.documentElement,x="getElementsByClassName",E="getElementsByTagName",A="querySelectorAll",S="useNativeQSA",q="tagName",D="nodeType",R=/#([\w\-]+)/,B=/\.[\w\-]+/g,C=/^#([\w\-]+)$/,j=/^\.([\w\-]+)$/,L=/^([\w\-]+)$/,O=/^([\w]+)?\.([\w\-]+)$/,P=/(^|,)\s*[>~+]/,T=/^\s+|\s*([,\s\+\~>]|$)\s*/g,I=/[\s\>\+\~]/,Q=/(?![\s\w\-\/\?\&\=\:\.\(\)\!,@#%<>\{\}\$\*\^'"]*\]|[\s\w\+\-]*\))/,_=/([.*+?\^=!:${}()|\[\]\/\\])/g,z=/^(\*|[a-z0-9]+)?(?:([\.\#]+[\w\-\.#]+)?)/,F=/\[([\w\-]+)(?:([\|\^\$\*\~]?\=)['"]?([ \w\-\/\?\&\=\:\.\(\)\!,@#%<>\{\}\$\*\^]+)["']?)?\]/,H=/:([\w\-]+)(\(['"]?([^()]+)['"]?\))?/,M=new RegExp(C.source+"|"+L.source+"|"+j.source),k=new RegExp("("+I.source+")"+Q.source,"g"),G=new RegExp(I.source+Q.source),J=new RegExp(z.source+"("+F.source+")?("+H.source+")?"),K={" ":function(t){return t&&t!==N&&t.parentNode},">":function(t,e){return t&&t.parentNode==e.parentNode&&t.parentNode},"~":function(t){return t&&t.previousSibling},"+":function(t,e,n,r){return t?(n=u(t))&&(r=u(e))&&n==r&&n:!1}};t.prototype={g:function(t){return this.c[t]||void 0},s:function(t,e,n){return e=n?new RegExp(e):e,this.c[t]=e}};var U=new t,V=new t,W=new t,X=new t,Y="compareDocumentPosition"in N?function(t,e){return 16==(16&e.compareDocumentPosition(t))}:"contains"in N?function(t,e){return e=9===e[D]||e==window?N:e,e!==t&&e.contains(t)}:function(t,e){for(;t=t.parentNode;)if(t===e)return 1;return 0},Z=function(){var t=b.createElement("p");return(t.innerHTML='<a href="#x">x</a>')&&"#x"!=t.firstChild.getAttribute("href")?function(t,e){return"class"===e?t.className:"href"===e||"src"===e?t.getAttribute(e,2):t.getAttribute(e)}:function(t,e){return t.getAttribute(e)}}(),tt=!!b[x],et=b.querySelector&&b[A],nt=function(t,e){var r,u,o=[];try{return 9!==e[D]&&P.test(t)?(n(r=t.split(","),y(e,function(t,e){u=t[A](e),1==u.length?o[o.length]=u.item(0):u.length&&(o=o.concat(i(u)))})),r.length>1&&o.length>1?p(o):o):i(e[A](t))}catch(c){}return rt(t,e)},rt=function(t,r){var i,u,o,c,s,f,l=[];if(t=t.replace(T,"$1"),u=t.match(O)){for(s=e(u[2]),i=r[E](u[1]||"*"),o=0,c=i.length;c>o;o++)s.test(i[o].className)&&(l[l.length]=i[o]);return l}return n(f=t.split(","),y(r,function(t,e,n){for(s=a(e,t),o=0,c=s.length;c>o;o++)(9===t[D]||n||Y(s[o],r))&&(l[l.length]=s[o])})),f.length>1&&l.length>1?p(l):l},it=function(t){"undefined"!=typeof t[S]&&($=t[S]&&et?nt:rt)};return it({useNativeQSA:!0}),v.configure=it,v.uniq=p,v.is=l,v.pseudos={},v});


},{}],10:[function(require,module,exports){
exports=module.exports=function(e){if(e&&"object"==typeof e){var a=e.which||e.keyCode||e.charCode;a&&(e=a)}if("number"==typeof e)return names[e];var o=String(e),i=codes[o.toLowerCase()];if(i)return i;var i=aliases[o.toLowerCase()];return i?i:1===o.length?o.charCodeAt(0):void 0};var codes=exports.code=exports.codes={backspace:8,tab:9,enter:13,shift:16,ctrl:17,alt:18,"pause/break":19,"caps lock":20,esc:27,space:32,"page up":33,"page down":34,end:35,home:36,left:37,up:38,right:39,down:40,insert:45,"delete":46,command:91,"right click":93,"numpad *":106,"numpad +":107,"numpad -":109,"numpad .":110,"numpad /":111,"num lock":144,"scroll lock":145,"my computer":182,"my calculator":183,";":186,"=":187,",":188,"-":189,".":190,"/":191,"`":192,"[":219,"\\":220,"]":221,"'":222},aliases=exports.aliases={windows:91,"⇧":16,"⌥":18,"⌃":17,"⌘":91,ctl:17,control:17,option:18,pause:19,"break":19,caps:20,escape:27,spc:32,pgup:33,pgdn:33,ins:45,del:46,cmd:91};for(i=97;123>i;i++)codes[String.fromCharCode(i)]=i-32;for(var i=48;58>i;i++)codes[i-48]=i;for(i=1;13>i;i++)codes["f"+i]=i+111;for(i=0;10>i;i++)codes["numpad "+i]=i+96;var names=exports.names=exports.title={};for(i in codes)names[codes[i]]=i;for(var alias in aliases)codes[alias]=aliases[alias];


},{}],11:[function(require,module,exports){
"use strict";var random=function(o,r){return void 0===o&&(o=0),void 0===r&&(r=100),Math.floor(Math.random()*(r-o))+o};exports["default"]=random,module.exports=exports["default"];


},{}],12:[function(require,module,exports){
function createSVGElement(e,t){return(t||document).createElementNS(ns,e)}var ns="http://www.w3.org/2000/svg";module.exports=createSVGElement,module.exports.ns=ns;


},{}],13:[function(require,module,exports){
function Tweenr(e){return this instanceof Tweenr?(Ticker.call(this,xtend(defaultOpt,e)),EventEmitter.call(this),this._handleTick=function(e){e=Math.min(30,e),e/=1e3,this.emit("tick",e),this.tick(e)}.bind(this),void loop.on("tick",this._handleTick)):new Tweenr(e)}var xtend=require("xtend"),eases=require("eases"),Ticker=require("tween-ticker"),EventEmitter=require("events").EventEmitter,inherits=require("inherits"),mixin=require("mixes"),loop=require("./loop"),defaultOpt={eases:eases};module.exports=Tweenr,inherits(Tweenr,Ticker),mixin(Tweenr,EventEmitter.prototype),Tweenr.prototype.dispose=function(){loop.removeListener("tick",this._handleTick)};


},{"./loop":14,"eases":33,"events":5,"inherits":47,"mixes":48,"tween-ticker":53,"xtend":62}],14:[function(require,module,exports){
var engine=require("raf-loop")();engine.start(),module.exports=engine;


},{"raf-loop":49}],15:[function(require,module,exports){
function backInOut(n){var t=2.5949095;return(n*=2)<1?.5*n*n*((t+1)*n-t):.5*((n-=2)*n*((t+1)*n+t)+2)}module.exports=backInOut;


},{}],16:[function(require,module,exports){
function backIn(n){var r=1.70158;return n*n*((r+1)*n-r)}module.exports=backIn;


},{}],17:[function(require,module,exports){
function backOut(t){var u=1.70158;return--t*t*((u+1)*t+u)+1}module.exports=backOut;


},{}],18:[function(require,module,exports){
function bounceInOut(u){return.5>u?.5*(1-bounceOut(1-2*u)):.5*bounceOut(2*u-1)+.5}var bounceOut=require("./bounce-out");module.exports=bounceInOut;


},{"./bounce-out":20}],19:[function(require,module,exports){
function bounceIn(u){return 1-bounceOut(1-u)}var bounceOut=require("./bounce-out");module.exports=bounceIn;


},{"./bounce-out":20}],20:[function(require,module,exports){
function bounceOut(u){var e=4/11,n=8/11,o=.9,t=4356/361,r=35442/1805,c=16061/1805,b=u*u;return e>u?7.5625*b:n>u?9.075*b-9.9*u+3.4:o>u?t*b-r*u+c:10.8*u*u-20.52*u+10.72}module.exports=bounceOut;


},{}],21:[function(require,module,exports){
function circInOut(t){return(t*=2)<1?-.5*(Math.sqrt(1-t*t)-1):.5*(Math.sqrt(1-(t-=2)*t)+1)}module.exports=circInOut;


},{}],22:[function(require,module,exports){
function circIn(r){return 1-Math.sqrt(1-r*r)}module.exports=circIn;


},{}],23:[function(require,module,exports){
function circOut(t){return Math.sqrt(1- --t*t)}module.exports=circOut;


},{}],24:[function(require,module,exports){
function cubicInOut(u){return.5>u?4*u*u*u:.5*Math.pow(2*u-2,3)+1}module.exports=cubicInOut;


},{}],25:[function(require,module,exports){
function cubicIn(c){return c*c*c}module.exports=cubicIn;


},{}],26:[function(require,module,exports){
function cubicOut(u){var c=u-1;return c*c*c+1}module.exports=cubicOut;


},{}],27:[function(require,module,exports){
function elasticInOut(t){return.5>t?.5*Math.sin(13*Math.PI/2*2*t)*Math.pow(2,10*(2*t-1)):.5*Math.sin(-13*Math.PI/2*(2*t-1+1))*Math.pow(2,-10*(2*t-1))+1}module.exports=elasticInOut;


},{}],28:[function(require,module,exports){
function elasticIn(t){return Math.sin(13*t*Math.PI/2)*Math.pow(2,10*(t-1))}module.exports=elasticIn;


},{}],29:[function(require,module,exports){
function elasticOut(t){return Math.sin(-13*(t+1)*Math.PI/2)*Math.pow(2,-10*t)+1}module.exports=elasticOut;


},{}],30:[function(require,module,exports){
function expoInOut(o){return 0===o||1===o?o:.5>o?.5*Math.pow(2,20*o-10):-.5*Math.pow(2,10-20*o)+1}module.exports=expoInOut;


},{}],31:[function(require,module,exports){
function expoIn(o){return 0===o?o:Math.pow(2,10*(o-1))}module.exports=expoIn;


},{}],32:[function(require,module,exports){
function expoOut(o){return 1===o?o:1-Math.pow(2,-10*o)}module.exports=expoOut;


},{}],33:[function(require,module,exports){
module.exports={backInOut:require("./back-in-out"),backIn:require("./back-in"),backOut:require("./back-out"),bounceInOut:require("./bounce-in-out"),bounceIn:require("./bounce-in"),bounceOut:require("./bounce-out"),circInOut:require("./circ-in-out"),circIn:require("./circ-in"),circOut:require("./circ-out"),cubicInOut:require("./cubic-in-out"),cubicIn:require("./cubic-in"),cubicOut:require("./cubic-out"),elasticInOut:require("./elastic-in-out"),elasticIn:require("./elastic-in"),elasticOut:require("./elastic-out"),expoInOut:require("./expo-in-out"),expoIn:require("./expo-in"),expoOut:require("./expo-out"),linear:require("./linear"),quadInOut:require("./quad-in-out"),quadIn:require("./quad-in"),quadOut:require("./quad-out"),quartInOut:require("./quart-in-out"),quartIn:require("./quart-in"),quartOut:require("./quart-out"),quintInOut:require("./quint-in-out"),quintIn:require("./quint-in"),quintOut:require("./quint-out"),sineInOut:require("./sine-in-out"),sineIn:require("./sine-in"),sineOut:require("./sine-out")};


},{"./back-in":16,"./back-in-out":15,"./back-out":17,"./bounce-in":19,"./bounce-in-out":18,"./bounce-out":20,"./circ-in":22,"./circ-in-out":21,"./circ-out":23,"./cubic-in":25,"./cubic-in-out":24,"./cubic-out":26,"./elastic-in":28,"./elastic-in-out":27,"./elastic-out":29,"./expo-in":31,"./expo-in-out":30,"./expo-out":32,"./linear":34,"./quad-in":36,"./quad-in-out":35,"./quad-out":37,"./quart-in":39,"./quart-in-out":38,"./quart-out":40,"./quint-in":42,"./quint-in-out":41,"./quint-out":43,"./sine-in":45,"./sine-in-out":44,"./sine-out":46}],34:[function(require,module,exports){
function linear(e){return e}module.exports=linear;


},{}],35:[function(require,module,exports){
function quadInOut(u){return u/=.5,1>u?.5*u*u:(u--,-.5*(u*(u-2)-1))}module.exports=quadInOut;


},{}],36:[function(require,module,exports){
function quadIn(n){return n*n}module.exports=quadIn;


},{}],37:[function(require,module,exports){
function quadOut(u){return-u*(u-2)}module.exports=quadOut;


},{}],38:[function(require,module,exports){
function quarticInOut(t){return.5>t?8*Math.pow(t,4):-8*Math.pow(t-1,4)+1}module.exports=quarticInOut;


},{}],39:[function(require,module,exports){
function quarticIn(t){return Math.pow(t,4)}module.exports=quarticIn;


},{}],40:[function(require,module,exports){
function quarticOut(t){return Math.pow(t-1,3)*(1-t)+1}module.exports=quarticOut;


},{}],41:[function(require,module,exports){
function qinticInOut(n){return(n*=2)<1?.5*n*n*n*n*n:.5*((n-=2)*n*n*n*n+2)}module.exports=qinticInOut;


},{}],42:[function(require,module,exports){
function qinticIn(n){return n*n*n*n*n}module.exports=qinticIn;


},{}],43:[function(require,module,exports){
function qinticOut(t){return--t*t*t*t*t+1}module.exports=qinticOut;


},{}],44:[function(require,module,exports){
function sineInOut(n){return-.5*(Math.cos(Math.PI*n)-1)}module.exports=sineInOut;


},{}],45:[function(require,module,exports){
function sineIn(n){return 1-Math.cos(n*Math.PI/2)}module.exports=sineIn;


},{}],46:[function(require,module,exports){
function sineOut(t){return Math.sin(t*Math.PI/2)}module.exports=sineOut;


},{}],47:[function(require,module,exports){
module.exports="function"==typeof Object.create?function(t,e){t.super_=e,t.prototype=Object.create(e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}})}:function(t,e){t.super_=e;var o=function(){};o.prototype=e.prototype,t.prototype=new o,t.prototype.constructor=t};


},{}],48:[function(require,module,exports){
function mix(e,t){for(var o in t)if(t.hasOwnProperty(o)){var r=t[o];if("function"==typeof r)e[o]=r;else if(r&&"object"==typeof r){var i=xtend(defaults,r);Object.defineProperty(e,o,i)}}}var xtend=require("xtend"),defaults={enumerable:!0,configurable:!0};module.exports=function(e,t){mix(e.prototype,t)},module.exports.mix=mix;


},{"xtend":62}],49:[function(require,module,exports){
function Engine(t){return this instanceof Engine?(this.running=!1,this.last=now(),this._frame=0,this._tick=this.tick.bind(this),void(t&&this.on("tick",t))):new Engine(t)}var inherits=require("inherits"),EventEmitter=require("events").EventEmitter,raf=require("raf"),now=require("right-now");module.exports=Engine,inherits(Engine,EventEmitter),Engine.prototype.start=function(){return this.running?void 0:(this.running=!0,this.last=now(),this._frame=raf(this._tick),this)},Engine.prototype.stop=function(){return this.running=!1,0!==this._frame&&raf.cancel(this._frame),this._frame=0,this},Engine.prototype.tick=function(){this._frame=raf(this._tick);var t=now(),i=t-this.last;this.emit("tick",i),this.last=t};


},{"events":5,"inherits":47,"raf":50,"right-now":52}],50:[function(require,module,exports){
for(var now=require("performance-now"),global="undefined"==typeof window?{}:window,vendors=["moz","webkit"],suffix="AnimationFrame",raf=global["request"+suffix],caf=global["cancel"+suffix]||global["cancelRequest"+suffix],isNative=!0,i=0;i<vendors.length&&!raf;i++)raf=global[vendors[i]+"Request"+suffix],caf=global[vendors[i]+"Cancel"+suffix]||global[vendors[i]+"CancelRequest"+suffix];if(!raf||!caf){isNative=!1;var last=0,id=0,queue=[],frameDuration=1e3/60;raf=function(e){if(0===queue.length){var a=now(),l=Math.max(0,frameDuration-(a-last));last=l+a,setTimeout(function(){var e=queue.slice(0);queue.length=0;for(var a=0;a<e.length;a++)if(!e[a].cancelled)try{e[a].callback(last)}catch(l){setTimeout(function(){throw l},0)}},Math.round(l))}return queue.push({handle:++id,callback:e,cancelled:!1}),id},caf=function(e){for(var a=0;a<queue.length;a++)queue[a].handle===e&&(queue[a].cancelled=!0)}}module.exports=function(e){return isNative?raf.call(global,function(){try{e.apply(this,arguments)}catch(a){setTimeout(function(){throw a},0)}}):raf.call(global,e)},module.exports.cancel=function(){caf.apply(global,arguments)};


},{"performance-now":51}],51:[function(require,module,exports){
(function (process){
(function(){var e,n,r;"undefined"!=typeof performance&&null!==performance&&performance.now?module.exports=function(){return performance.now()}:"undefined"!=typeof process&&null!==process&&process.hrtime?(module.exports=function(){return(e()-r)/1e6},n=process.hrtime,e=function(){var e;return e=n(),1e9*e[0]+e[1]},r=e()):Date.now?(module.exports=function(){return Date.now()-r},r=Date.now()):(module.exports=function(){return(new Date).getTime()-r},r=(new Date).getTime())}).call(this);


}).call(this,require('_process'))
},{"_process":6}],52:[function(require,module,exports){
(function (global){
module.exports=global.performance&&global.performance.now?function(){return performance.now()}:Date.now||function(){return+new Date};


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],53:[function(require,module,exports){
function TweenTicker(e){return this instanceof TweenTicker?(e=e||{},this.stack=[],this.defaultEase=e.defaultEase||linear,this.eases=e.eases||{},void(this._applyEase=this.ease.bind(this))):new TweenTicker(e)}function isTween(e){return"function"==typeof e.tick&&"function"==typeof e.cancel}function sync(e){for(var t=0;t<e.length;t++){var n=e[t];"function"==typeof n.sync&&n.sync()}}var linear=require("eases/linear"),createTween=require("tween-objects"),BaseTween=require("tween-base");TweenTicker.prototype.cancel=function(){for(var e=0;e<this.stack.length;e++){var t=this.stack[e];t.cancel(),t.tick(0)}return this.stack.length=0,this},TweenTicker.prototype.clear=TweenTicker.prototype.cancel,TweenTicker.prototype.to=function(e,t){var n=e;if(t&&"object"==typeof t)n=createTween(e,t);else if(e||t){if(!isTween(n))throw new Error("must provide options or a tween object")}else n=new BaseTween;return this.push(n)},TweenTicker.prototype.push=function(e){return this.stack.push(e),e},TweenTicker.prototype.tick=function(e,t){t="function"==typeof t?t:this._applyEase,e="number"==typeof e?e:1/60;for(var n=0;n<this.stack.length;n++)this.stack[n].tick(e,t);for(sync(this.stack),n=this.stack.length-1;n>=0;n--)this.stack[n].active||this.stack.splice(n,1)},TweenTicker.prototype.ease=function(e,t){var n=e.ease||this.defaultEase;return"string"==typeof n&&(n=this.eases[n]),"function"!=typeof n&&(n=linear),n(t)},module.exports=TweenTicker;


},{"eases/linear":34,"tween-base":57,"tween-objects":58}],54:[function(require,module,exports){
function anArray(r){return r.BYTES_PER_ELEMENT&&"[object ArrayBuffer]"===str.call(r.buffer)||Array.isArray(r)}var str=Object.prototype.toString;module.exports=anArray;


},{}],55:[function(require,module,exports){
var lerp=require("lerp");module.exports=function(r,e,n,t){if("number"==typeof r&&"number"==typeof e)return lerp(r,e,n);var l=Math.min(r.length,e.length);t=t||new Array(l);for(var p=0;l>p;p++)t[p]=lerp(r[p],e[p],n);return t};


},{"lerp":56}],56:[function(require,module,exports){
function lerp(e,r,l){return e*(1-l)+r*l}module.exports=lerp;


},{}],57:[function(require,module,exports){
function BaseTween(t){EventEmitter.call(this),this.duration=t&&t.duration||0,this.delay=t&&t.delay||0,this.time=0,this.ease=t&&t.ease,this.active=!0,this.enabled=!0,this.cancelling=!1,this._started=!1}function defaultEase(t,e){return"function"==typeof t.ease?t.ease(e):linear(e)}var noop=function(){},linear=require("eases/linear"),EventEmitter=require("events").EventEmitter,inherits=require("inherits");inherits(BaseTween,EventEmitter),BaseTween.prototype.lerp=noop,BaseTween.prototype.ready=noop,BaseTween.prototype.cancel=function(){return this.cancelling=!0,this},BaseTween.prototype.tick=function(t,e){if(e="function"==typeof e?e:defaultEase,this.cancelling&&this.active&&(this.active=!1,this.emit("cancelling",this),this.emit("complete",this)),this.active&&this.enabled){{this.time}this.time+=t;var i=(this.time-this.delay)/this.duration;this.time-this.delay>0&&(this._started||(this._started=!0,this.ready(),this.emit("start",this)),0>i?i=0:i>1&&(i=1),i=e(this,i),this.lerp(i),this.emit("update",this)),this.time>=this.duration+this.delay&&(this.active=!1,this.emit("complete",this))}},module.exports=BaseTween;


},{"eases/linear":34,"events":5,"inherits":47}],58:[function(require,module,exports){
var ObjectTween=require("./lib/object"),GroupTween=require("./lib/group");module.exports=function(e,r){var n=Array.isArray(e)?new GroupTween(e,r):new ObjectTween(e,r);return n};


},{"./lib/group":60,"./lib/object":61}],59:[function(require,module,exports){
var BaseTween=require("tween-base"),isArray=require("an-array"),ignores=new BaseTween;module.exports=function(e,r){var a=[];for(var n in r)if(r.hasOwnProperty(n)&&e.hasOwnProperty(n)&&!ignores.hasOwnProperty(n)){var s=e[n],t=r[n];"number"==typeof s&&"number"==typeof t?a.push({key:n,start:s,end:t}):isArray(s)&&isArray(t)&&a.push({key:n,start:s.slice(),end:t.slice()})}return a};


},{"an-array":54,"tween-base":57}],60:[function(require,module,exports){
function GroupTween(e,r){BaseTween.call(this,r),this.target=e,this.end=[],this._options=r}var inherits=require("inherits"),lerp=require("lerp-array"),BaseTween=require("tween-base"),endTarget=require("./end-target");inherits(GroupTween,BaseTween),GroupTween.prototype.ready=function(){this.end=this.target.map(function(e){return endTarget(e,this._options)},this)},GroupTween.prototype.lerp=function(e){for(var r=0;r<this.end.length;r++)for(var t=this.end[r],n=this.target[r],i=0;i<t.length;i++){var s=t[i],o=s.key;n[o]=lerp(s.start,s.end,e,n[o])}},module.exports=GroupTween;


},{"./end-target":59,"inherits":47,"lerp-array":55,"tween-base":57}],61:[function(require,module,exports){
function ObjectTween(e,t){BaseTween.call(this,t),this.target=e,this.endings=void 0,this._options=t}var inherits=require("inherits"),lerp=require("lerp-array"),BaseTween=require("tween-base"),endTarget=require("./end-target");inherits(ObjectTween,BaseTween),ObjectTween.prototype.ready=function(){this.endings=endTarget(this.target,this._options)},ObjectTween.prototype.lerp=function(e){for(var t=0;t<this.endings.length;t++){var n=this.endings[t],r=n.key;this.target[r]=lerp(n.start,n.end,e,this.target[r])}},module.exports=ObjectTween;


},{"./end-target":59,"inherits":47,"lerp-array":55,"tween-base":57}],62:[function(require,module,exports){
function extend(){for(var r={},e=0;e<arguments.length;e++){var n=arguments[e];for(var t in n)n.hasOwnProperty(t)&&(r[t]=n[t])}return r}module.exports=extend;


},{}],63:[function(require,module,exports){
function extend(){for(var r={},e=0;e<arguments.length;e++){var n=arguments[e];for(var t in n)n.hasOwnProperty(t)&&(r[t]=n[t])}return r}module.exports=extend;


},{}]},{},[1]);
