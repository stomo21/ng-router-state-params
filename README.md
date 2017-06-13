## Angular 2 Router Params Service
Angular RouterModule only passes data to the active component. If you need access to the route and route params in
other components, this service can help.

### Quick Start

```bash
$ npm install ng-router-state-params
```


In your module, import ng-router-state-params and add it as a provider
````javascript
//app.module.ts
import { RouterStateParamsService } from 'ng-router-state-params';

@NgModule({

  providers: [
    RouterStateParamsService
  ]
})
export class AppModule {
}
````


Add to your angular components
````javascript
//top-nav.component.ts
import { Component, OnInit } from '@angular/core';
import { RouterStateParamsService }  from 'ng-router-state-params';  

@Component({
  selector: 'top-nav',
  template: 'current url: {{routerStateParamsService.getUrlValue()}}'
})
export class TopNavComponent implements OnInit {  

  constructor(public routerStateParamsService: RouterStateParamsService) { }  

  ngOnInit() {
  }  

}
````

### Observables
````javascript
ngOnInit() {
    this.routerStateParamsService.getParams().subscribe( val => {
      console.log("route params", val);
    });

    this.routerStateParamsService.getUrl().subscribe( val => {
      console.log("route url", val);
    });

    this.routerStateParamsService.getConfig().subscribe( val => {
      console.log("route config", val);
    });

    this.routerStateParamsService.getRoute().subscribe( val => {
      console.log("route route", val);
    });
  }

````




### Other Options
````javascript
 getRouteValue() : ActivatedRoute - contains the ActivatedRoute object
 getUrlValue() : string - url component, does not include domain
 getConfigValue() : object - route config options for the active route (contains title if provided)
 getParamsValue() : object - all params and values for current route (duplicate names overwritten)  
 
 
// example
var route = routerStateParamsService.getRouteValue();
var url = routerStateParamsService.getUrlValue();
var config = routerStateParamsService.getConfigValue();
var params = routerStateParamsService.getParamsValue();  


// when defining your routes inside the RouterModule, you can define a page title inside data
Routes = [
    {
        path: '',
        component: AppComponent,
        children: [
            {
                path: ':page',
                component: PageViewComponent,
                data: {
                    title: 'View page title'
                }
            }
        ]
    }
];


routerStateParamsService.getConfig() // will contain the title, etc
routerStateParamsService.getParams() // will contain :page part of your url {page: "1"}

````


# License

[MIT](/LICENSE)
