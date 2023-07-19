import { Component, computed, inject } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.css']
})
export class DashboardLayoutComponent {

  //inyectamos el servicio
  private authService = inject(AuthService);

  //GETTER del user para retornar el current user: podríamos hacerlo tambien con una propiedad pública computada
  public user = computed( () => this.authService.currentUser());

  onLogout(){
    this.authService.logout(); //no hay que redireccionar porque en app component un switch para que cuando cambie el estado vaya a una dirección correspondiente
  }
}


/*

get user(){
    return this.authService.currentUser();
  }

En vez de usar el getter, podríamos usar propiedad computada así:

public user = computed( () => this.authService.currentUser());

*/
