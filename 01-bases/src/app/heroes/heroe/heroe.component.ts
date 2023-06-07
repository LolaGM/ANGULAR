import { Component } from '@angular/core';

//decorador
//el selector => mismo nombre que el componente sin la palabra component
//template => archivo html (en el que tendremos algo escrito) con su ruta
//importar el componente en módulo correspondiente =>en este caso app.module que es el módulo que tenemos de momento
@Component({
    selector: 'app-heroe',
    templateUrl: './heroe.component.html'
})

//clase del componente Heroe
export class HeroeComponent{
    nombre: string = 'Ironman';
    edad: number = 45;

    //getter y setter para crear propiedades procesadas
    //usamos este get que llamaremos en HTML {{}}
    get nombreCapitalizado(): string{
        return this.nombre.toUpperCase();
    }

    //método de obtener nombre que llamamos {{()}}
    obtenerNombre(): string{
        //esto es JS y permite usar `` para insertar valores de esta manera
        return `${ this.nombre} - ${ this.edad }`;
        //es lo mismo que:
        //return this.nombre + '-' + this.edad;
    }

    //método de cambiar nombre en todos los elementos que llamen al nombre, que no recibe nada y que llamamos {{()}}
    cambiarNombre(): void{
        this.nombre = 'Spiderman';
    }

    cambiarEdad(): void{
        this.edad = 30;
    }



}