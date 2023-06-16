import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HomePageComponent } from './pages/home-page/home-page.component';
import { AboutPageComponent } from './pages/about-page/about-page.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';

@NgModule({
  declarations: [
    AboutPageComponent,
    HomePageComponent,
    SidebarComponent,
    ContactPageComponent    
  ],
  //importamos el router module
  imports: [
    CommonModule,
    RouterModule
  ],
  //exportamos los componentes creados para usarlos fuera de shared en toda la app
  exports: [
    AboutPageComponent,
    HomePageComponent,
    SidebarComponent,
    ContactPageComponent
  ]
})
export class SharedModule { }
