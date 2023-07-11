//NODE ya tiene paquetes apra trabajar con el File System FS
const { writeFileSync, mkdirSync} = require('fs');

//importamos y configuramos dotenv
require('dotenv').config();

//creamos ahora una constante con la variable de entorno que contenga esa KEY
const targetPath = './src/environments/environments.ts';

//otra variable con el contenido del archiv
const envFileContent = `
    export const environment = {
        mapbox_key: "${ process.env['MAPBOX_KEY'] }" ,
        otra: "PROPIEDAD",
    };
`;

//creamos el directorio si no existe: recuersivo en true porque si ya existe, lo va a sobre escribir
mkdirSync('./src/environments', {recursive: true});

//
writeFileSync( targetPath, envFileContent );

//ahora para ejecutarlo, vamos a package.json y en la línea 6 escribimos "envs": "node ./scripts/set-envs.js", y en terminal ejecutamos npm run envs y veremos creada la carpeta con el archivo .ts



