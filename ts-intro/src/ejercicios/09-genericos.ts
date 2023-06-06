/*
    ===== Código de TypeScript =====
*/
//Genéricos en TS
//se usan los símbolos <> y una letra dentro además de indicar al argumento la misma letra usada
//podría especificarse otra letra o directamente indicar el tipo de dato entre <>

function queTipoSoy<T>(argumento: T){
    return argumento;
}

let soyString = queTipoSoy('soy un string');
let soyNumber = queTipoSoy(100);
let soyArreglo = queTipoSoy([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

let soyExplicito = queTipoSoy<number>(100); //especificamos el tipo de dato number 
