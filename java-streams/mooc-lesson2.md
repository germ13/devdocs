LESSON 3: Advanced Lambda and Stream Concepts
===

## Understanding and using reductions

### A Simple Problem

- Find the length of the longest line in a file
```java
Path input = Paths.get("lines.txt");

int longestLineLength = Files.lines(input)
  .mapToInt(String::length)
  .max()
  .getAsInt();  
```

- Find the ~~length of the~~ longest line in a file
```java
String longest = Files.lines(input)
  .sort((x,y) -> y.length() - x.length())
  .findFirst()
  .get();
```

- This solves the problem.
- Not really.  Big files will take a long time and a lot of resources
- Must be a better approach

### External Iteration Solution
```java

String longest = "";
while(( String s = reader.readLine()) != null)
  if(s.length() > longest.length())
    longest = s;
```

- Simple, but inherently serial
- Not thread safe due to mutable state.

### Recursive approach: the method

    String findLongestString(String s, int index, List<String> l){
      if (index >= l.size())
        return s;

      if (index == l.size() - 1){
        if (s.length() > l.get(index).length())
          return s;
        return l.get(index);

      String s2 = findLongestString(l.get(index), index + 1, 1);

      if(s.length() > s2.length())
        return s;

      return s2;
    }


### A better stream Solution

- The stream API uses the well known filter-map-reduce pattern
- For this problem we do not need to `filter()` or `map()`, just `reduce()`
- Recall the reduce method definition
  `Optional <T> reduce(BinaryOperator<T> accumulator)`
- The key is to find the right accumulator
  - Again, recall the accumulator takes a partial result and the next element,
    and returns a new partial result
  - In essence it does the same as our recursive Solution
  - Without all the stack frames

```java
String longestLine = Files(input)
  .reduce((x, y) -> {
    if(x.length () > y.length())
      return x;
    return y;
  })
  .get();
```

### The Simplest stream Solution
- Use a specialized form of `max()`
- One that takes a `Comparator` as a parameter
    Files.lines(input)
      .max(comparingInt(String::length))
      .get();
- `comparingInt()` is a static method on Comparator
  - `Comparator<T> comparingInt(ToIntFunction<? extend T> keyExtractor)`

### Summary

- Reduction tak astream and reduce it to a single value
- The way the reduction works is defined by the accumulator
  -0 Which is a BinaryOperator
  - The accumulator is applied successively to the stream elements
  - The `reduce()` method maintains a partial result state
  - Like a recursive approach, but without resrouce overhead
- Requires you to think differently to an imperitave, loop based approach.


## Finite and infinite streams

### Dealing with the indeterminate - Imperative java
- How to continue processing when we can't predict for how long?
    while (true){
      doSomeProcessing();

      if(someCriteriaIsTrue())
          break;
      // Loop repeats indefinitely
    }

### Making the Stream Finite
- Terminate the stream when a condition is method
  - `findFirst(Predicate p) //Non-parallel streams`
  - `findAny(Predicate p)  //Parallel streams`

    int r = Random.int()
      .findFirst(i -> i > 256)

### Keeping it infinite
- Sometimes we need to continue to use a stream indefinitely
- What terminal operation should we use for this?
  - Use `forEach()`
  - This consumes the element from the stream
  - But does not terminate it

### Infinite example

- Reading temperature from a serial sensor
  - Converting from Fahrenheit to Celsius, removing F
  - Notifying a listener of changes if registered

    thermalReader.lines()
      .mapToDoubles( s ->
        Double.parseDouble(s.substring(0, s.legth() -1 )))
      .map(t -> ((t-32) * 5/9)
      filter(t -> listener.ifPresent( l -> l.temperatureChanged(t)))
      .forEach(t -> currentTemperature.set(t))

### Summary
- Streams can be infinite as well as finite
- There is no concept of 'breaking' out of a stream
- Use the appropriate terminal operation to stop processing
- Or use the infinite stream infinitely


## Avoiding the use of the `forEach` method
### Using streams effectively
Stop thinking imperetavely
- Imperative programming uses loops for repetitive behaviour
- It also uses variables to hold state
- We can continue to do that in some ways with streams
- THIS IS WRONG

### Stream example
Still thinking imperetabely

   List<Transactions transaction = ...
   LongAdder transactionTotal = new LongAdder();

   transactions.stream()
     .forEach(t -> transactionalTotal.add(t.getValue())) //wrong: we are modifying state

   long total = transactionTotal.sum();

### Stream example
Now using the correct functional approach

    List<Transactions> transactions = ...

    long total = transactions.stream()
      .mapToLong( t -> t.getValue())
      .sum();

### Legitimate use of `forEach`
No state being modified

- Simplified Iteration
- May be made parallel if order is not important
   List<Transactions> transactions = ...
   transactions.stream()
     .forEach(t -> t.printClientName());

### Summary

- If you are thingking of using `forEach()`, stop.
- Can it be replaced with a combination of mapping and reduction
- If so, it is unlikely to be the right approach to be functional
- Certain situations are valid for using `forEach`
 - E.g. printing values from the stream

## Using collectors
### Collector basics
- A `Collector` performs a mutable reduction on a stream
  - Accumulates input elements into a mutable result container
  - Results container can be a `List`, `Map`, `String`, etc
  - Use the `collect()` method to terminate the stream
  - `Collectors` utility class has many methods that can create a `Collector`

### Composing collectors
- Several `Collectors` methods have versions with a downstream collector
- Allows a second collector to ne used
  - `collectingAndThen()`
  - `groupingBy()`/`groupingByConcurrent()`
  - `mapping()`
  - `partitioningBy()`

### Collecting into a collection
- `toCollection(Supplier factory)`
  - Adds the elements of the stream to a `Collection`(created using factory)
  - Uses the encounter order
- `toList()`
  - Adds the element of the stream to a `List`
- `toSet()`
  - Adds the elements of the stream to a `Set`
  - Eliminates the duplicates

### Collecting to a map
- `toMap(Function keyMapper, Function valueMapper)`
  - Creates a `Map` from the elements of the stream
  - key and calue produced using provided funtions
  - Use `Function.identity()` to get the stream element

    Map<Student, Double> studentToScore = students.stream()
   .collect(toMap(Functions.identity(), student -> getScore(students)));

### Collecting to a map
Handling duplicate keys

```java
toMap(Function keyMapper, Function valueMapper, BinaryOperator merge)
```
- The same process as first `toMap()` method

```java
Map<String, String> occupants = people.stream()
  .collect(toMap(Person::getAddress,Person::getName,
                 (x, y) -> x+ ", " + y));
```

### Grouping Results
- `groupingBy(Function)`
  - Groudps stream elements using the `Function` into a `Map`
  - Result is `Map<K, List<V>>`

```java
Map m = words.stream()
  .collect(Collectors.groupingBy(String::length))
```

- `groupingBy(Function, Collector)`
  - Groups stream elements using the `Function`
  - A reduction is performed on each group using the downstream `Collector`

```java
Map m = words.stream()
  .collect(Collectors.groupingBy(String::length, counting()));
```

### Joining string Results
- `joining()`
  - Collector concatenates input string
- `joining(delimiter)`
  - Collector concatenates stream string using `CharSequence` delimiter
  `collect(Collectors.joining(",")); //Create CSV`
- `joining(delimiter, prefix, suffix)`
  - Collector concatenates the prefix, stream strings separated by
    delimiter and suffix

### Numeric collectors
Also available in Double and Long formats
- `averagingInt(ToIntFunction)`
- `summarizingInt(ToIntFunction)`
  - Summarises(count, sum, min, max, average) results generated by supplied function
- `summingInt(toIntFunction)`
  - equivalent to `map()` then `sum()`
- `maxBy(Comparator)`, `minBy(Comparator)`
  - max or min value based on Comparator

### Other collectors
  - `reducing(BinaryOperator)`
    - Equivalent `Collector` to `reduce()` terminal operation
    - Only use for muti-level reductions or downstream collectors
  - `paritioningBy(Predicate)`
    - Creates a `Map<Boolean, List>` containing two groups nased on `Predicate`
  - `mapping(Function, Collector)`
    - Adapts a Collector to accept different type elements mapped by the Function
    `Map<City, Set<String>> lastNamesByCity = people.stream()
      .collect(groupingBy(Person::getCity,
               mapping(Person::getLastName, toSet())));`


## Parallel streams (and when not to use them)
### Serial and parallel streams
- Collection stream sources
  - `stream()`
  - `parallelStream()`
- Stream can be made parallel or sequential at any point
  - `parallel()`
  - `sequential()`
- The last call wins
  - Whole stream is either sequential or parallel
- Calling `concat()` with a sequential and parallel stream will produce a
  parallel stream

### Implemented
- Implemented internally using the fork-join framework
- Will default to as many threads for the pool as the OS reports processors
  - Which may not be what you want
  `System.setProperty("java.util.concurrent.ForkJoinPool.common.parallelism", "32767")`
- Remember, parallel streams always need more work to process
  - But they might finish it more quickly

### Considerations
- `findFirst()` and `findAny()`
  - `findAny()` is non-deterministic, so better for parallel stream performance
  - Use `findFirst()` if a deterministic result is required
- `forEach()` and `forEachOrdered()`
  - `forEach()` is non-deterministic for a parallel stream and ordered data
  - Use `forEachOrdered()` if a deterministic result is required

### When to use parallel streams
No simple answer

- Data set size is important, as is the type of the data structure
  - `ArrayList`: GOOD
  - `HashSet`, `TreeSet`: OK
  - `LinkedList`: BAD
- Operations are also important
  - Certain operations decompose to parallel tasks better than others
  - `filter()` and `map()` are excellent
  -  `sorted()` and `distinct()` do not decompose well

Quantatative Considerations

- N = size of the data set
- Q = cost per element through the stream pipeline
- N x Q = Total cost of pipeline operations
- The bigger N x Q is the better a parallel stream will performance
- It is easier to know N than Q, but Q can be estimated
- If in doubt, profile

### Summary
- The whole stream is processed sequentially or in parallel


## Debugging streams and lambdas

### Problems with debugging streams
- Streams provide a high level abstraction
  - This is good for making code clear an easy to Understanding
  - This is bad for debugging
    - A lot happens internally in the library
    - Setting breakpoints is not simple
    - Stream operations are merged to improve operation

### Simple debugging
Finding what is happening between methods

- Use `peek()`
  - Like the of `print` statement

```java
List<String sortedWords = reader.lines()
  .peek(System.out::println)
  .flatMap(line -> Stream.of(line.split(REGEEXP))
  . ...
  )
```

We can set a breakpoint at a `peek`
We can set up a null operation
`.peek(s -> s)`

### Using a method reference
- Lambda expressions do not compile to equivalent inner class
  - Compiled to invoke dynamic call
  - Implementation decided at runtime
  - Better chance of optimization, making debugging harder
- Solution
  - Extract the code from the lambda expression into a separate method
  - Replace the lambda expression with a method reference for the new method
  - Set breakpoints in the new method
  - Examine program state using debugger

## Course conclusions

### Lambda expressions
- Lambda expression give us a simple way to define behaviour
  - Can be assigned to a variable or passed as a parameter
- Can be used wherever the type is a functional interface
  - One that has only one abstract method
  - The lambda expression provides an implementation nof the abstract method

### Stream API
- Pipeline of operations to process collections of data
  - Multiple sources, not just form the Collections API
  - Can be processed sequentially or in parallel
- Sources, intermediate and terminal operations
- Behaviour of intermediate and terminal operation often defined using
  Lambda expressions
- Terminal operations often return an `Optional`
- We can now use a functional style in Java.

### Lambdas and Streams: Think differently
- Need to think functional rather than Imperative
  - try to stop thinking in loops and using mutable state
- Think of how to approach problems using recursion
  - Rather than an explicit loop
  - Avoid `forEach` (except for special cases)
- Infinite streams don't need to be infinite
- Remember, parallel streams always involve more work
  - Sometimes they complete the work quicker.
