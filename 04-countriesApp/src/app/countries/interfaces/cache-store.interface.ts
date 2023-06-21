//definimos un objeto que cumpla lo estipulado en countries service para guardar la info de búsqueda
import { Country } from "./country.interface";
import { Region } from "./region.type";


export interface CacheStore{
    byCapital:  TermCountries; //interface de tipo TermCountries
    byCountries:  TermCountries; //interface de tipo TermCountries
    byRegion:   RegionCountries; //tiene que ser un objeto de tipo Region
}

//creamos otra interface para definir el objeto interno de byCapital, by COuntry menos la de Region
export interface TermCountries{
    term: string;
    countries:Country[];
}

//creamos otra interface para definir el objeto interno de region, by COuntry menos la de Region
export interface RegionCountries{
    region: Region;//es opcional y el tipo lo importamos del type region creado
    countries:Country[];
}