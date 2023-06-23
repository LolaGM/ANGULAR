import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SharedModule } from './shared/shared.module';

//configuración del idioma local de la app en este caso es-HN o el idioma que elijamos
import localesEsHN  from '@angular/common/locales/es-HN';
import localesFrCA  from '@angular/common/locales/fr-CA';
import localesEsEA from '@angular/common/locales/es-EA';

import { registerLocaleData } from '@angular/common';

//función que llamamos para que establezca en Angular el idioma local es-HN o los idiomas elegidos (esto afecta a los PIPES)
registerLocaleData(localesEsHN);
registerLocaleData(localesFrCA);
registerLocaleData(localesEsEA); //español de España

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule
  ],
  //hacer que el idioma sea global: importar LOCALE_ID de angular/core. Indicarle el useValue por defecto español con la variante que queramos
  providers: [
      {     provide: LOCALE_ID, useValue: 'es-EA'    }
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
