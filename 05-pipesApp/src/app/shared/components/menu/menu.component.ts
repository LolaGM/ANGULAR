import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api'; //interface propia de prime ng

@Component({
  selector: 'shared-menu',
  templateUrl: './menu.component.html',
  styles: [
  ]
})
export class MenuComponent implements OnInit {
    
    public menuItems: MenuItem[] = []; //inicializamos vacío el array de menu de tipo MenuItem que importamos de primeng api
    
      ngOnInit(): void {
        this.menuItems = [
            {label: 'Pipes de Angular',
            icon: 'pi pi-desktop',
            items: [
              {
                label: 'Textos y Fechas',
                icon: 'pi pi-align-left',
                routerLink: '/' //hemos buscado en la interface MenuItem (viendo todos las propiedades de este objeto) y hemos buscado la palbara routerLink. Dejamos ruta  '/'
              },              
              {
                label: 'Números',
                icon: 'pi pi-dollar',
                routerLink: 'numbers' //hemos buscado en la interface MenuItem (viendo todos las propiedades de este objeto) y hemos buscado la palbara routerLink para indicarle el nombre de la ruta correspondiente
              },              
              {
                label: 'No comunes',
                icon: 'pi pi-globe',
                routerLink: 'uncommon' //hemos buscado en la interface MenuItem (viendo todos las propiedades de este objeto) y hemos buscado la palbara routerLink para indicarle el nombre de la ruta correspondiente

              },
            ]          
          },
          {
            label: 'Pipes personalizados',
            icon: 'pi pi-cog',
            items: [
              {
                label: 'Custom Pipes',
                icon: 'pi pi-cog',
                routerLink: 'custom' //indicamos el nombre de la ruta CUSTOM indicado en products routing 

              }
            ]

          }
        ];
        
      }
    

}
/*
menuItems anterior que hemos reescrito gracias al interface MenuItem que trae prime NG
{label: 'New', icon: 'pi pi-fw pi-plus'},
          {label: 'Open', icon: 'pi pi-fw pi-download'},
          {label: 'Undo', icon: 'pi pi-fw pi-refresh'},
*/
