//definimos un objeto que cumpla lo estipulado en countries service para guardar la info de búsqueda

import { Country } from "./country.interface";


export interface CacheStore{
    byCapital:  TermCountries;
    byCountry:  TermCountries;
    byRegion:  TermCountries; //tiene que ser un objeto de tipo Region

}

//creamos otra interface para definir el objeto interno de byCapital, by COuntry menos la de Region
export interface TermCountries{
    term: string;
    countries:Country[];
}