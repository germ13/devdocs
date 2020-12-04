# Modules

`NgModules`: containers for a cohesive block of code dedicated to an application domain, a workflow, or a closely related set of capabilities.  <- from angular.io

Every app has at least one module class, the _root module_.  By convention this is named `AppModule` and lives in a file named `app.module.ts`  

An app is launched by bootstraping the NgModule.

A module is defined by the class decorator `@NgModule()`.  
It takes as input a metadata object with the following properties:
  - `declarations`: its components, directives, and pipes.
  - `exports`     : declarations visible and usable to the components template, and other NgModules
  - `imports`     : classes from other modules that are needed component templates declared in _this_ NgModule
  - `providers`   : service creators contributed to the global collection of services, thereby becoming accesible to the entire app
  - `bootstrap`   : main application view, which hosts all other app views.  Only should be used by the root module.


Example of an NgModule class


```javascript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
@NgModule({
  imports:      [ BrowserModule ],
  providers:    [ Logger ],
  declarations: [ AppComponent ],
  exports:      [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
```
