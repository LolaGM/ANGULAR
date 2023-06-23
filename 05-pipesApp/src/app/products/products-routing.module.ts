//creado como lazy module  y que ha creado todos los archivos con el comando CLI siguiente:
//ng g module products --module app --route products

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasicsPageComponent } from './pages/basics-page/basics-page.component';
import { NumbersPageComponent } from './pages/numbers-page/numbers-page.component';
import { UncommonPageComponent } from './pages/uncommon-page/uncommon-page.component';
import { OrderComponent } from './pages/order/order.component';

const routes: Routes = [
  {
    path: '',
    component: BasicsPageComponent,
  },
  {
    path: 'numbers',
    component: NumbersPageComponent,
  },
  {
    path: 'uncommon',
    component: UncommonPageComponent,
  },
  //pipes personalizados ruta
  {
    path: 'custom',
    component: OrderComponent,
  },
  {
    path: '**', //path comodín para definir cualquier ruta que entre por aquí que redirigimos a vacío para que sea la ruta por defecto
    redirectTo: '',
  }, 

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
