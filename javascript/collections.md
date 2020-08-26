# Collections (ES6)

## Set

### Methods on Set


    new Set creates a new, empty set.

    new Set(iterable) makes a new set and fills it with data from any iterable value.

    set.size gets the number of values in the set.

    set.has(value) returns true if the set contains the given value.

    set.add(value) adds a value to the set. If the value was already in the set, nothing happens.

    set.delete(value) removes a value from the set. If the value wasn’t in the set, nothing happens.
    Both .add() and .delete() return the set object itself, so you can chain them.

    set[Symbol.iterator]() returns a new iterator over the values in the set.
    You won’t normally call this directly, but this method is what makes sets iterable.
    It means you can write for (v of set) {...} and so on.

    set.forEach(f) is easiest to explain with code. It’s like shorthand for:

    for (let value of set)
        f(value, value, set);

    This method is analogous to the .forEach() method on arrays.

    set.clear() removes all values from the set.

    set.keys(), set.values(), and set.entries() return various iterators.
    These are provided for compatibility with Map, so we’ll talk about them below.


## Map
