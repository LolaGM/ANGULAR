//para iniciar proyecto con TS se usa en consola el comando tsc -init
//para transpilar a javascript archivos ts se usa en consola el comando tsc seguido del nombre del archivo y con -w  de watch revisar /observar los cambios:
//tsc index.ts -w
//Nos creará un archivo .js y con esto haremos que se transpile siempre que hagamos un cambio en el ts.
// No olivdemos indicar en el archivo html la ruta a este js creado automáticamente para ver en el navegador los cambios
/*
    ===== Código de TypeScript =====
*/
function sumar (a, b){ //función sumar con dos parámetros que son obligatorios de pasar al llamar la función más abajo
    return a + b; //son parámetros ANY de cualquier tipo de dato: number o string
}

const resultado1 = sumar(7,8); //podemos sumar números pero también concatenar strings
const resultado2 = sumar('Fernando'); //podemos sumar números pero también concatenar strings. TS te marca rojo si falta el 2º parámetro

console.log(resultado1);
console.log(resultado2);

//con TYPESCRIPT es recomendable indicar el tipo de dato
function sumarNumeros (c: number, d:number): number { //función sumar con dos parámetros que son obligatorios de pasar al llamar la función más abajo. Le decimos que va a regresar un number
    return c + d; //son parámetros ANY de cualquier tipo de dato: number o string
}

const resultadoSumarNumeros = sumarNumeros(10,20);//obligatoriamente como parámetros serían números
console.log(resultadoSumarNumeros);

//pasamos la función sumarNumeros a función flecha con ANY = cualquier dato
//cómo especificamos el dato de salida a una función de flecha?? ponemos dos puntos : y luego el tipo de dato después de los parámetros. Con esto ambas funciones son iguales: función normal y función flecha
const sumarFlecha = (e: number, f: number) : number=> {
    return e + f;
};

//otros argumentos que podemos pasar a funciones
function multiplicar(numero: number,otroNumero?: number,base: number = 2): number{ 
    return numero * base;
}

//puede salir el error NaN en consola porque base no la hemos definido. Estos argumentos son obligatorios y debemos especificar el tipo de dato.
// SI queremos hacer opcional el argumento, indicamos el símbolo de interrogación ?.
//podemos indicar la asignacion del parámetro dentro del mismo
//la función después de los parámetros retornará number como le indicamos antes de las llaves

const multiplicacion = multiplicar(5,0,10);
console.log(multiplicacion);

//es buena práctica colocar el tipo de dato a los argumentos y el tipo de dato de lo que se va a retornar en la función

//funciones con objetos como parámetro
//en esta no retorno nada: void (toda función retorna UNDEFINED)
//escribimos la interface del personaje en mayusc que es sabemos que es un objeto con claves valor que definiremos dentro
//las interfaces son como CLASES tontas que no saben cómo funciona el objeto. Sólo se asegura que tenga las propiedades y el tipo de valor de cada una
interface PersonajeLOR {
    nombre: string;
    pv: number; //puntos de vida son numeros y no concuerda con HP y dirá que no existe
    mostrarHp: () => void; 
    //podemos escribir esta función de dos maneras: corta y larga
    //corta: es una función con vacío con mostrarHp: () => void;

}

function curar( personaje: PersonajeLOR, curarX: number): void {
    personaje.pv += curarX; //el hp del personaje es igual a eso mismo + curarX
    console.log(personaje);
}

//creamos constantes si nunca vamos a cambiar su valor y dentro de ella el tipo de dato y ya con llaves las claves : valores
//podemos añadir funciones dentro de objeto
const nuevoPersonaje: PersonajeLOR = {
    nombre: 'Strider',
    pv:50,
    mostrarHp(){ //funciÓn que debe también estar especificada dentro del PersonajeLOR
        console.log('Puntos de vida:', this.pv); //uso this para llamar a los puntos de vida de dentro del objeto y veremos por consola aunque nos marque rojo la propiedad Hp
    }

}

curar (nuevoPersonaje, 20); //llamo a la funcion y le paso los parámetros de objeto. Sumará 20 a los pv y dará 70 porque el valor era 50

nuevoPersonaje.mostrarHp();// llamo a la funcion y le paso los par






