/*
    ===== Código de TypeScript =====
*/
interface Reproductor {
    volumen:number;
    segundo: number;
    cancion: string;
    detalles: Detalles; //es otra interface que es objeto con datos dentro
}

interface Detalles {
    autor: string;
    anio: number;
}

const reproductor: Reproductor = { //ahora ya creamos objeto con propiedades establecidas por la interface Reproductor
    volumen: 90,
    segundo: 36,
    cancion: 'Mess',
    detalles : {
        autor: 'Ed Sheeran',
        anio: 2015
    }
}

//const autor = "Fulano"; //qué pasaría entonces si tuvieramos variable autor ya usada? que tendríamos dudas en cuanto a que valor sale por pantalla
//así que dentro de detalles a autor le ponemos la variable que luego llamaremos en console.log

const { volumen, segundo, cancion, detalles} = reproductor; //creamos un grupo de constantes que tienen en común el objeto reproductor. Así dentro de console log quitaremos la palabra reproductor y dejaremos el valor

//para desestructurar al autor que está dentro de un objeto: incluyo detalles en las llaves de reproductor así que quito reproductor de console

const  {autor} = detalles; //desestructuramos detalles dentro cogiendo solo el que nos interesa que es autor y es la forma más clara 

console.log('El volumen actual es de: ' , volumen);
console.log('El segundo actual es de: ' , segundo);
console.log('La canción actual es: ' , cancion);
console.log('El autor es de: ' , autor); //autor dentro de detalles desestructurado

//Para no repetir tanto podemos usar desestructuración que haremos antes de estos console.log dentro de la const {} = reproductor
