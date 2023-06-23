import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';

import { BasicsPageComponent } from './pages/basics-page/basics-page.component';
import { NumbersPageComponent } from './pages/numbers-page/numbers-page.component';
import { UncommonPageComponent } from './pages/uncommon-page/uncommon-page.component';

import { PrimeNgModule } from '../prime-ng/prime-ng.module';


import { OrderComponent } from './pages/order/order.component'; //nuestro módulo personalizado

import { ToggleCasePipe } from './pipes/toggle-case.pipe';
import { CanFlyPipe } from './pipes/can-fly.pipe';
import { SortByPipe } from './pipes/sort-by.pipe';

@NgModule({
  declarations: [  
    NumbersPageComponent,
    UncommonPageComponent,
    BasicsPageComponent,
    OrderComponent,

    //Pipes personalizados
    ToggleCasePipe,
    CanFlyPipe,
    SortByPipe //generado con schematics seleccionando flat y skiptests
  ],

  imports: [
    CommonModule,
    PrimeNgModule, //nuestro módulo personalizado
    ProductsRoutingModule,


  ]
})

export class ProductsModule { }
