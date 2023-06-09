import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MainPageComponent } from './main-page/main-page.component';
import { PersonajesComponent } from './personajes/personajes.component';
import { AgregarComponent } from './agregar/agregar.component';

import { DbzService } from './services/dbz.service';

@NgModule({
  declarations: [
    MainPageComponent,
    PersonajesComponent,
    AgregarComponent,
  ],
  //exportamos el componente/s para poder usarlo fuera
  exports: [
    MainPageComponent    
  ],

  imports: [
    CommonModule,
    FormsModule
  ],
  providers: [ //son todos los servicios que se especifiquen aquí dentro
    DbzService
  ]
})
export class DbzModule { }