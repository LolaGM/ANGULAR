//para iniciar proyecto con TS se usa en consola el comando tsc -init
//para transpilar a javascript archivos ts se usa en consola el comando tsc seguido del nombre del archivo y con -w  de watch revisar /observar los cambios:
//tsc index.ts -w
//Nos creará un archivo .js y con esto haremos que se transpile siempre que hagamos un cambio en el ts.
// No olivdemos indicar en el archivo html la ruta a este js creado automáticamente para ver en el navegador los cambios
/*
    ===== Código de TypeScript =====
*/
let saludo:string = "Hola Mundo";
console.log(saludo);

/*
    ===== Código de TypeScript =====
*/
let nombre: string = "Mi Nombre";
nombre = "Otro nombre";
let hp:number|string = 95; //podríamos usar usar la pipe | para decirle el otro tipo de dato a la variable pero el tipado estricto es el sentido de usar typescript
let estaVivo: boolean = true;


hp ="Full"; //cambiamos el valor a la variable

console.log(nombre, hp);