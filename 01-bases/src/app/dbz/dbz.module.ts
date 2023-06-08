import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MainPageComponent } from './main-page/main-page.component';
import { PersonajesComponent } from './personajes/personajes.component';

@NgModule({
  declarations: [
    MainPageComponent,
    PersonajesComponent
  ],
  //exportamos el componente/s para poder usarlo fuera
  exports: [
    MainPageComponent
  ],

  imports: [
    CommonModule,
    FormsModule
  ]
})
export class DbzModule { }
