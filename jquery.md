jQuery Syntax

The jQuery syntax is tailor made for selecting HTML elements and perform some action on the element(s).

Basic syntax is: $(selector).action()

A dollar sign to define jQuery
A (selector) to "query (or find)" HTML elements
A jQuery action() to be performed on the element(s)
Examples:

$(this).hide() - hides current element

$("p").hide() - hides all paragraphs

$("p.test").hide() - hides all paragraphs with class="test"

$("#test").hide() - hides the element with id="test"

	 jQuery uses a combination of XPath and CSS selector syntax.
You will learn more about the selector syntax in the next chapter of this tutorial.



jQuery Element Selectors

jQuery uses CSS selectors to select HTML elements.

$("p") selects all <p> elements.

$("p.intro") selects all <p> elements with class="intro".

$("p#demo") selects the first <p> element with id="demo".

jQuery Attribute Selectors

jQuery uses XPath expressions to select elements with given attributes.

$("[href]") select all elements with an href attribute.

$("[href='#']") select all elements with an href value equal to "#".

$("[href!='#']") select all elements with an href attribute NOT equal to "#".

$("[href$='.jpg']") select all elements with an href attribute that ends with ".jpg".

jQuery CSS Selectors

jQuery CSS selectors can be used to change CSS properties for HTML elements.

The following example changes the background-color of all p elements to yellow:

Example

$("p").css("background-color","yellow");










Syntax	Description
$(this)	Current HTML element
$("p")	All <p> elements
$("p.intro")	All <p> elements with class="intro"
$(".intro")	All elements with class="intro"
$("#intro")	The first element with id="intro"
$("ul li:first")	The first <li> element of each <ul>
$("[href$='.jpg']")	All elements with an href attribute that ends with ".jpg"
$("div#intro .head")	All elements with class="head" inside a <div> element with id="intro"






jQuery Events

Here are some examples of event methods in jQuery: 

Event Method	Description
$(document).ready(function)  	Binds a function to the ready event of a document
(when the document is finished loading)
$(selector).click(function)	Triggers, or binds a function to the click event of selected elements
$(selector).dblclick(function)	Triggers, or binds a function to the double click event of selected elements
$(selector).focus(function)	Triggers, or binds a function to the focus event of selected elements
$(selector).mouseover(function)	Triggers, or binds a function to the mouseover event of selected elements





$(selector).hide()	Hide selected elements
$(selector).show()	Show selected elements
$(selector).toggle()	Toggle (between hide and show) selected elements
$(selector).slideDown()	Slide-down (show) selected elements
$(selector).slideUp()	Slide-up (hide) selected elements
$(selector).slideToggle()	Toggle slide-up and slide-down of selected elements
$(selector).fadeIn()	Fade in selected elements
$(selector).fadeOut()	Fade out selected elements
$(selector).fadeTo()	Fade out selected elements to a given opacity
$(selector).animate()	Run a custom animation on selected elements



Query CSS Functions - From this Page

CSS Properties	Description
$(selector).css(name,value)	Set the value of one style property for matched elements
$(selector).css({properties})	Set multiple style properties for matched elements
$(selector).css(name)	Get the style property value of the first matched element
$(selector).height(value)	Set the height of matched elements
$(selector).width(value)	Set the width of matched elements


AJAX and jQuery
jQuery provides a rich set of methods (functions) for AJAX web development.
With jQuery AJAX, you can request TXT, HTML, XML or JSON data from a remote server using both HTTP Get and HTTP Post.



jQuery AJAX Requests

Request	Description
$(selector).load(url,data,callback)	Load remote data into selected elements
 	 
$.ajax(options)	Load remote data into an XMLHttpRequest object
$.get(url,data,callback,type)	Load remote data using HTTP GET
$.post(url,data,callback,type)	Load remote data using HTTP POST
$.getJSON(url,data,callback)	Load remote JSON data using HTTP GET
$.getScript(url,callback)	Load and execute a remote JavaScript file
