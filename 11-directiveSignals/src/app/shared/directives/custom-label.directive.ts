import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { ValidationErrors } from '@angular/forms';



@Directive({
  selector: '[customLabel]'
})

//implementamos directiva al inicio
export class CustomLabelDirective implements OnInit {

  //tener control sobre el elemento HTML en esta directiva mediante:
  private htmlElement?: ElementRef<HTMLElement>; //nulo? en algún momento

  //referencia para saber el color de la directive 
  private _color: string = 'red';

  //propiedad privadad para mostrar los errores del formulario en html y hacemos Input para recibirlo
  private _errors?: ValidationErrors | null;
  
  
  //ahora cuando recibamos el color haremos que cambie la propiedad así que usamos SET. Veremos entonces  el texto cambiar si lo aplicamos al html
  @Input() set color ( value: string ) {
      
      //cuando el input del color viene del padre.Haremos método para el cambio
      this._color = value ;
      //console.log({color: value}); //mostramos por consola el valor del color mediante [color] en html

      //llamamos al método creado para cambiar estilo
      this.setStyle();
  }

  //Input para recibir errores formulario usando SET. REcibo valores de tipo validationError o nulo o no definido como hemos indicado en la propiedad
  @Input() set errors ( value: ValidationErrors |null | undefined ) {
    //estos errores serán igual al valor que recibo 
    this._errors = value;
    //console.log(value);
    this.setErrorMessage();

  }


  constructor(private el: ElementRef<HTMLElement>) {
    //console.log('constructor de la directiva');
    //console.log(el);
    this.htmlElement = el;
    //this.htmlElement.nativeElement.innerHTML = 'Hola Mundo';

    
  }

  //en Init 
  ngOnInit(): void {
    //console.log('Directiva - OnInit');

    //al inicio mandamos llamar el método de cambio de color
    this.setStyle();
    this.setErrorMessage();
  }

  //método vacío para cambiar el color: accedemos al elemento HTML y al atributo y lo igualamos a este color
  setStyle(): void{  
    //si no existe, no haga nada 
    if ( !this.htmlElement) return;

    this.htmlElement!.nativeElement.style.color = this._color; //ahora sí le decimos que siempre tenemos elemento HTML!

    //this.htmlElement?.nativeElement.style.color = this._color; --> da error porque si es nulo ? no puede asignarse al color, así que hacemos comprobacion de seguridad con if previa
  }

  //metodo para los errores
  setErrorMessage():void{
      //preguntamos primero si tenemos HTML element: si no existe, no haga nada 
      if ( !this.htmlElement ) return; 
      //preguntamos ahora si no hay errores, y lo decimos con mensaje si es así y pasamos este método al input  y return para que no haga nada mas
      if( !this._errors){
        this.htmlElement.nativeElement.innerText = 'No hay errores';
        return;
      }

      //guardamos los errores que la etiqueta va a manejar
      const errors = Object.keys( this._errors);
      console.log({errors});

      //tipo de errores: si required es incluido y return para que no haga nadas mas
      if (errors.includes('required')){
        this.htmlElement.nativeElement.innerText = 'Este campo es requerido';
        return;
      }

      //tipo de errores: si mínimo es incluido, guardamos en constantes los caracteres minimos y los actuales
      //lo igualo al mensaje con `` para indicar lo que contienen esas constantes diciendo que de lo requerido mínimo actualmente hay tanto
      // y return para que no haga nadas mas
      if (errors.includes('minlength')){
        const min = this._errors!['minlength']['requiredLength'];
        const current = this._errors!['minlength']['actualLength'];

        this.htmlElement.nativeElement.innerText = `Mínimo ${current}/${min} caracteres` ;
        return;
      }

      //tipo de errores: si email es incluido, y return para que no haga nadas mas
      if (errors.includes('email')){
        this.htmlElement.nativeElement.innerText = `no tiene formato correcto de email` ;
        return;
      }
  }


}
/*
-->directiva template generada con schematics
-->decorador indica que es directiva
-->selector tiene llaves cuadradas y será lo que llamemos en HTML (sin esas llaves) como cuando llamamos al componente <app-menu></app-menu>
-->podríamos usar para ese nombre de selector camelCase o guiones para separar palabras
-->las directivas tienen que ser declaradas en el módulo como un componente
-->se llaman en etiqueta correspondiente HTML para poder usarlas
-->host: donde coloco la directiva (elemento HTML donde atributamos la directiva): mostramos en pantalla así:

-->cuando la directiva entró en acción,llamó al constructor cambiando su valor internamente: esto da un control absoluto sobre ese elmento: cambiar forma,añadir listeners...

*/
