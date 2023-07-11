import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'products-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.css']
})
//implementamos dos ciclos de vida. El constructor no hace falta en este caso
//las acciones del componente hijo impactan en el padre por lo que ngOnInit y ngOnDestroy son muy importantes
export class PriceComponent implements OnInit, OnChanges, OnDestroy {

  //el componente hijo va a recibir con valor cero por defecto
  @Input()
    public price: number = 0;

    //a los observables se les pone el $ al final para indicarlo. 
    //Si da error porque pida inicializarlo, lo marco opcional?
    public interval$?: Subscription;

  ngOnInit(): void {
    console.log('Componente hijo: ngOnInit');

    //interval es un observable que emite valores de forma secuencial basado en periodo de tiempo
    //este interval será igual al interval producto de la suscripción
    this.interval$ = interval(1000).subscribe(value => console.log(`Tick: ${value}`))
    //window.addEventListener( () => {}) //para iniciar el evento el escuchar la ventana cuando el componente se llama
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log({changes});
    console.log('Componente hijo: ngOnChanges');
  }

  //muy importante usarlo para limpiar el código despues de usar el componente
  ngOnDestroy(): void {
    console.log('Componente hijo: ngOnDestroy');

    //llamo de nuevo al interval y cancelo la suscripcion con unsubscribe. Esto hará que al clickar o no en el hijo, empiece de nuevo y se pare la suscripcion y el proceso
    this.interval$?.unsubscribe();
    //window.removeEventListener(); //para acabar con el evento el escuchar la ventana cuando el componente se destruye
    
  }
}
