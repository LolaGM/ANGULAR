//sistema de rutas del módulo countries
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ByCapitalPageComponent } from './pages/by-capital-page/by-capital-page.component';
import { ByCountryPageComponent } from './pages/by-country-page/by-country-page.component';
import { ByRegionPageComponent } from './pages/by-region-page/by-region-page.component';
import { CountryPageComponent } from './pages/country-page/country-page.component';

const routes: Routes = [
    {
        path: 'by-capital',
        component: ByCapitalPageComponent
    },
    {
        path: 'by-country',
        component: ByCountryPageComponent
    },
    {
        path: 'by-region',
        component: ByRegionPageComponent
    },    
    {
        //country page va a recibir un argumento dinámico llamado id (aunque le podemos poner cualquier nombre)
        path: 'by/:id',
        component: CountryPageComponent
    },
    //añadimos ** para llevar por defecto a by capital para que cualquier ruta en navegadro lleve aquí
    {
        path: '**',
        redirectTo: 'by-capital'
    }
]

@NgModule({
    imports: [
        //tenemos en este caso el forChild y le pasamos la const routes que contiene los path y component
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ],
})

export class CountriesRoutingModule { }
