import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HomePageComponent } from './pages/home-page/home-page.component';
import { AboutPageComponent } from './pages/about-page/about-page.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

@NgModule({
  declarations: [
    AboutPageComponent,
    HomePageComponent,
    SidebarComponent
    
  ],
  //importamos el router module
  imports: [
    CommonModule,
    RouterModule
  ],
  //exportamos el HomePageComponent  y sidebar para usarlo fuera en toda la app
  exports: [
    AboutPageComponent,
    HomePageComponent,
    SidebarComponent 
  ]
})
export class SharedModule { }
