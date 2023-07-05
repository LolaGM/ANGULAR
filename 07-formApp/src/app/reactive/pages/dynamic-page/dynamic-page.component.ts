import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from 'src/app/shared/service/validator.service';

@Component({
  templateUrl: './dynamic-page.component.html',
  styles: [
  ]
})
export class DynamicPageComponent {

  /*  public myForm2 = new FormGroup({
      favoriteGames: new FormArray([]),
  }); */

  //objeto de formulario con el nombre que queramos  de tipo FormGroup y le definimos los campos inciales: objeto con propiedades
  public myForm: FormGroup = this.fb.group({

    name: ['', [Validators.required, Validators.minLength(3)]],
    favoriteGames: this.fb.array([ //es un arreglo de juegos: form array. Podríamos agregar campos o crear propiedad que la contenga: es un objeto que se llama formArray
      ['Metal Gear', Validators.required],
      ['Death Stranding', Validators.required],
    ]), 
  });

  //objeto nuevo favorito: formcontrol con valor inicial vacío y con validación requerida. Lo indicamos en el html
  public newFavorite: FormControl = new FormControl('', Validators.required);

  constructor(
    private fb: FormBuilder,
    private validatorsService: ValidatorsService
    ){}

  //getter para listar juegos
  get favoriteGames() {
    return this.myForm.get('favoriteGames') as FormArray; //para indicar que es un FormArray y puedo iterarlo
  }

  isValidField(field: string):boolean | null{ //regreso una condición para comprobar el campo del formulario usando errors o hasError y si ha sido tocado. Paso esto al HTML
          
    return this.myForm.controls[field].errors 
        && this.myForm.controls[field].touched;
  }

  
  isValidFieldInArray(formArray: FormArray, index:number){ //validar el formArray y verificar qué elemento está fallando: mando el i (indice) de tipo number
    return formArray.controls[index].errors 
        && formArray.controls[index].touched;
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

          case 'minlength': return `Mínimo ${errors['minlength'].requiredLength} caracters`; //uso `` para el mensaje
        }    
        //console.log(key); //muestro la clave
      }
      //cualquier otra cosa que no sea esos errores, regresa null o el string vacío si queremos
      return null;
  }

  //método que no regresa nada: para añadir games al array pero que necesitamos crear propiedad
  onAddToFavorites():void{
    if(this.favoriteGames.invalid) return; //si no es válido, hago return. Muestro por consola
    
    //tener el valor del añadido de forma constante

    const newGame = this.newFavorite.value;

    //insertar el nuevo valor en el arreglo que es un nuevo formControl con valor inicial como la const y la validation required. Pero lo haremos con FormBuilder
    //this.favoriteGames.push(new FormControl(newGame,Validators.required));
    this.favoriteGames.push(
      this.fb.control(newGame, Validators.required)
    );

    //para resetear el valor introducido que ya hemos agregado:
    this.newFavorite.reset();
    //console.log( this.newFavorite.value);    

  }
  
  onDeleteFavorite(index:number): void{ //si quiero eliminar algo del arreglo, primero tengo que hacer referencia al arreglo. Como ya lo tengo en el getter, lo paso por referencia y le aplico el método propio de arreglos removeAt y le paso esto al botón de eliminar
    this.favoriteGames.removeAt(index);

  }

  //método que no regresa nada
  onSubmit():void{

    if(this.myForm.invalid) {//si el form no es válido, no regresamos nada y marcamos que fue todo tocado
      this.myForm.markAllAsTouched();
      return;
    }

    console.log(this.myForm.value);
    
    //hacemos el reset del form a valores iniciales limpiando los campos o podemos igualar los favoriteGames a un array vacío. Como myform no sabe que es un array hay que igualarlo con AS
    (this.myForm.controls['favoriteGames']  as FormArray) = this.fb.array([]);
    this.myForm.reset();
  }
  

}