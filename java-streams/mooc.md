# Mooc

## Lambdas

## Streams

### Introduction to functional programming concepts

#### Imperative Programming
Name and values
- Use variables as an association between names and values
- Use a sequence of commands
  - Can change a variable's name
  - Form is `<variable_name = <expression>`
  - Expressions may refer to other variables
   - Whose value may have been changed by preceding commands
  - Values can therefore be passed from command to command
  - Commands may be repeated through loops.

#### Imperative programming
Names and values
- Based on structured function calls
- Function call which calls other functions in turn (composition)  
    `<function1>(<function2>(<function3>... ) ...)`
- Each function receives values from, and passes values back to the calling function(s)
- Names are only used as formal parameters
- No concept of a command, as used in imperative code
  - Therefore co concept of repetition

#### Imperative
##### Names and values
The same name may be associated with different values

##### Execution order
- Values associated with names can be changed
- The order of execution of commands forms a contract
  - If it is changed, the behaviour of the application may change

##### Repetition
- Values associated with names may be changed by commands
- Commands may be repeated leading to repeated changes
- New values may be associated with the same name through repetition (loops)

#### Functional
##### Names and Values
A name is only ever associated with one value

##### Execution order
- Values associated with names cannot be changed
- The order of execution does not impact the results
- There is no fixed execution order

##### Repetition
- Values associated with names may not be changed
- Repeated changes are achieved by nested function calls
- New values may be associated with the same name through recursion

#### Functions as values
- Functional programming allows functions to be treated as values
  - This is why Lambda expressions were required in JDK 8
  - To make this much simples than anonymous inner classes

### Elements of Streams

#### Stream Overview (At a high level)
- Abstraction for specifying aggregate computations
  - Not a data structured
  - Can be infinite
- Simplifies the description of aggregate computations
  - Exposes opportunities for optimization
  - Fusing, laziness, and parallelism

#### Stream Overview (Pipeline)
- A stream pipeline consists of three types of things
  - A source
  - Zero or more intermediate operations
  - A terminal operation
    - Producing a result or a side-effect

```
(Source)--[Stream]-->(Intermediate Operations)--[Stream]-->(Intermediate Operations)--[Stream]-->(Terminal Operation)-->RESULT
```

#### Stream terminal operations
- The pipeline is only evaluated when the terminal operation is called
  - All operations can occur sequentially or in parallelism
  - Intermediate operations can be merged
    - Avoiding multiple redundant passes on data
    - Short-circuit operations (e.g. `findFirst`)
    - Lazy evaluation
  - Stream characteristics help identify optimizations
    - `DISTINCT` stream passed to distinct() is no-op

#### Summary
- A stream is like a pipeline
- Process data from source
  - No explicit loop used
  - Which means a Stream can easily be made parallel


### Streams of objects and primitive types.
#### Objects and Primitives
- Java language is not truly object object oriented
- Primitive types are included
  - `byte`, `short`, `int`, `long`, `double`, `float`, `char`
- Form some situations these are wrapped as objects
  - E.g. storage in Collections
  - `Byte`, `Short`, `Integer`, etc.
- Conversion between primitive and object representation is often
  handled by auto-boxing and unboxing

#### Primitive Streams
- To avoid a lot of unnecessary object creation and work we have three
  primitive stream types
  - `IntStream`, `DoubleStream`, `LongStream`
- These can be used with certain stream operations

```java
int highScore = students.stream()
    .filter(s -> s.graduationYear() == 2015)
    .mapToInt(s -> s.getScore()) // a stream of int values (no boxing or unboxing)
    .max();
```

### Stream sources in JDK 8

#### Collection interface
- `stream()`
  - Provides a sequential stream of elements in the Collection
- `parallelStream()`
  - Provides a parallel stream of elements in the Collection
  - Uses the fork-join framework for implementation

#### Array class
- `stream()`
  - An array is a collection of data, so logical to be able to create a stream
  - Provides a sequential stream
  - Overloaded methods for different types
    - `double`, `int`, `long`, `Object`

#### Files class
- `find(Path, BiPredicate, FileVisitOption)`
  - A stream of `File` references that match a given `BiPredicate`
- `list(Path)`
  - A stream of entries from a given directory
- `lines(Path)`
  - A stream of strings that are the lines read from a given File
