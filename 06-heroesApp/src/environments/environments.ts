
/*definimos las variables de entorno en los archivos de entorno ENV o carpeta environments según producción, desarrollo o test o el que necesitemos 
Exportamos esta constante que alberga la direccióm URL y la usaremos en el servicio*/
export const environments = {

    //en este caso para entorno de desarrollo vamos a apuntar a localhost o el puerto que se haya configurado (en el de producción es igual sólo que cambia un poco) y asegurarnos de que no tenga SLASH / al final
    baseUrl: 'http://localhost:3000'

}

//SI quisiera trabajar con estos archivos, siempre debo apuntar a este archivo de entorno de desarrollo LOCALHOST y cuando se haga el BUILD de producción apunte al de producción

/*ahora hay que usarlos en ANGULAR:en angular.json>configurations>production>fileReplacements replace DESARROLLO with PRODUCTION

"fileReplacements": [
        {
            "replace": "src/environment.environment.ts",
            "with": "src/environment.environment.prod.ts"
        }
*/