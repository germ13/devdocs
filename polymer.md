#Polymer

## Boilerplate
```html
<polymer-element
  name='my-element'
  attributes='first second third'
  extends='my-parent-element'>
  <template>
    <link rel='stylesheet' href='file.css'>
    <style>
      :host{
	    background: red;
      }
    </style>
  </template>
  <script>
    (function(){
	  'use strict';
	  Polymer({
	    ready: function(){
		}
      })})();
  </script>
