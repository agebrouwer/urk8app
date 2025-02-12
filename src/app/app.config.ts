import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { RECAPTCHA_SETTINGS, RecaptchaSettings } from 'ng-recaptcha';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    // Provide the default settings for reCAPTCHA.
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: {
        siteKey: '6Ldh89QqAAAAAIRe2d40ba28cBEg5HHIkDxXLqz8',
      } as RecaptchaSettings,
    },
  ],
};
