import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomePageComponent } from './shared/pages/home-page/home-page.component';
import { AboutPageComponent } from './shared/pages/about-page/about-page.component';
import { ContactPageComponent } from './shared/pages/contact-page/contact-page.component';
import { CountriesModule } from './countries/countries.module';

//Construimos un módulo independiente dedicado sólo a la navegación de la app

//constante rutas de tipo Rutas que importamos y dentro tendremos todas las rutas. No olvidar importar el Modulo Router
const routes: Routes = [
    //cuando mostremos home en la ruta del navegador mostraremos el componente Home que queremos

    /* {        
        path: '',
        component: HomePageComponent
    }, */

    {
        //clonamos la línea de arriba cambiando ahora la ruta por el about y hacemos lo mismo con el componente
        path: 'about',
        component: AboutPageComponent
    },
    {
        //clonamos la línea de arriba cambiando ahora la ruta por el contact  y hacemos lo mismo con el componente
        path: 'contact',
        component: ContactPageComponent
    },
    {
        //con el modulo countries y sus pages la ruta funciona así:
        //hacemos carga perezosa de los hijos de tipo función llamada import que resuelve una promesa: then todo correcto, catch si hay error. 
        //import: primera parte: path o ruta como un string que lleva al módulo (ya están unidas las rutas en countries routing para esas pages)
        //Usamos la m de module como parámetro de then y de cada uno buscaremos con propiedad el módulo que me interesa Countries
        path: 'countries',
        loadChildren: () => import('./countries/countries.module').then(m => m.CountriesModule)
    },

    //cualquier otra ruta que no sea home o about, con el path comodín ** le hacemos redirigirse a la ruta home
    {
        path: '**',
        redirectTo: 'countries'
    },
]

/*importamos en el módulo lo necesario para las rutas: RouterModule. Este módulo depende mucho si es de la primera o segunda ruta que usemos: 
-primero o principal si está en la raíz de la carpeta del proyecto-->añadimos .forRoot y dentro nuestra constante con las Routes 
-segundo si son de otros módulos como productos o precios-->sería añadir .forChild  */

@NgModule({
    imports: [
        RouterModule.forRoot(routes)  

    ],
    //exportamos para fuera este RouterModule para poder ser usado en cualquier parte de la app y no olivdemos importarlo en app.module.ts
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule { }
