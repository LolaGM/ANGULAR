"use strict";
/*
    ===== Código de TypeScript =====
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.calcularISV = void 0;
//creamos los productos
var telefono = {
    desc: 'Nokia A1',
    precio: 150 //precio   
};
var tableta = {
    desc: 'iPad Air',
    precio: 350 //precio   
};
//creamos una función que calcule el Impuesto Sobre Venta que reciba como parámetro productos cuya desscripción sea arreglo de Producto: una colección de este tipo de dato
//esta función tendrá como tipo de dato number
function calcularISV(productos) {
    var total = 0; //creamos una variable con LET porque el valor va a cambiar
    //podría desestructurar el precio del producto o la descripcion si la necesitara así que luego en el incremento. Uso las llaves {} y selecciono el campo de Producto que es un array que necesito
    productos.forEach(function (_a) {
        var precio = _a.precio;
        total += precio;
    });
    //return total * 0.15; //total por impuesto
    return [total, total * 0.15]; //quiero retornar el total y tambien el impuesto así que desestrucuro lo que recibe la función en un array con dos numbers
}
exports.calcularISV = calcularISV;
;
/*ahora al argumento le pasamos un método:por ejemplo ForEach para recorrer el array y que recibe dentro una función con parámetro producto, el indice y luego todo el arreglo de productos o arr (producto, index, productos)

productos.forEach( (producto) => {
    total += producto.precio;
});

pero no nos interesa así que sólo usamos el parámetro producto con una funcion flecha que se va a ejecutar por cada producto que venga incremente el valor de la variable total sumando el precio del producto
*/
//creamos constante de impuesto sobre ventas por ejemplo que contenga la llamada a la funcion.esta función pide como argumento un array que vamos a pasarle con los productos definidos arriba
var articulos = [telefono, tableta];
//const isv = calcularISV(articulos);
//mostramos por pantalla el impuesto sobre venta 
//console.log('ISV es: ', isv , 'dolares');
//desestructuro la función
//estoy desestruturando el arreglo para crear dos variables total e isv
var _a = calcularISV(articulos), total = _a[0], isv = _a[1];
console.log('Total es:', total);
console.log('Impuesto es:', isv);
