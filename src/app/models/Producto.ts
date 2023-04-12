import { IProducto } from './../interfaces/iProducto';
import { Marca } from './Marca';
import { Precio } from './Precio';
import { TipoProducto } from './TipoProducto';
import * as _ from 'lodash';
import { Unidad } from './Unidad';

export enum TipoModificacion {Precio=0, Producto}

export class Producto implements IProducto{
    constructor(data){
        this.id = data.id || 0;
        this.idMarca = data.idMarca || 0;
        this.idTipoProducto = data.idTipoProducto || 0;
        this.idUnidad = data.idUnidad || 0;
        this.nombre  = data.nombre || '';

        if(data.marca){
            this.marca = new Marca(data.marca);
        } else{
            this.marca = new Marca({});
        }
        
        if (data.precio) {
            this.precio = new Precio(data.precio);
        } else {
            this.precio = new Precio({});
        }

        if(data.tipoProducto){
            this.tipoProducto = new TipoProducto(data.tipoProducto);
        } else{
            this.tipoProducto = new TipoProducto({});
        }

        if(data.unidad){
            this.unidad = new Unidad(data.unidad);
        }else {
            this.unidad = new Unidad({});
        }

        if(this.marca && this.tipoProducto && this.nombre){
            this.nombreLargo = this.nombre + " " + this.marca.nombre + " " + this.tipoProducto.nombre;
        }
    }
    id?: number;
    nombre: string;
    idMarca: number;
    idTipoProducto: number;
    idUnidad: number;
    marca: Marca;
    precio: Precio;
    tipoProducto: TipoProducto;
    unidad: Unidad;
    nombreLargo: string;
}

export class ConsultaProductoFecha{
    constructor(fecha, idLocal){
        this.fecha = fecha;
        this.idLocal = idLocal;
    }

    fecha: Date;
    idLocal: number;
}