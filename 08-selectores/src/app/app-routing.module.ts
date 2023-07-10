import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SelectorPageComponent } from './countries/pages/selector-page/selector-page.component';
import { CountriesModule } from './countries/countries.module';

const routes: Routes = [

  {
    path: 'selector',
    loadChildren: () =>import('./countries/countries.module').then( m => m.CountriesModule),
    //loadChildren: lazy load del módulo de países
  },
  {
    path: '**',
    redirectTo: 'selector'
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
