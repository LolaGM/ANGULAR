/*
    ===== Código de TypeScript =====
*/

//desestructuración de argumentos en una función

//primero creamos interface 
export interface Producto { //export es para importar esta interface a otro sitio del código y poder usarla
    desc: string; //descripcion del producto
    precio: number; //precio    
}

//creamos los productos
const telefono: Producto = {
    desc: 'Nokia A1', //descripcion del producto
    precio: 150 //precio   
}

const tableta: Producto = {
    desc: 'iPad Air', //descripcion del producto
    precio:  350//precio   
}

//creamos una función que calcule el Impuesto Sobre Venta que reciba como parámetro productos cuya desscripción sea arreglo de Producto: una colección de este tipo de dato
//esta función tendrá como tipo de dato number

export function calcularISV(productos: Producto[]): [number,number]{ //desestructuro lo que recibe la función con una array de dos numeros

    let total = 0; //creamos una variable con LET porque el valor va a cambiar

    //podría desestructurar el precio del producto o la descripcion si la necesitara así que luego en el incremento. Uso las llaves {} y selecciono el campo de Producto que es un array que necesito
    productos.forEach( ({precio}) => { //con las llaves desestructuro el arreglo cogiendo las propiedades que me interesen
        total += precio;
    });

    //return total * 0.15; //total por impuesto
    return [total, total *0.15];//quiero retornar el total y tambien el impuesto así que desestrucuro lo que recibe la función en un array con dos numbers

};

/*ahora al argumento le pasamos un método:por ejemplo ForEach para recorrer el array y que recibe dentro una función con parámetro producto, el indice y luego todo el arreglo de productos o arr (producto, index, productos)

productos.forEach( (producto) => {
    total += producto.precio;
});

pero no nos interesa así que sólo usamos el parámetro producto con una funcion flecha que se va a ejecutar por cada producto que venga incremente el valor de la variable total sumando el precio del producto
*/

//creamos constante de impuesto sobre ventas por ejemplo que contenga la llamada a la funcion.esta función pide como argumento un array que vamos a pasarle con los productos definidos arriba
const articulos = [ telefono, tableta];
//const isv = calcularISV(articulos);
//mostramos por pantalla el impuesto sobre venta 
//console.log('ISV es: ', isv , 'dolares');
//desestructuro la función
//estoy desestruturando el arreglo para crear dos variables total e isv
const [total, isv] = calcularISV(articulos); 
console.log('Total es:',total);
console.log('Impuesto es:',isv);