import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404PageComponent } from './shared/pages/error404-page/error404-page.component';

// dominio.com/ en el vacío es donde llegan los usuarios
const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>import('./auth/auth.module').then(m=>m.AuthModule),//lazyLoad
  },
  {
    path: 'heroes',
    loadChildren: () =>import('./heroes/heroes.module').then(m=>m.HeroesModule),//lazyLoad
  },
  {
    path: '404', //página de error 404 Not Found
    component: Error404PageComponent,
  },
  {
    path: '', //path vacío con el que cualquier url va a caer aquí
    redirectTo: 'heroes',//redireccionamos a la ruta heroes
    pathMatch: 'full' // Esta propiedad le indica a Angular la cantidad de URL que debe coincidir. Se debe establecer esta propiedad en full . Esta estrategia se recomienda cuando tienes una cadena de caracteres vacía para una ruta.
  },
  {
    path: '**', //cualquier otro path que no sea uno de los anteriores
    redirectTo: '404', //redireccionamos a la ruta 404 ya creada anteriormente
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
