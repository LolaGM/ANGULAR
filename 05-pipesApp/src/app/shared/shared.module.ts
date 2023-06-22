import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuComponent } from './components/menu/menu.component';

import { PrimeNgModule } from '../prime-ng/prime-ng.module';
//import { MenubarModule } from 'primeng/menubar'; //menubar module importado de prime ng


@NgModule({
  declarations: [
    MenuComponent
  ],
  imports: [
    CommonModule,
    PrimeNgModule,//modulo personalizado
    //MenubarModule //no hace falta porque ya está en primeNG que contiene todos los módulos
  ],
  exports:[
    MenuComponent
  ]
})
export class SharedModule { }
