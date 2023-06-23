
export enum Color {
    red, black, blue, green
}

export interface Hero {
    name: string;
    canFly: boolean;
    color: Color; //hechos de un tipo en particular: una enumeración
}