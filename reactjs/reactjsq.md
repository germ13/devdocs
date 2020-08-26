# ReactJS

From [*Flux for stupid people.*](http://blog.andrewray.me/flux-for-stupid-people/)

## State and Props

### Props
Props are immutable
passed in by parent component
  eg: `classname` or `isExpanded`


### State

```javascript
getInitialState:function() {
  return { avar: aval }
},
updateTxt:function(e){
  this.setState({
    avar: e.target.value
  });
},
render:function(){
  return (
    <div>
      <input type='text' onChange={this.updateTxt} />
      <h1>{this.state.avar}</h1>
    </div>
)}
```

#### State is internal
should be kept to a minimum
managed by a common ancestor

`getInitialState()`

`setState()`

`forceUpdate()`

`shouldComponentRender()`


#### Where should your state live? (suggested)
Near the top of component hierarchy.
And each piece of info should live in (at most) one components state, not more.

## Communication between components (suggested)
### Parent to child
Set props

### Child to parent
Pass callbacks through props from child to parent

### Sibling components
There should be a parent component managing state and passing it to both components.

### Refs
Refs are like `id`s for a components elements, furthermore they are scoped to that component.

### Proptypes

```javascript
var El = React.createClass({
    propTypes: {
        React.PropTypes.func.isRequired
    },

    // ...
});
```


## Flux
### Flux concept
view --(triggers)--> event
event updates model
model --(triggers)--> event
view responds to models event by re-rendering latest data.

One way data flow / decoupled observer pattern is designed so that your source of truth always stays in your stores/models.


### Your views dispatch actions

dispatcher is an event system.
it broadcasts events and registers callbacks.
Only one, global dispatcher. [Facebook dispatcher library](https://github.com/facebook/flux/blob/master/src/Dispatcher.js)

```javascript
var AppDispatcher = new Dispatcher();
```

```html
<button onClick={ this.createNewItem }>New Item</button>
```

```javascript
createNewItem: function( evt ) {
    AppDispatcher.dispatch({
	   eventName: 'new-item',
	   newItem: { name: 'Marco' }
    });
}
```

### Your "store" responds to dispatched events.
A specific collection of logic and data for our list.
This describes our store.

A store is a singleton, therefore, don't declare with `new`.
It is a global object.

```javascript
// Global object representing list data and logic.
var ListStore = {

// Actual collection of model data
items: [],

// Accessor method we'll use later
getAll: function(){
    return this.items;
	}
};
```

Store then responds to the dispatched event:

```javascript
AppDispatcher.register(function( payload ) {
    switch( payload.eventName ) {
	    case 'new-item':
		    // Mutated Data!
			ListStore.items.push( payload.newItem );
			break;
		}
	}
	return true; // needed for flux promise resolution.
});
```


This is how flux does dispatch callbacks (traditionally).  Each payload contans an event-name and data. A switch statement decides specific actions.

### A store is not a model. A store *contains* models
### A store ins the only thing in your application that knows how to update data.
**This is the most important part of flux** The event that was dispatched doesnt know how to add or remove items.

If for example a different part of your application needed to keep track of some images and their metadata, you'd make another store, and call it ImageStore. A store **represents a single "domain"** of your application. If your application is large, the domain will probably be obvious to you. If your app is small, you'd probably only need one store.

**Only your stores** are allowed to register dispatcher callbacks! Your views should never call `AppDispatcher.register`. The dispatcher only exists to send messages from views to stores. Your views will respond to a different kind of event.

## Your store emits a "change" event
We're almost there! Now that your data is definitely changed, we need to tell the world.

Your store emits an event, but **not using the dispatcher**. This is the confusing, but Flux way. Let's give your store the ability to trigger events. If you're using [`Microevents.js`](http://notes.jetienne.com/2011/03/22/microeventjs.html) this is easy:

`MicroEvent.mixin( ListStore );`

Then lets trigger our change event:
```javascript
case 'new-item':
    ListStore.items.push( payload.newItem );

        // Tell everyone we changed:
	ListStore.trigger( 'change' );

    break;
```

We don't pass the newest item when we `trigger`. Our views only care that *something* has changed. Let's keep following the data to understand why.

## Your view responds to the "Change" event
Now we need to display the list. Our view will **completely re-render** when the list changes.

First, let's listen for the `change` event from our ListStore when the components "mounts," which is when the component is first created:

```javascript
componentDidMount: function() {
    ListStore.bind( 'change', this.listChanged );
},
```
