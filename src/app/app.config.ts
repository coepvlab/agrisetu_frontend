import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { provideRouter, withHashLocation } from '@angular/router';
import { routes } from './app.routes';

import { NgxUiLoaderModule, NgxUiLoaderHttpModule } from 'ngx-ui-loader';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';



export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    provideRouter(routes, withHashLocation()),

    importProvidersFrom(
      NgxUiLoaderModule.forRoot({
        fgsColor: '#2e7d32',
        fgsType: 'ball-spin-clockwise',
        fgsSize: 60,
        hasProgressBar: true,
        pbColor: '#2e7d32',
      }),
      NgxUiLoaderHttpModule.forRoot({ showForeground: true }),

      // 👇 TranslateModule added here
      TranslateModule.forRoot({
        defaultLanguage: 'en',
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        }
      })
    )
  ]
};
