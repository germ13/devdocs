'use strict';

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var primes = _defineProperty({}, Symbol.iterator, function () {
  var index = 0;

  return {
    next: function next() {
      return {
        value: 'id-' + index++,
        done: false
      };
    }
  };
});

var counter = 0;

var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
  for (var _iterator = primes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
    var value = _step.value;

    console.log(value);

    if (counter++ > 1000) {
      break;
    }
  }
} catch (err) {
  _didIteratorError = true;
  _iteratorError = err;
} finally {
  try {
    if (!_iteratorNormalCompletion && _iterator['return']) {
      _iterator['return']();
    }
  } finally {
    if (_didIteratorError) {
      throw _iteratorError;
    }
  }
}

var value = [1, 2, [3, 4, 5]];

var _value = _slicedToArray(value, 3);

var el1 = _value[0];
var el2 = _value[1];

var _value$2 = _slicedToArray(_value[2], 2);

var el3 = _value$2[0];
var el4 = _value$2[1];

console.log(el1, ' ', el2, ' ', el3, ' ', el4);

var _JohnDoe$match = "John Doe".match(/^(\w+) (\w+)$/);

var _JohnDoe$match2 = _slicedToArray(_JohnDoe$match, 3);

var firstName = _JohnDoe$match2[1];
var lastName = _JohnDoe$match2[2];

console.log(firstName, ' ', lastName);
