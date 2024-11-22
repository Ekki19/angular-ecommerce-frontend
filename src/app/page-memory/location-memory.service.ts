import { Injectable } from '@angular/core';
import { Router, RouterEvent,Event,NavigationEnd } from '@angular/router';
import { filter, last } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LocationMemoryService {

  lastRouteKey = "lastRoute";
  _lastRoute = localStorage.getItem(this.lastRouteKey);

  constructor(private router: Router) { }


  register(): void {
    let lastRoute = this.getLastRoute();
    console.log(`lastRoute: ${lastRoute}`);
    if(lastRoute != null) {
      this.router.navigateByUrl(lastRoute);
    }
    this.router.events.pipe(
      filter((event: Event): event is RouterEvent => event instanceof RouterEvent)).subscribe((event: RouterEvent) => {
        this.setLastRoute(event.url);
    });

   
  }


  public setLastRoute(value: string) {
    localStorage.setItem(this.lastRouteKey, value);
  }

  public getLastRoute(): string | null {
    return localStorage.getItem(this.lastRouteKey);
  }
}