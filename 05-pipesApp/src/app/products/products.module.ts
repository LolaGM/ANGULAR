import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';

import { BasicsPageComponent } from './pages/basics-page/basics-page.component';
import { NumbersPageComponent } from './pages/numbers-page/numbers-page.component';
import { UncommonPageComponent } from './pages/uncommon-page/uncommon-page.component';

import { PrimeNgModule } from '../prime-ng/prime-ng.module'; //nuestro módulo personalizado

@NgModule({
  declarations: [  
    NumbersPageComponent,
    UncommonPageComponent,
    BasicsPageComponent
  ],

  imports: [
    CommonModule,
    PrimeNgModule, //nuestro módulo personalizado
    ProductsRoutingModule
  ]
})

export class ProductsModule { }
