import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';

import { ActivatedRoute, Router } from '@angular/router';
import { filter, switchMap, tap } from 'rxjs';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: [
  ]
})
export class NewPageComponent implements OnInit {

    //nuevo grupo de formulario reactivo (importamos de angular forms ) que es un objeto del que crearemos propiedades y validaremos los campos. Enlazamos al html 
    public heroForm = new FormGroup({
          id:               new FormControl<string>(''),
          superhero:        new FormControl<string>('', {nonNullable:true}), //no permitimos que sea nulo
          publisher:        new FormControl<Publisher>(Publisher.DCComics), //importamos interface creada y le indicamos el valor por defecto
          alter_ego:        new FormControl<string>(''),
          first_appearance: new FormControl<string>(''),
          characters:       new FormControl<string>(''),
          alt_img:          new FormControl<string>('')
  });

    //creamos las opciones del select que en princpio deberían volcarse desde la BBDD pero en este caso lo haremos manualmente con un ID y una descripción	
    public publishers = [
      {id: 'DC Comics' , desc: 'DC - Comics'},
      {id: 'Marvel Comics', desc: 'Marvel - Comics' }
    ];

    //inyectamos el servicio
    constructor(
        private heroesService: HeroesService,
        private activatedRoute:ActivatedRoute, 
        private router: Router, //por si el usuario escribe a mano la ruta 
        private snackbar: MatSnackBar, // servicio inyectable de Material (para modificar lo que hay en la vista según estés en nuevo héroe o editar héroe) que colocaré en dos lugares
        private dialog: MatDialog // servicio inyectable de Material (para mostrar mensajes como el de eliminación antes de borrar).Creamos método de OnDeleteHero
    ){}

    //getter que regresa un Hero con una constante que contiene el valor del heroForm (formulario grupo) y lo retornamos
    get currentHero():Hero{
      const hero = this.heroForm.value as Hero; //trata este formulario COMO si fuera objeto Hero
      return hero;
    }

    //para implementar al principio del componente que se cargue por URL la data en el formulario. Vamos a necesitar saber los parámetros ypor eso activatedRoute y router por si el usuario modifica a mano la dirección URL
    ngOnInit(): void {
      
      //si en la ruta URL NO incluye editar ( EDIT ) es que estás añadiendo un héroe así que no hago nada
      if ( !this.router.url.includes('edit')) return;
      
      //si tiene EDIT en el URL, hay que actualizar los datos del héroe y cargarlos en formulario. Tomo el id por el URL como vimos en el path
      this.activatedRoute.params
        .pipe(
          switchMap(({id}) =>this.heroesService.getHeroById(id)),
          ).subscribe( hero => {
              if (!hero) {
                return this.router.navigateByUrl('/');
              }
              this.heroForm.reset( hero );
              return;
          });
          //tomo los params y los desestructuro cogiendo el id: busco el heroe por id y ahora tengo 2 situaciones: si no existe el héroe, saco al usuario a la home. Si existe,a este formulario (heroForm) le paso el reset (que establece los campos del formulario a los del original que le pases por parámetro.

    }

    //creamos un método para el formulario (no retorna nada)
    onSubmit(): void {
    
      //si el formulario es invalid que no haga nada
      if(this.heroForm.invalid) return; 

      //doble validación: si el hero tiene ya un id=> actualizar, si no lo tiene=> crearlo
      if( this.currentHero.id){ //también nos valdría el heroForm
        this.heroesService.updateHero(this.currentHero) //la función update retorna un objeto observable que no se dispara hasta que me suscriba
          .subscribe( hero => {

            this.showSnackbar(`${hero.superhero} actualizado`);

          //cuando estoy actualizando un héroe, llamamos al método showSnackBar y mostramos el mensaje indicando el mensaje y al héroe entre literals 

          });//aquí el hero ya está actualizado
          
          return; //está fuera del subscribe: si se hace estas líneas, no se sigue ejecutando nada: si tenemos el id hace lo de dentro, si no, actualiza fuera del id 
      }

      //si no lo tiene, lo creamos con método add
      this.heroesService.addHero( this.currentHero) //es el objeto que mando y al que me tengo que suscribir y tener la petición HTTP
        .subscribe( hero => {
          this.router.navigate(['heroes/edit',hero.id]);
          //navegacion  al arreglo en este caso con la ruta en particular heroes/edit/ y luego el hero.id que es el que va a devolver el servicio (porque el hero que devuelve suscribe viene con el id del backend)
          this.showSnackbar(`${hero.superhero} creado`); // mensaje de creado correctamente
        

        })
    }
    //añado el botón de volver en la vista de editar
    goBack(): void {
      this.router.navigateByUrl('/heroes/list');
    }

