import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutPageComponent } from './pages/layout-page/layout-page.component'; //asegurarnos de importar el layout correcto de auth
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';

// localhost:4200/auth/
const routes : Routes = [ 
    {
        path: '',
        component: LayoutPageComponent,
        children:[
            {
                path: 'login',
                component: LoginPageComponent
            },
            {
                path: 'new-account', //register que verá el usuario
                component: RegisterPageComponent
            },
            {
                path: '**', //comodín por si el usuario busca otra página dentro de auth
                redirectTo: 'login'
            },
        ]
    }  
    
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule
    ],
    providers: [],
})
export class AuthRoutingModule { }
