# Message Handlers

## HttpMessageHandler
AbstractClass

Receives an HTTP request, and returns an HTTP response.

- Methods
  - Dispose
  - HttpMessageHandler
  - SendAsync


## DelegatingHandler
Abstract Class

An intermediary handler that knows how to pass of request and messages from one handler to another.

- Properties
  - InnerHandler
- Methods
  - DelegatingHandler
  - Dispose
  - SendAsync()


















```graphviz
digraph finite_state_machine {
    rankdir=LR;
    size="8,5"

    node [shape = doublecircle]; S;
    node [shape = point ]; qi

    node [shape = circle];
    qi -> S;
    S  -> q1 [ label = "a" ];
    S  -> S  [ label = "a" ];
    q1 -> S  [ label = "a" ];
    q1 -> q2 [ label = "ddb" ];
    q2 -> q1 [ label = "b" ];
    q2 -> q2 [ label = "b" ];

    16 -> 8 -> 4 -> 2 -> 1 -> 4
    node [shape=doublecircle]
    
}
```


