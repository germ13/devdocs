A _component_ is part of a _view_.   
It is defined as a class, and exposes and API of properties and methods that the view interacts with.






Components can implement `OnInit`

[Data Binding Path](https://angular.io/generated/images/guide/architecture/databinding.png)

Direction of data-binding:

Component --> DOM:  
**Interpolation**: `{{value}}`

Component --> DOM:   
**Property Binding**: `[propert]="value"`

DOM --> Component:  
**Event binding**: `(event)="handler"`

Two Way databinding  
DOM <-> Component  
`[(ng-model)]="property"`
Combines property and event binding in a single notation.  
Mainly used in template-driven forms  
Example: `<input [(ngModel)]="hero.name">`

## Binding between parent and child components
[Flow](https://angular.io/generated/images/guide/architecture/parent-child-binding.png)



## Pipes
`@Pipe`

A class with the angular 

