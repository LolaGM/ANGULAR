//para iniciar proyecto con TS se usa en consola el comando tsc -init
//para transpilar a javascript archivos ts se usa en consola el comando tsc seguido del nombre del archivo y con -w  de watch revisar /observar los cambios:
//tsc index.ts -w
//Nos creará un archivo .js y con esto haremos que se transpile siempre que hagamos un cambio en el ts.
// No olivdemos indicar en el archivo html la ruta a este js creado automáticamente para ver en el navegador los cambios
/*
    ===== Código de TypeScript =====
*/
let habilidades: string[] = ['Bash', 'Counter', 'Healing'];

interface Personaje {
    nombre: string;
    hp:number;
    habilidades: string[]; 
    puebloNatal?: string; //con signo de pregunta se indica que es opcional

}

const personaje: Personaje = {
    nombre: 'Strider',
    hp:100,
    habilidades: ['Bash', 'Counter', 'Healing']
};

personaje.puebloNatal = 'Pueblo Paleta'; //añadimos valor a otro campo del objeto personaje

console.table(personaje);

