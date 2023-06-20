import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: [
  ]
})
export class SearchBoxComponent implements OnInit, OnDestroy {
  

  //creamos propiedad privada por ejemplo llamado debouncer para hacer un nuevo objeto de OBSERVABLE llamado Subject que importamos y haremos OnInit en la clase creandolo también
  private debouncer:Subject<string> = new Subject<string>();
  
  //ahora manejamos la subscripción que es opcional ? de manera independiente y debajo la desuscribirmos en el destroy
  private debouncerSubscription?:Subscription;

  @Input() 
  public placeholder:string = '';

  @Output() 
  public onValue = new EventEmitter<string>();  

  //creamos otro output para otro evento  
  @Output() 
  public onDebounce = new EventEmitter<string>();  

  //Usamos un OnInit para qeu el componente cuando cargue ya venga con sus métodos. 
  //siendo un debouncer una propiedad que contiene un observable tenemos acceso a todos los métodos propios como pipe o subscribe. Dentro usamos debounceTime que importamos de rxjs y que pide 2 objetos (tiempo en ms para hacer la siguiente emisión y planificador)

  ngOnInit(): void {
    this.debouncer //este observable emite un valor que llega al pipe que tiene tiempo de espera 3 milésismas de seg por ej para emitir algo con el subscribe
      .pipe(
        debounceTime(300)
      )
      .subscribe(value =>{
        //console.log('debouncer value',value);
        this.onDebounce.emit(value);
    })
  }

  //Una vez usado debermos hacer una limpieza  del componente con OnDestroy: método que se llama cuando el componente va a ser destruido
  ngOnDestroy(): void {
    //console.log('destruido');
    //this.debouncer.unsubscribe();//nos desuscribimos para no estar pendientes de búsqueda
    this.debouncerSubscription?.unsubscribe();
  }

  //creamos una función con un valor de tipo string que no regresa nada
  emitValue(value:string):void {
      //console.log(value);
      this.onValue.emit(value);
  }

  //creamos una función para que cuando se pulse enter se haga la búsqueda y la peticion HTTP para
  onKeyPress(searchTerm:string) {
    //console.log(searchTerm);
    //usamos aquí el debouncer creado usando la siguiente NEXT emisión del término buscado
    this.debouncer.next(searchTerm);
  }
}