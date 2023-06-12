import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';

//shared es el módulo que contiene todos los componentes compartidos: menú o sidebar, footer, etc.

@NgModule({
  declarations: [
    SidebarComponent
  ],
  //exportamos el modulo porque lo usaremos desde fuera
  exports: [
    SidebarComponent
  ],

  imports: [
    CommonModule
  ]
})
export class SharedModule { }
