# Server side message handlers.

- `HttpServer`: receives request from host.
- `HttpRoutingDispatcher`: dispatches request based on route.
- `HttpControllerDispatcher`: sends request to the WebApi controller

Plus your very own custom handlers.

```graphviz
digraph {
    node[shape=rect]
    "Network" 
    -> "http server"
    -> "Message Handler 1" 
    -> "Message Handler 2"
    -> "HttpRoutingDispatcher"
    -> "HttpControllerDispatcher"
    -> "Request"
    -> "Controller"
    -> "Response"
    -> "HttpControllerDispatcher"
    -> "HttpRoutingDispatcher"
    -> "Message Handler 2"
    -> "Message Handler 1" 
    -> "http server"
    -> "Network"
}

```