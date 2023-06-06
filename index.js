/*
    ===== Código de TypeScript =====
*/
//ENCADENAMIENTO OPCIONAL
//recordemos el signo de interrogación que indicaba que era opcional
//creamos una interface con las propiedades y luego creamos dos objetos con esa interface como tipo
var pasajero1 = {
    nombre: 'Fernando'
    //opcional que tenga hijos
};
var pasajero2 = {
    nombre: 'Melissa',
    hijos: ['Natalia', 'Gabriel']
};
//la función recibe el parámetro pasajero de tipo Pasajero.
//Puede ser que no retorne nada así que indicamos VOID
function imprimeHijos(pasajero) {
    var cuantosHijos = pasajero.hijos.length; //al parámetro que recibo y la propiedad hijos le paso los métodos que quiera. Por ejemplo length para saber cuantas posiciones tiene
    console.log(cuantosHijos);
}
//usamos al pasajero2 que tiene hijos para usar la función
imprimeHijos(pasajero2); //en pantalla sale 2. Si pasarámos al pasajero 1 que no tiene, daría error
