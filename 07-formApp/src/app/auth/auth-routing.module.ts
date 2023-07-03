import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterPageComponent } from '../reactive/pages/register-page/register-page.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'sign-up', component: RegisterPageComponent},//el path que va a tener el sign-up
      { path: '**', redirectTo: 'sign-up'}  //cualquier otro path que no sea los establecidos, vuelve a sign-up
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
