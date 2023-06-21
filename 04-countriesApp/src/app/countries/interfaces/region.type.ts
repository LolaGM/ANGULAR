
//creamos un type y lo exportamos (e importamos donde lo estamos usando) para contener el listado de regiones de las que sólo puede ser una usando | y con esto hacemos que no se pueda modificar el listado de estas opciones y añadimos al final una opción más vacía ''

export type Region = 'Africa'| 'Americas'| 'Asia'| 'Europe'|'Oceania' | '';
