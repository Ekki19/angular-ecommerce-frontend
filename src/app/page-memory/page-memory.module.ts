import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LocationMemoryService } from './location-memory.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class PageMemoryModule { 
  
    public static forRoot(): ModuleWithProviders<PageMemoryModule> {
      return {
        ngModule: PageMemoryModule,
        providers: [
          {
            provide: APP_INITIALIZER,
            deps: [LocationMemoryService, Router],
            useFactory: (pM: LocationMemoryService) => () => pM.register(),
            multi: true
          }
        ]
      }
    }
}
