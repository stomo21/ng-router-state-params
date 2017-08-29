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
    
    this.routerStateParamsService.getPath().subscribe( val => {
       console.log("current path", val);
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

### Is Active Path
Use isActivePath(path, exact) to test if a path is active. Useful for programmatically generating breadcrumbs. 
Pass in true for an exact path match. You should use the route config params in your path. For example, :projectId. If you 
need to use your own parsing functions, subscribe to getPath(). It will return a string of the active path.
````javascript
// current url project/123
this.routerStateParams.isActivePath("project"); // true
this.routerStateParams.isActivePath("project", true); // false
this.routerStateParams.isActivePath("project/:projectId"); // true
this.routerStateParams.isActivePath("project/:projectId", true); // true
this.routerStateParams.isActivePath("project/:projectId/campaign"); // false
this.routerStateParams.isActivePath("project/:projectId/campaign", true); // false
this.routerStateParams.isActivePath("project/:projectId/campaign/:campaignId"); // false
this.routerStateParams.isActivePath("project/:projectId/campaign/:campaignId", true); // false
// 
//
// current url project/123/campaign/456
this.routerStateParams.isActivePath("project"); // true
this.routerStateParams.isActivePath("project", true); // false
this.routerStateParams.isActivePath("project/:projectId"); // true
this.routerStateParams.isActivePath("project/:projectId", true); // false
this.routerStateParams.isActivePath("project/:projectId/campaign"); // true
this.routerStateParams.isActivePath("project/:projectId/campaign", true); // false
this.routerStateParams.isActivePath("project/:projectId/campaign/:campaignId"); // true
this.routerStateParams.isActivePath("project/:projectId/campaign/:campaignId", true); // true
````

# License

[MIT](/LICENSE)
