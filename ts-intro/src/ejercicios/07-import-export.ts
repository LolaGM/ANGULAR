/*
    ===== Código de TypeScript =====
*/

import { Producto, calcularISV } from "./06-desestructuracion-funcion"; //revisar que la ruta del objeto sea correcta

/*IMPORTACIONES Y EXPORTACIONES
creamos un arreglo y le decimos como siempre el tipo de dato. SI necesitamos importar la interface que usa carritoCompras no hace falta copiarla justo arriba de la constante porque podría cambiar de valores en un futuro y no serviría aquí.
Para esto existen las importaciones: reutilizar código ya creado.
-Para importar aquí la interface, vamos al sitio donde se encuentra y le ponemos delante EXPORT.
-Dejando el cursor encima del error y damos a control + . punto y nos aparecen las opciones.
-Aparecerá la importación arriba del código.
una vez que ya tenemos la importación, dentro del array ya puedo definir las propiedades y sus valores para esta ocasión.Vamos a hacer varios objetos:
*/

const carritoCompras: Producto[] = [
    {
        desc: 'Telefono 1',
        precio: 100
    },
    {
        desc: 'Telefono 2',
        precio: 150
    }
];

//creamos constante desestructurada con las variables que necesitamos y llamamos a la funcion que nos aparece en rojo. Hay que exportarla en su origen y pulsando ahora en calcularISV nos da la opción de importarla y aparecerá arriba de este archivo junto con la otra importación hecha. Son importaciones desestructuradas del mismo objeto que es el archivo donde aparecen.El archivo de donde viene la importaciÓn lo ejecutará si tiene código extra
const [total,isv] = calcularISV(carritoCompras);
console.log('Total', total);
console.log('ISV', isv);