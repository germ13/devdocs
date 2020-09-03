var primes = {
  *[Symbol.iterator]:function(){
    var index = 0;

    return {
      next: function(){
        return {
          value: 'id-' + index++,
          done: false
        };
      }
    }
  }
};

var counter = 0;

for (var value of primes){
  console.log(value);

  if(counter++ > 1000){
    break;
  }
}

var value = [1, 2, [3, 4, 5]];
var [el1, el2, [el3, el4]] = value;
console.log(el1, ' ', el2, ' ', el3, ' ', el4);


var [, firstName, lastName] = "John Doe".match(/^(\w+) (\w+)$/);
console.log(firstName, ' ', lastName);
