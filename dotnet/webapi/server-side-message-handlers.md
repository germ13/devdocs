# Server side message handlers

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


> Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJQUkVDQVNUQ09SUFxcanVhbi5zZXJyYW5vIiwiaXNzIjoid2lsZGNhdC5hdXRoc2VydmVyIiwic2NvcGUiOiJ3aWxkY2F0LmFwaSIsImF1ZCI6IndpbGRjYXQuYXBpLmF1ZCIsImlhdCI6IjQvMTEvMjAxOCAxMDowNDoxNyBBTSIsImV4cCI6IjUvMTAvMjAxOCAxMjowMDowMCBBTSIsIm5iZiI6IjQvMTEvMjAxOCAxMjowMDowMCBBTSIsImNsYWltcyI6IntcImdyb3Vwc1wiOltcIkFkbWluaXN0cmF0b3JzXCIsXCJFbmdpbmVlcmluZ1wiXX0ifQ.jEGG6lRq-Q8IqJ-6b7R4sNnRwmN4Mg6ctPPGk0cxRNw
