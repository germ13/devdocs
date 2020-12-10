State and Lifecycle
===================

"mounting" : component redered to DOM for the first time.

"unmounting" : when component produced is removed from the DOM.

Do not modify state directly.  Like:  
`this.state.comment = 'Hello';`

Instead use:  
`setState({comment: 'Hello'});`

Only place that `this.state` can be used is in the constructor.

State may be updated asynchronously.  Therefore this code is not desirable, because it might not lead to expected results:
```javascript
this.setState({
    counter: this.state.counter + this.props.increment;
})
```

For this, there is an overriden method for setState
```javascript
setState((state, props) => ({
    conter: state.counter + props.increment
}));
```