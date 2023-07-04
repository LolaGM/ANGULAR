import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormControl, FormGroup,Validators } from '@angular/forms'; //validators nos ayuda con la validación a través de los métodos disponibles que trae

const rtx5090 = {
    name:'RTX 5090',
    price: 250,
    inStorage: 6,  
}

@Component({
  templateUrl: './basic-page.component.html',
  styles: [
  ]
})

//creamos formulario reactivo e importamos modulo reactiveForms
export class BasicPageComponent implements OnInit {

   //crear formulario con FormBuilder: primero inyectamos servicio de Angular que importamos de Forms ( así no tenemos que estar usando siempre FormControl)
    public myForm:FormGroup = this.fb.group({ //mandamos un objeto con propiedades name, price,inStorage y les declaro un arreglo de: [valor inicial,validador síncrono,validador asíncrono] con valor vacío o 0
        name: ['', [Validators.required, Validators.minLength(3)]],
        price:[0, [Validators.required, Validators.min(0)]],
        inStorage: [0,  [Validators.required, Validators.min(0)]],  

    })

    constructor(private fb: FormBuilder){}
  
    //inicializamos el formulario y creamos constante que sería lo que llega del backend y sería el producto inicial
    ngOnInit(): void {
       // this.myForm.reset( rtx5090 );
    }

    //para simplificar el mostrar todos los errores de una forma más agrupada y simple usamos GETTERS o un método
    isValidField(field: string):boolean | null{ //regreso una condición para comprobar el campo del formulario usando errors o hasError y si ha sido tocado. Paso esto al HTML
        
        return this.myForm.controls[field].errors 
        && this.myForm.controls[field].touched;
    }

    getFieldError( field:string): string | null { //creamos método que retorna string o null con el campo que queremos evaluar y preguntamos si los controles de ese campo existen

      if( !this.myForm.controls[field]) return null; //si no existe y si no tiene errores, retorno null

      //cogemos el objeto de los errores
      const errors = this.myForm.controls[field].errors || {}; //si no es nulo, regresamos objeto vacío

      //hacemos un for of para sacar todos los errores que vengan en las claves de ese OBJETO que nos dará un arreglo de todas las claves que están en const errors
      for (const key of Object.keys(errors)) {
        //uso switch para saber qué clave mostrar
        switch (key){
          case 'required': return 'Este campo es requerido';

          case 'minlength': return `Mínimo ${errors['minlength'].requiredLength} caracteres`; //uso `` para el mensaje
        }
        
        
        //console.log(key); //muestro la clave
      }
      //cualquier otra cosa que no sea esos errores, regresa null o el string vacío si queremos
      return null;

    }

    //para saber el valor del posteo del Form cuando le pasamos valores y que llamaremos con el NgSubmit
    onSave():void{

      if (this.myForm.invalid){// si el form no es válido, marcar que todo fue tocado y no hacer nada
        this.myForm.markAllAsTouched()
        return; 
      } 

      console.log(this.myForm.value); 

      //una vez posteamos el formulario, el hecho de resetear los valores se haría con RESET pero los números pasan a NULL así que indicamos el objeto con valores predefinidos
      this.myForm.reset({ price: 0, inStorage:0 });

    }


}

/*
Podemos hacer a mano el formulario o crearlo con FormBuilder que es más fácil de leer y agrupa los campos del formulario.

En caso de hacerlo a mano:

public myForm: FormGroup = new FormGroup({

      name: new FormControl(''), //dentro  ('', [], []) tenemos el primer valor o valor por defecto seguido de validaciones síncronas (si hay más de una la colocamos dentro de las llaves),y por último validaciones asíncronas pero como no las usamos en este caso, las quitaremos
      price: new FormControl(0), // indicamos cero para precio
      inStorage: new FormControl(0)   // indicamos cero para en almacén
    });

*/
