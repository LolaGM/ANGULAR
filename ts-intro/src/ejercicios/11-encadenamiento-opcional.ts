/*
    ===== Código de TypeScript =====
*/
//ENCADENAMIENTO OPCIONAL
//recordemos el signo de interrogación que indicaba que era opcional
//creamos una interface con las propiedades y luego creamos dos objetos con esa interface como tipo

interface Pasajero {
    nombre: string;
    hijos?: string[]; //hacemos que la propiedad sea opcional indicando ?
}

const pasajero1: Pasajero = {
    nombre: 'Fernando'
    //opcional que tenga hijos
}

const pasajero2: Pasajero = {
    nombre: 'Melissa',
    hijos: ['Natalia', 'Gabriel']
}

//la función recibe el parámetro pasajero de tipo Pasajero.
//Puede ser que no retorne nada así que indicamos VOID
function imprimeHijos( pasajero: Pasajero): void {
    const cuantosHijos = pasajero.hijos?.length //al parámetro que recibo y la propiedad hijos le paso los métodos que quiera. Por ejemplo length para saber cuantas posiciones tiene
    console.log(cuantosHijos);
}

//usamos al pasajero2 que tiene hijos para usar la función
imprimeHijos(pasajero2); //en pantalla sale 2. Si pasarámos al pasajero 1 que no tiene, daría error
imprimeHijos(pasajero1); //en pantalla sale error undefined porque pasajero 1 no tiene esa propiedad y por tanto el método peta al intentar hacerlo. Por eso indicamos la opcionalidad con el signo ? o  usar las dos barras || 0 para indicar que es null
