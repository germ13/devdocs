
Iterators
=========

## The old way (broken way)

`for-in`

It gives no guarantee of order  
E.g.:

```javascript
for(var key in table){
  console.log(key + ' = ' + table[key]);
}
```

## The new (bettwer ES6 way)

`for-of`

- guarantees order of keys

Requirements:
In order for object to be iterable it must implement iterable protocol.  
I.e., the object (or up the prototype chain) must have a property with a `Symbol.iterator key`.  

### iterable protocol

A function that must return an object like:
`{ next: function() { } }`

For example, in the `table`:

```javascript
table[Symbol.iterator] = function(){
  return {
    next: function(){ }
  }
}
```

Each time the next function is called by the `for-of` loop it needs to return an object that looks like

```javascript
{
  value: ...,
  done: [true/false]
}
```

### Laziness

Iterators allow the delay of code execution until the first call to `next`.  When the iterator is called thats when the keys can be readied by being sorted, but if the iterator is never called.

```javascript
table[Symbol.iterator] = function () {
  var _this = this;
  var keys = null;
  var index = 0;

  return {
    next: function () {
      if (keys === null) {
        keys = Object.keys(_this).sort();
      }

      return {
        value: keys[index], done: index++ &gt;= keys.length
      };
    }
  }
}
```
