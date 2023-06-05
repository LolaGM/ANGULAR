var reproductor = {
    volumen: 90,
    segundo: 36,
    cancion: 'Mess',
    detalles: {
        autor: 'Ed Sheeran',
        anio: 2015
    }
};
//const autor = "Fulano"; //qué pasaría entonces si tuvieramos variable autor ya usada? que tendríamos dudas en cuanto a que valor sale por pantalla
//así que dentro de detalles a autor le ponemos la variable que luego llamaremos en console.log
var volumen = reproductor.volumen, segundo = reproductor.segundo, cancion = reproductor.cancion, detalles = reproductor.detalles; //creamos un grupo de constantes que tienen en común el objeto reproductor. Así dentro de console log quitaremos la palabra reproductor y dejaremos el valor
//para desestructurar al autor que está dentro de un objeto: incluyo detalles en las llaves de reproductor así que quito reproductor de console
var autor = detalles.autor; //desestructuramos detalles dentro cogiendo solo el que nos interesa que es autor y es la forma más clara 
console.log('El volumen actual es de: ', volumen);
console.log('El segundo actual es de: ', segundo);
console.log('La canción actual es: ', cancion);
console.log('El autor es de: ', autor); //autor dentro de detalles desestructurado
//Para no repetir tanto podemos usar desestructuración que haremos antes de estos console.log dentro de la const {} = reproductor
