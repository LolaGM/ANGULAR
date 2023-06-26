import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutPageComponent } from './pages/layout-page/layout-page.component';//asegurarnos de importar el layout correcto de auth
import { NewPageComponent } from './pages/new-page/new-page.component';//asegurarnos de importar el layout correcto de auth
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { HeroPageComponent } from './pages/hero-page/hero-page.component';


// localhost:4200/heroes
const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [ //rutas hijas que definimos dentro de un componente padre (aunque más bien sería la nieta porque las anteriores también son hijas de un componente padre)
      {
        path: 'new-hero',
        component: NewPageComponent
      },
      {
        path: 'search',
        component: SearchPageComponent
      },
      {
        path: 'edit/:id',
        component: NewPageComponent
      },
      {
        path: 'list',
        component: ListPageComponent
      },
      {
        path: ':id', //comodín: esta ruta es importante que esté al final
        component: HeroPageComponent
      },
      {
        path: '**',
        redirectTo: 'list' // para que cualquier otra ruta redirija a la lista de héroes
      },
    ]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeroesRoutingModule { }
