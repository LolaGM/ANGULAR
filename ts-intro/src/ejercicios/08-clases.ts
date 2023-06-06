/*
    ===== Código de TypeScript =====
*/

/*clases en Typescript
Recordemos que tienen la ventaja de que en las clases podemos definir las propiedades de tipo:
-privadas PRIVATE = sólo es visible dentro de la clase en la que está. Necesitaremos constructor
-públicas PUBLIC = es visible fuera de la clase en la que está. Por defecto si no ponemos nada, las propiedades de la clase en la que está son públicas
-estaticas STATIC

según el alcance o visibilidad de los mismos cuando accedamos a ellos escribiendo
Heroe.nombreReal
Veremos entre las opciones esta clase static al ser visible

//haremos la forma corta del código dentro del constructor sin el cuerpo entre llaves

    //alterEgo: string;
    //edad: number;
    //nombreReal:number;

Hagamos un constructor que es una función que se va a llamar cuando hago una instancia de una clase

//pasamos argumentos que si no pasamos a la instancia nos dará error. Pero lo usual es verlo todo  así como argumentos debajo dentro del constructor. Estos argumentos pueden ser opcionales usando ?

//this.alterEgo = alterEgo; //este alterEgo (copia de la clase) es igual que el alterEgo que recibo como argumento. Lo quitamos del constructor finalmente 

Veamos ahora la extensión de propiedades de una clase:
*/
class PersonaNormal{

    constructor( 
            public nombre:string,
            public direccion:string,
            ){}
}

class Heroe extends PersonaNormal{ //expandimos esta clase para que usemos las propiedades de PersonalNormal y recordemos usar el super que lo llamaremos entre las llaves
    
    constructor( 
        public alterEgo:string,
        public edad:number,
        public nombreReal:string 
        ){
            super(nombreReal, 'New York, USA'); //llama al constructor también de PersonaNormal que tiene dos argumentos nombre y dirección
        }
}

//creamos la instancia a la clase Heroe con new
//accedemos a esa instancia y vemos que visibilidad tienen las propiedades
const ironman = new Heroe('Ironman', 45, 'Tony');//para ver algo en consola tengo que dentro del constructor indicarle los parámetros del constructor.
console.log(ironman);