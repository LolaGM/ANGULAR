import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, DoCheck, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'products-product-page',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
//cada uno de los ciclos de vida se implementa.
//No importa el orden de llamada
//Implementamos all usando Ctrl + .
//El constructor es parte del ciclo de vida
export class ProductComponent
  implements
    OnInit,
    OnChanges,
    DoCheck,
    AfterContentInit,
    AfterContentChecked,
    AfterViewInit,
    AfterViewChecked,
    OnDestroy
{

  //hacemos propiedad para probar el botón y ver en consola los ciclos de vida
  public isProductVisible: boolean = false;

  //creamos una propiedad para cambiar el precio y un método para ello
  public currentPrice:number = 10;

  constructor(){
    console.log('constructor')
  }

  ngOnInit(): void {
    console.log('ngOnInit')
  }

  ngOnChanges(changes:SimpleChanges): void {
    console.log({changes});
    console.log('ngOnChanges');
  }

  ngDoCheck(): void {
    console.log('ngDoCheck')
  }

  ngAfterContentInit(): void {
    console.log('ngAfterContentInit')
  }

  ngAfterContentChecked(): void {
    console.log('ngAfterContentChecked')
  }

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit')
  }

  ngAfterViewChecked(): void {
    console.log('ngAfterViewChecked')
  }

  //muy importante usarlo para limpiar el código despues de usar el componente
  ngOnDestroy(): void {
    console.log('ngOnDestroy')
  }
  
  //método para aumentar precio
  increasePrice(){
    this.currentPrice++;
  }

}
