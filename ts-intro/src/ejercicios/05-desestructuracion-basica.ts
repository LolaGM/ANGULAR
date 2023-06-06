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

/* console.log('El volumen actual es de: ' , volumen);
console.log('El segundo actual es de: ' , segundo);
console.log('La canción actual es: ' , cancion);
console.log('El autor es de: ' , autor); //autor dentro de detalles desestructurado */

//Para no repetir tanto podemos usar desestructuración que haremos antes de estos console.log dentro de la const {} = reproductor

const dbz: string[] = ['Goku','Vegeta','Trunks'];
//desestrucuración del arreglo: se hace con corchetes [] y la POSICIÓN es lo IMPORTANTE
//const [ P1, P2, P3] = dbz;
//si sólo me interesa una posicion, dejo comas vacías y dejo la posicion que me interese
const [ , , P3] = dbz;

//console.log('Personaje 1:', dbz[0]);
//console.log('Personaje 2:', dbz[1]);
console.log('Personaje 3:', P3);//uso la desestructuración aquí por ejemplo poniendo P3

//es más fácil hacer la desestructuración de arreglos que de objetos.
//se usan más con objetos que con arreglos


