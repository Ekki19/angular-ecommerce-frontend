import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LocationMemoryService } from './location-memory.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [LocationMemoryService]
})
export class PageMemoryModule { 
  
    public static forRoot(): ModuleWithProviders<PageMemoryModule> {
      return {
        ngModule: PageMemoryModule,
        providers: [
          {
            provide: APP_INITIALIZER,
            deps: [LocationMemoryService],
            useFactory: (pM: LocationMemoryService) => () => {
              console.log("APP_INITIALIZER aufgerufen");  // Debug-Nachricht, um zu prüfen, ob es funktioniert
              pM.register();  // Deine neue Initialisierungsmethode
              return Promise.resolve();  // Verhindere, dass das Initialisieren blockiert wird
            },
            multi: true
          }
        ]
      }
    }
}
