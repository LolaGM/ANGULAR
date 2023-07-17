//componente generado con schematics con opción skip selector
import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { UsersServiceService } from '../../services/users-service.service';
import { User } from '../../interfaces/user-request.interface';

@Component({
  templateUrl: './user-info-page.component.html',
  styleUrls: ['./user-info-page.component.css']
})

//cuando el componente es montado implementamos el inicio para disparar la petición http tan pronto como el coponente está listo para que hagamos la petición

export class UserInfoPageComponent implements OnInit {
  
  //inyectamos el servicio
  private usersService = inject(UsersServiceService);

  //necesitamos saber el usuario que el visitante quiere buscar. Inicializamos en 1 y lo llamamos desde HTML
  public userId = signal(1);

  //saber cuál es el usuario que corresponde a ese id: señal que puede tener diferentes valores: tipo usuario o undefined
  public currentUser = signal<User|undefined>(undefined);

  //otra señal
  public userWasFound = signal(true);

  //propiedad computada que obliga a retornar un <string>: dentro contiene una función en la que lo que retorne será el valor de la propiedad computada
  public fullName = computed<string>( () => {

    //verificamos si no existe el usuario y retornamos que no tenemos usuario
    if( !this.currentUser() ) return 'User not found';

    //si tenemos usuario y no es undefined, que saque nombre y apellido y llamamos la señal computada desde HTML
    return `${ this.currentUser()?.first_name} ${ this.currentUser()?.last_name}`



  })

  ngOnInit(): void { //al inicio llamamos al método de carga del usuario con el id de la señal
    this.loadUser( this.userId() ); //este es el valor de la señal
  }

  //llamamos método loadUser que luego llamamos en html en los botones
  loadUser( id: number){

    //verificamos el id del usuario: si es menor o igual a cero que no haga nada
    if ( id <= 0) return; 

    //si es mayor a 0, establezco el valor de la señal al id
    this.userId.set(id);
    this.currentUser.set(undefined);

    //hacemos la petición http
    this.usersService.getUserById(id)
      .subscribe ({ //nos suscribirmos al observable siguiente: el valor del siguiente será el user 
        next: (user) => {
          this.currentUser.set( user ); 
          this.userWasFound.set ( true ); //si logramos obtener el usuario
        },
        error: () =>
          {
            this.userWasFound.set( false );//si tenemos un error, indicamos que el usuario no fue encontrado
            this.currentUser.set(undefined); //para limpiar la información del usuario y dejarlo en undefined porque ya no está
          }
        
        

      } )

  }


}

/*subscribe del user que existe
this.usersService.getUserById(id)
      .subscribe ( user => {
        //console.log({user}); //mostramos por consola a cada usuario al hacer click en ant o sig
        //este usuario que tenemos aquí es el que querremos establecer en el current user: recibiremos un observable que tiparaá al usuario.
        //cambiemos el valor del current user: estamos sobrescribiendo el valor anterior, no estamos actualizando el valor -->vamos al html y lo llamamos
          this.currentUser.set( user );

      })

En el  curso se dará el código para indicar el caso de cuando no existe el user retornar un objeto con diferentes propiedades: usaremos método next 
*/
