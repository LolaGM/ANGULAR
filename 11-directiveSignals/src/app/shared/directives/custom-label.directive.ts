import { Directive, ElementRef, OnInit } from '@angular/core';

//directiva template generada con schematics
//decorador indica que es directiva
//selector tiene llaves cuadradas y será lo que llamemos en HTML (sin esas llaves) como cuando llamamos al componente <app-menu></app-menu>
//podríamos usar para ese nombre de selector camelCase o guiones para separar palabras
//las directivas tienen que ser declaradas en el módulo como un componente
//se llaman en etiqueta correspondiente HTML para poder usarlas

@Directive({
  selector: '[customLabel]'
})

//implementamos directiva al inicio
export class CustomLabelDirective implements OnInit {

  //tener control sobre el elemento HTML en esta directiva mediante:
  private htmlElement?: ElementRef<HTMLElement>; //nulo? en algún momento

  //host: donde coloco la directiva (elemento HTML donde atributamos la directiva): mostramos en pantalla así:
  //cuando la directiva entró en acción,llamó al constructor cambiando su valor internamente: esto da un control absoluto sobre ese elmento: cambiar forma,añadir listeners...

  constructor(private el: ElementRef<HTMLElement>) {

    console.log(el);
    this.htmlElement = el;
    this.htmlElement.nativeElement.innerHTML = 'Hola Mundo';

    //console.log('constructor de la directiva');
  }

  //en Init 
  ngOnInit(): void {
    console.log('Directiva - OnInit');
  }


}
