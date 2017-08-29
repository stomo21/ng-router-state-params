import { Injectable } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

import 'rxjs/Rx';
import { Subject, BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs/Observable';

/**
 * router state params service
 * usage: add to a component constructor
 *        constructor(public routerStateService: RouterStateService) { }
 *
 * the may be used in component class or template
 * getRoute() : Observable<ActivatedRoute> - contains the ActivatedRoute object
 * getUrl() : Observable<string> - url component, does not include domain
 * getConfig() : Observable<object> - route config options for the active route (contains title if provided)
 * getParams() : Observable<object> - all params and values for current route (duplicate names overwritten)
 * getPath() : Observable<string> - returns the active path string
 *
 * getRouteValue() : ActivatedRoute - contains the ActivatedRoute object
 * getUrlValue() : string - url component, does not include domain
 * getConfigValue() : object - route config options for the active route (contains title if provided)
 * getParamsValue() : object - all params and values for current route (duplicate names overwritten)
 * getPathValue() : string - active path
 */
@Injectable()
export class RouterStateParamsService {
  url: String;
  urlSubject: BehaviorSubject<String>;

  path: String;
  pathSubject: BehaviorSubject<String>;

  route: ActivatedRoute;
  routeSubject: BehaviorSubject<ActivatedRoute>;

  config: Object;
  configSubject: BehaviorSubject<Object>;

  params: Object;
  paramsSubject: BehaviorSubject<Object>;

  constructor(
      private activatedRoute: ActivatedRoute,
      private router: Router
  ) {

    this.urlSubject = new BehaviorSubject<String>(null);
    this.pathSubject = new BehaviorSubject<String>(null);
    this.routeSubject = new BehaviorSubject<ActivatedRoute>(null);
    this.configSubject = new BehaviorSubject<Object>(null);
    this.paramsSubject = new BehaviorSubject(null);


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
          this.route = activatedRoute;
          this.url = router.url;
          this.config = data[data.length-1].config;

          let paths = [];
          this.params = {};
          if(allRoutes.length){
            allRoutes.map( val => {
              if(val && val.params && val.params.value){
                this.params = Object.assign(this.params, val.params.value);
              }
              if(val && val.config && val.config.path){
                  paths.push(val.config.path);
              }
            });
          }

          this.path = paths.join("/");
          this.routeSubject.next(this.route);
          this.urlSubject.next(this.url);
          this.configSubject.next(this.config);
          this.paramsSubject.next(this.params);
        });
  }

  getRoute(){
    return this.routeSubject.asObservable();
  }

  getPath(){
      return this.pathSubject.asObservable();
  }

  getUrl(){
    return this.urlSubject.asObservable();
  }

  getConfig(){
    return this.configSubject.asObservable();
  }

  getParams(){
    return this.paramsSubject.asObservable();
  }


  getRouteValue(){
    return this.route || {};
  }

  getPathValue(){
      return this.path || "";
  }

  getUrlValue(){
    return this.url;
  }

  getConfigValue(){
    return this.config || {};
  }

  getParamsValue(){
    return this.params;
  }

   isActivePath(path: string, exact: boolean) {
        if(this.path){
            if(exact){
                if(path == this.path || path == "/"+this.path){
                    return true;
                }
            }else{
                if(this.path.indexOf(path) === 0 || ("/"+this.path).indexOf(path) === 0){
                    return true;
                }
            }
        }
        return false;
    };
}
