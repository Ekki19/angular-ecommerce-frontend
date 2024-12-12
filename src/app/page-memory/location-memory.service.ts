import { Injectable } from '@angular/core';
import { Router, RouterEvent,Event } from '@angular/router';
import { filter, last } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LocationMemoryService {

  currentRouteKey = "currentRoute";
  _currentRoute = localStorage.getItem(this.currentRouteKey);

  lastRouteKey = "lastRoute"
  _lastRoute: string | null = null;

  private isInitialized: boolean = false;  // Flag hinzufügen
  private routerEventSubscription: any;

  constructor(private router: Router) { }

  register(): void {
    if (this.isInitialized) {
      return;  // Verhindert, dass die Methode mehr als einmal ausgeführt wird
    }
    let currentRoute = this.getCurrentRoute();
    console.log(`currentRoute register: ${currentRoute}`);

    if(currentRoute != null) {
      this.router.navigateByUrl(currentRoute);
    }
    if(!this.routerEventSubscription){
      this.routerEventSubscription = this.router.events.pipe(
        filter((event: Event): event is RouterEvent => event instanceof RouterEvent))
        .subscribe((event: RouterEvent) => {
          this.setCurrentAndLastRoute(event.url);
      });
    }

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
