parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"UldJ":[function(require,module,exports) {
"use strict";function t(t,e){return t.reduce(function(t,r,n){var o=Math.floor(n/e);return t[o]||(t[o]=[]),t[o].push(r),t},[])}function e(t,e){return t=Math.ceil(t),e=Math.floor(e),Math.floor(Math.random()*(e-t))+t}function r(){return new Promise(function(t){chrome.tabs.getSelected(function(e){t(e.url)})})}Object.defineProperty(exports,"__esModule",{value:!0}),exports.getCurrentTabUrl=exports.getRandomInt=exports.chunk=void 0,exports.chunk=t,exports.getRandomInt=e,exports.getCurrentTabUrl=r;
},{}],"YSF2":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.start=void 0;var n=require("./utils"),t="https://lgtm.fun",e={random:function(n){if(n>0&&n<10)return"".concat(t,"/random").concat(n,".json");throw new Error("invalid random number must be 0 > number 10, ".concat(n))},latest:"".concat(t,"/latest.json")};function r(){var t=n.getRandomInt(1,9);return fetch(e.random(t)).then(function(n){return n.json()})}function o(){c()}function c(){r().then(function(n){u(i(),n)})}function u(t,e){function r(n){return'<li class="image-li">\n        <img class="lgtm-img" src="'.concat(n.imageurl,'" />\n      </li>')}var o=n.chunk(e,5).map(function(n){return'\n    <ul class="images-ul">\n      '.concat(n.map(r).reduce(function(n,t){return n+t},""),"\n    </ul>\n    ")}).map(function(n){return'<div class="images-ul-wrapper">'.concat(n,"</div>")}).reduce(function(n,t){return n+t},"");t.innerHTML=o}function i(){return document.querySelector("#content")}function a(n){return"![img](".concat(n,' "img")')}function l(t){n.getCurrentTabUrl().then(function(n){return n.includes("https://github.com")?a(t):t}).then(function(n){return navigator.clipboard.writeText(n)}).then(function(){console.log("copied to clipboard")},function(n){console.log("failed to copy",n)})}function s(){var n;null===(n=document.querySelector(".more-load-button"))||void 0===n||n.addEventListener("click",o),document.addEventListener("click",function(n){if((null==n?void 0:n.target)instanceof Element&&"lgtm-img"===(null==n?void 0:n.target.getAttribute("class"))){var t=n.target.getAttribute("src");t&&l(t)}}),c()}exports.start=s;
},{"./utils":"UldJ"}],"MEcY":[function(require,module,exports) {
"use strict";var r=require("./src/app");(0,r.start)();
},{"./src/app":"YSF2"}]},{},["MEcY"], null)
//# sourceMappingURL=/popup.js.map