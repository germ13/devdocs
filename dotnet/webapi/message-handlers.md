# Message Handlers

## HttpRequestMessage

- Properties
  - Content
  - Headers
  - Method
  - Properties
  - RequestUri
  - Version
- Methods
  - Dispose (+1 overload)
  - HttpRequestMessage (+2)
  - ToString()


## HttpResponseMessage

- Properties
  - Content
  - Headers
  - IsSuccesfulStatusCode
  - ReasonPhrase
  - RequestMessage
  - StatusCode
  - Version
- Methods
  - Dispose
  - EnsureSuccessStatusCode
  - HttpResponseMessage()
  - ToString()


## DelegatingHandler
Abstract Class

An intermediary handler that knows how to pass of request and messages from one handler to another.

- Properties
  - InnerHandler
- Methods
  - DelegatingHandler
  - Dispose
  - SendAsync()

## HttpMessageHandler
AbstractClass

Receives an HTTP request, and returns an HTTP response.

- Methods
  - Dispose
  - HttpMessageHandler
  - SendAsync

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


