/*
    ===== Código de TypeScript =====
*/
let habilidades: string[] = ['Bash', 'Counter', 'Healing'];

interface Personaje {
    nombre: string;
    hp:number;
    habilidades: string[]; 
    puebloNatal?: string; //con signo de pregunta se indica que es opcional

}

const personaje: Personaje = {
    nombre: 'Strider',
    hp:100,
    habilidades: ['Bash', 'Counter', 'Healing']
};

personaje.puebloNatal = 'Pueblo Paleta'; //añadimos valor a otro campo del objeto personaje

console.table(personaje);

