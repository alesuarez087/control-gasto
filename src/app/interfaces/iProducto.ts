import { Unidad } from './../models/Unidad';
import { Marca } from "../models/Marca";
import { Precio } from "../models/Precio";
import { TipoProducto } from "../models/TipoProducto";

export interface IProducto {
    id? : number;        
    nombre : string;
    idMarca : number;
    idTipoProducto : number;
    idUnidad: number;
    
    marca: Marca;
    precio : Precio;
    tipoProducto : TipoProducto;
    unidad: Unidad;
}
