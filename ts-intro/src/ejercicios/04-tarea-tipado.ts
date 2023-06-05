/*
    ===== Código de TypeScript =====
*/
//creamos ahora las interfaces con mayusc y recordemos que en JS no aparecen en el código
interface SuperHeroe{
    nombre: string;
    edad:number;
    direccion: Direccion, //es objeto que contiene otros claves y valor así que suele ver escrito de esta manera haciendo otra interface para dirección más abajo
        //calle: string;
        //pais: string;
        //ciudad: string;    
    mostrarDireccion: () => string; //método del objeto que es una función que devuelve una cadena
}

//interface de Direccion
interface Direccion{
    calle: string;
    pais: string;
    ciudad: string;
}

const superHeroe = {
    nombre: 'Spiderman',
    edad:30,
    direccion:{ //objeto dirección de dentro de superHeroe
        calle: 'Main St',
        pais: 'USA',
        ciudad: 'NY'
    },
    mostrarDireccion(){
        return this.nombre + ', ' + this.direccion.ciudad + ', ' + this.direccion.pais;
    }
    //usamos el this para llamar a claves de dentro del objeto
}

const direccion = superHeroe.mostrarDireccion(); //dentro de una variable const guardo la llamada al método dirección del objeto superHeroe
console.log(direccion); //muestro por pantalla y retorna mostrarDireccion()