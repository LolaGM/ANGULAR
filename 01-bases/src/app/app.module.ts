import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HeroesModule } from './heroes/heroes.module';
import { ContadorModule } from './contador/contador.module';


import { AppComponent } from './app.component';

//dentro del decorador @NgModule,en declarations indicamos que incluya cualquier componente creado y que arriba lo importe usando la tecla TAB
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HeroesModule,
    ContadorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
