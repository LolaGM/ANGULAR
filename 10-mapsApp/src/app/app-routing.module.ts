import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'maps',
    loadChildren: () => import('./maps/maps.module').then(m=>m.MapsModule),
  },
  {
    path: 'alone', //componente standalone por lazy load. Componente que es a su vez un módulo. No está en appModule tampoco
    loadComponent: () => import('./alone/pages/alone-page/alone-page.component').then(m=>m.AlonePageComponent),

  },
  {
    path: '**',
    redirectTo: 'maps',
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
