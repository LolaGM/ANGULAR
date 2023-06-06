/*
    ===== Código de TypeScript =====
*/
//Decoradores = son funciones
//sirven para añadir o expandir funcionalidades
//Se usa la arroba y detrás un nombre descriptivo.
//Pueden llevar argumentos dentro o no o no
//en el archivo ts.config debemos especificar los decorators en true en la sección "experimentalDecorators" quitando los slash
//este decorador trabaja en un nivel antes de crear una instancia
//ANGULAR los usa para diferenciar si es la clase es un componente,un pipe,una directiva, un servicio...

function classDecorator<T extends { new (...args: any[]): {} }>(
    constructor: T
    ){
        return class extends constructor{
            newProperty = "new property";
            hello = "override";
    };
}

class MiSuperClase{
    public miPropiedad: string = 'ABC123'; //propiedad pública
    
    imprimir(){//método
        console.log('Hola Mundo');
    }
}

console.log(MiSuperClase); //imprimo la clase, no estoy creando instancia
//no vemos el método imprimir ni la parte de la propiedad
//podríamos crear una instancia de esa clase??

const miClase = new MiSuperClase();
console.log(miClase.miPropiedad);
