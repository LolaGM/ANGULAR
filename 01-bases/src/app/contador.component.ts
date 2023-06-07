//importamos con imp y tecla tabular y le indicamos el decorador junto con el component del paquete angular/core
import {Component} from '@angular/core';

//creamos el decorador y dentro de él con el selector le ponemos nombre al componente que luego llamaremos en HTML
//En el template introducimos código HTML con backTicks literals ``
@Component({
    selector: 'app-contador',
    //hacemos ahora el template del componente ContadorComponent
    template: `
        <h1>{{ titulo }}</h1>
        <h3>La base de aumento y decremento es: <strong> {{ base }} </strong></h3>

        <button (click)="acumular(base)"> + {{ base }} </button>
        <span> {{ numero }} </span>
        <button (click)="acumular(-base)"> - {{ base }}</button>
    `
})

//para usar esta clase en otro archivo lo exportamos
//A las variables las podemos llamar desde html o el template con llaves dobles

export class ContadorComponent{
    public titulo: string = 'Contador App';
    numero: number = 10;
    //tarea llamada base inicializada en 5:
    base: number = 5; 

    acumular( valor: number){
        
        this.numero += valor;
    }
}