    //método para confirmar la eliminación del héroe. NO necestio argumento porque ya tengo al objeto para borrar en el formulario
    onDeleteHero(){

      //preguntamos si existe el id del currentHero y lanzamos error
      if( !this.currentHero.id) throw Error('El id del currentHero es necesario')

      //copiamos el código de Dialog de Material y lo retocamos
      const dialogRef = this.dialog.open(ConfirmDialogComponent, { //open abre el componente de Angular que usaremos para mostrar el dialogo (lo creamos si no existe)
        data: this.heroForm.value, //mandamos nuestro objeto: formulario con su valor
      });

      //ahora a borrar cuando demos OK. Optimización de código:      
      dialogRef.afterClosed()
        //al ser un observable tenemos acceso a los pipes
        .pipe(
          filter((result:boolean )=> result),//con filter hacemos una barrera que si se cumple lo deja pasar y si no se bloquea. Result es tipo booleano
          switchMap( () => this.heroesService.deleteHeroById(this.currentHero.id) ),//disparo el nuevo observable: si es positivo se hará la eliminación
          filter ((wasDeleted:boolean) =>wasDeleted),//aplicamos otro filtro para determinar si wasDeleted fue eliminado y si es así lo dejo pasar
          //tap( wasDeleted => console.log({wasDeleted}))//disparo el tap para mirar el resultado: wasDeleted
        )    
        //se dispara si aceptó OK y fue eliminado, colocamos la navegación a otra ruta
        .subscribe(() => { //el resultado no interesa porque es positivo
          this.router.navigate(['/heroes']);           
          //console.log({result}); 
      }) 

      //no olvidar insertar este método en el boton de eliminar dentro del formulario

    }

    //método para mostrar mensaje en pantalla al usuario según esté añadiendo o editando héroe y mostrar acciones además del tiempo de duración. Ahora llamaré a esta función tanto en añadir como en editar en onSubmit
    showSnackbar(message:string): void {

      this.snackbar.open(message, 'hecho', {
        duration: 2500,
      });

    }
}


function subscribe(arg0: (result: any) => void) {
  throw new Error('Function not implemented.');
}
/*
Mostrar objeto por consola del onSubmit

console.log({
        formIsValid: this.heroForm.valid,
        value: this.heroForm.value
      });

si está bien, llamamos al método que tiene el servicio pero mejor accedemos con un getter
this.heroesService.updateHero(); //mejor usar GETTER
*/

/*
onDeleteHero => código con doble suscribe que se ha simplificado arriba

dialogRef.afterClosed().subscribe(result => {
        
/en el subscribe ya tengo el resultado que puede ser de diferentes valores
/si tenemos un resultado no positivo: false o undefined, no hacemos nada:

        if ( !result ) return;
        console.log('borrado');

/mandamos llamar la eliminación del método y le pasamos el id del heroe actual
/un observable - como el que tenemos en delete -se dispara únicamente cuando alguien está escuchando (suscribe): los observables no emiten valores si no hay nadie que los escuche. Este observable en concreto emite TRUE/FALSE

        this.heroesService.deleteHeroById(this.currentHero.id)
          .subscribe(wasDeleted =>{

            /si está eliminado, hago la navegación a la lista

            if (wasDeleted) 
              this.router.navigate(['/heroes']); 

            /si no está eliminado, no hago nada mas
          })

        /una vez eliminado, sacamos al usuario a la pantalla general con navigate o navigatebyUrl
                
        console.log('The dialog was closed');
        console.log({result}); //colocamos el resultado del diálogo (confirmación de eliminacion)
      });
--------
 tap(result => console.log(result))  //tap para disparar un efecto secundario y voy a tener el resultado mostrando por consola lo que fluye a traves de este objeto: el resultado puede ser true, false o undefined
 */
