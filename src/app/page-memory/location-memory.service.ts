import { Injectable } from '@angular/core';
import { Router, RouterEvent,Event, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LocationMemoryService {

  currentRouteKey = "currentRoute";
  _currentRoute = localStorage.getItem(this.currentRouteKey);

  lastRouteKey = "lastRoute"
  _lastRoute: string | null = null;

  constructor(private router: Router) { }

  register(): void {
    let currentRoute = this.getCurrentRoute();

    if(currentRoute != null) {
      this.router.navigateByUrl(currentRoute);
    }
    
    this.router.events.subscribe( event => {
      if (event instanceof NavigationEnd) {
        this.setCurrentAndLastRoute(event.urlAfterRedirects);
      }
    });
  }

  public setCurrentAndLastRoute(value: string) {
    if(value){
      console.log(`value setLastRoute: ${value}`);

      if (this._currentRoute) {
        this._lastRoute = this._currentRoute;
        localStorage.setItem(this.lastRouteKey, this._lastRoute); // Speichere die letzte Route im localStorage
      }

      this._currentRoute = value;
      localStorage.setItem(this.currentRouteKey, value);
      
      console.log(`currentRoute setLastRoute: ${this._currentRoute}`);
      console.log(`lastRoute setLastRoute: ${this._lastRoute}`);

    }


  }

  public getCurrentRoute(): string | null {
    const currentRoute = localStorage.getItem(this.currentRouteKey);
    console.log(`currentRoute getLastRoute: ${currentRoute}`);
    return currentRoute;
  }

  public getLastRoute(): string | null {
    const lastRoute = localStorage.getItem(this.lastRouteKey);
    console.log(`lastRoute getLastRoute: ${lastRoute}`);
    return lastRoute;
  }
}
