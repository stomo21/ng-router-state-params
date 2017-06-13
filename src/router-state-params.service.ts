import { Injectable } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

import 'rxjs/Rx';

/**
 * router state params service
 * usage: add to a component constructor
 *        constructor(public routerStateService: RouterStateService) { }
 *
 * the may be used in component class or template
 * getRoute() : ActivatedRoute - contains the ActivatedRoute object
 * getUrl() : string - url component, does not include domain
 * getConfig() : object - route config options for the active route (contains title if provided)
 * getParams() : object - all params and values for current route (duplicate names overwritten)
 */
@Injectable()
export class RouterStateParamsService {
  url: string;
  route: ActivatedRoute;
  config: Object;
  params: Object;

  constructor(
      private activatedRoute: ActivatedRoute,
      private router: Router
  ) {

    var allRoutes = [];

    this.router.events
        .filter(event => event instanceof NavigationEnd)
        .map(_ => this.router.routerState.root)
        .map(route => {
          allRoutes = [];

          allRoutes.push({
            config: route.routeConfig,
            params: route.params
          });
          while (route.firstChild){
            route = route.firstChild;
            allRoutes.push({
              config: route.routeConfig,
              params: route.params
            });
          }
          return allRoutes;
        })
        .subscribe(data => {
          this.url = router.url;
          this.route = activatedRoute;
          this.config = data[data.length-1].config;

          this.params = {};
          for(var i in allRoutes){
            if(allRoutes[i].params.value){
              this.params = Object.assign(this.params, allRoutes[i].params.value);
            }
          }
        });
  }


  getRoute(){
    return this.route || {};
  }

  getUrl(){
    return this.url;
  }

  getConfig(){
    return this.config || {};
  }

  getParams(){
    return this.params;
  }
}
