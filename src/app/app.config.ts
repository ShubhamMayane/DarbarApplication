import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import { definePreset } from '@primeng/themes';
import Aura from '@primeng/themes/aura';
  import { provideHttpClient } from '@angular/common/http';



const CustomAura = definePreset(Aura, {
  colors: {
    primary: '#1e88e5',     // Your primary brand color (orange here)
    surface: '#ffffff',     // Background color
    content: '#212121',     // Text color
    accent: '#009688',      // Accent/CTA color
    highlight: '#FDD835'    // Highlight elements like tags/badges
  }
});

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration(withEventReplay()), provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: CustomAura,
          options: {
                      darkModeSelector: false || 'none' //to avoid the dark mode .
                   }  
      }
    }),
  provideHttpClient()
  ]
};