- `walk(Path, FileVisitOption)`
  - A stream of `File` references walking from a given `Path`

#### Random Numbers
  - Three random related classes
    - `Random` , `ThreadLocalRandom`, `SplittableRandom`
  - Methods to produce finite or infinite streams of random Numbers
    - `ints()`, `doubles()`, `longs()`
  - Four versions of each
    - Finite or infinite
    - With or without seed

#### Misc Classes and Methods
- `JarFIle/ZipFIle: stream()`
  - Returns a `File` stream of the contents of the compressed archive
- `BufferedReader: lines()`
  - Returns a stream of strings that are the lines read from the input
- `Pattern: splitAsStream()`
  - Returns a stream of strings of matches of a pattern.
  - Like `split()`, but returns a stream rather than an array

- `CharSequence`
  - `chars()`: Char values as ints for the sequence
  - `codePoints()`: Code point values for this sequence
- `BitSet`
  - `stream()`: Indices of bits that are set

#### Stream Static Methods
`IntStream`, `DoubleStream`, `LongStream`
- Interfaces are primitive specializations of the `Stream` interface
- `concat(Stream, Stream)`, `empty()`
  - Concatenates two specified stream, returns an empty stream
- `of(T... values)`
  - S stream that consists of the specified values
- `range(int, int)`, `rangeClosed(int, int)`
  - A stream from a start to an end value (exclusive or inclusive)
- `generate(IntSupplier)`, `iterate(int, intUnaryOperator)`
  - An infinite stream created by a given Supplier
  - `iterate()` uses a seed to start the stream

#### Parallel stream
Only `Collection` can provide a parallel stream directly


### The Stream interface: Intermediate operations
#### Overview
- A stream provides a sequence of elements
  - Supporting either sequential or parallel aggregate operations
- Most operations take a parameter that describes its behaviour
  - Typically using a Lambda expression
  - Must be non-interfering (does not modify stream)
  - Typically stateless
- Streams may be changed from sequential to parallel (and vice-versa)
  - All processing is done either sequentially or in parallel
  - Last call wins.

#### Filtering and Mapping
- `distinct()`
  - Returns a stream with *no* duplicate elements
- `filter(Predicate p)`
  - Returns a stream with only those elements that return true for `Predicate`
- map(Function f)
  - Return a stream where the given `Function` is applied to each element on
    the input stream
- `mapToInt()`, `mapToDouble()`, `mapToLong()`
  - Like `map()`, but producing streams of primitives rather than objects

#### `FlatMap` Example
```java
List<String> output = reader
  .lines()
  .flatMap(line -> Stream.of(line.split(REGEXP)))
  .filter(word -> word.length() > 0)
  .collect(Collectors.toList());
```

#### Restricting the size of a stream
- `skip(long n)`
  - Returns a stream that skips the first `n` elements of the input stream
- `limit(long n)`
  - Returns a stream that only contains the first `n` elements of the input
    stream

```java
String output = bufferedReader
    .lines()
    .skip(2)
    .limit(2)
    .collect(Collectors.joining());
```

#### Sorting and Unsorting
- `sorted(Comparator c)`
  - Returns a stream that is sorted with the order determined by the `Comparator`
  - `sorted()` with no arguments sorts by natural order
- `unsorted()`
  - Inherited from `BaseStream`
  - Returns a stream that is unordered (used interlnally)
  - Can improve the efficiency of operations like `distinct()` and `groupingBy()`

#### Observing Stream elements
As they go past.

- peek(Consumer c)
  - Returns an output stream that is identical to the input stream
  - Each element is passed to the `accept()` method of the `Consumer`
  - The `Consumer` must not modify the elements of the stream
  - Useful for debugging and doing more than one thing with a stream


### The Stream interface: Terminal operations
Lesson 2-6:  
Stream Interface:  
Terminal Operations  

#### Terminal operations
- Terminates the pipeline of operations on the stream
- Only at this point is any processing performed
  - This allows for optimization of the pipeline
    - Lazy evaluation
    - Merged/fused operations
    - Elimination of redundant operations
    - Parallel execution
  - Generates an explicit result or a side effect

#### Matching Elements
- `findFirst(Predicate p)`
  - The first element that matches using the given `Predicate`
- `findAny(Predicate p)`
  - Works the same way as `findFirst()`, but for parallel streams
- `boolean allMatch(Predicate p)`
  - Whether all the elements of the stream match using `Predicate`
- `boolean anyMatch(Predicate p)`
  - Whether any of the elements of the stream match using `Predicate`
- `boolean noneMatch(Predicate p)`
  - Whether no elements match using `Predicate`

#### Collecting results
- `collect(Collector c)`
  - Performs a mutable reduction on the stream
- `toArray()`
  - Returns an array containing the elements of the input stream

#### Numerical results
##### Object Stream

- `count()`
  - Returns how many elements are in the stream
- `max(Comparator c)`
  - The maximum value element of the stream using the `Comparator`
  - Returns an `Optional`, since the stream may be empty
- `min(Comparator c)`
  - The minimum value element of the stream using `Comaprator`
  - Returns an `Optional`, since the stream may be empty

##### Primitive Type Streams (`IntStream`, `DoubleStream`, `LongStream`)
- `average()`
  - Return the arithmetic mean of the stream
  - Returns an `Optional`, as stream may be empty
- `sum()`
  - Returns the sum of the stream of elements

#### Iteration
- `forEach(Consumer c)`
  - Performs an action for each element of this stream
- `forEachOrdered(Consumer c)`
  - like `forEach`, but ensures that the order of the elements (if one exists)
  is respected when used for a parallel stream
- Use with caution!
  - Encourages non-functional (imperative) programming style
  - More details later

#### Folding a stream
Creating a single result from multiple input elements

- `reduce(BinaryOperator accumulator)`
  - Performs a reduction on the stream using the `BinaryOperator`
  - The `accumulator` takes a partial result and the next element,
  and returns a new partial result.
  - Returns an `Optional`
  - Two other versions
    - One takes an initial value (does not return an `Optional`)
    - One that takes an initial value and `BiFunction` (equivalent to a
      a fused `map` and `reduce`)

#### Summary
- Terminal operations provide result or side effects


### The Optional class
Lesson 2-7:
The Optional Class

#### The Problems of `null`
- Certain situations in Java return a result which is a `null`
  - Reference to an object that is not initialized

#### Optional Class
Helping to eliminate the `NullPointerException`

- Terminal operations like `min()`, `max()`, may not return a direct result
  - Suppose the input stream is empty?
- `Optional <T>`
  - Container for an object reference (`null`, or real object)
  - Think of it like a stream of 0 or 1 elements
  - Guaranteed that the `Optional` reference returned will not be null

#### Optional `ifPresent()`
Do something when set

```java
if (x != null){
  print(x);
}

opt.ifPresent(x -> print(x));
opt.ifPresent(this::print);
```

#### Optional `filter()`
Reject certain values of the Optional

```java
if ( x != null ) && x.contains("a")) {
  print(x);
}

opt.filter( x -> x.contains("a"))
   .ifPresent(this::print);
```

#### Optional `map()`
Transform value if present

```java
if (x != null){
  String t = x.trim();
  if (t.length() > 0)
    print(t);
}

opt.map(String::trim)
   .filter(x -> x.length > 0)
   .ifPresent(this::print);
```

#### Optional `flatMap()`
Going Deeper

```java
public String findSimilar(String s)

Optional<String> tryFindSImilar(String s)

Optional<Optional<String>> bad = opt.map(this::tryFindSimilar); // problem

Optional<String> similar = opt.flatMap(this::tryFindSimilar);
```

#### Update our GPS

```java
class GPSData{  public Optional<Position> getPosition(){...} }

class Position{ public Optional<Latitude> getLatitude() {...} }

class Latitude { public String getString() { ...} }

String direction = Optional
    .ofNullable(gpsData) // create a new optional that could be null
    .flapMap(GPSData::getPosition) // return optional
    .flatMap(Position::getLatitude) // return an optional
    .map(Latitude::getDirection) // returns a String
    .orElse("None"); // otherwise returns none
```

#### Summary
Summary
- Optional class eliminates problems of `NullPointerException`
- Can be used in powerful ways to provide complex conditional handling


### Lesson 2: Summary
#### Introduction to streams
- Streams provides a straight forward way for functional style programming
  in Java
- Streams can either be objects or primitive types
- A stream consists of a source, possible intermediate operations and a
  terminal operation
  - Certain terminal operations return an `Optional` to avoid possible
  `NullPointerException` problems
