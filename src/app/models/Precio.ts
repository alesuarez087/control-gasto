import { IPrecio } from './../interfaces/iPrecio';
import * as _ from 'lodash';
import { Producto } from './Producto';

export class Precio implements IPrecio {
    
    constructor(data){ 
        this.idProducto = data.idProducto || 0;
        this.idLocal = data.idLocal || 0;
        this.valor = data.valor || undefined;
        this.fecha = data.fecha || undefined;
        this.variabilidad = data.variabilidad || undefined;
    }  
    idProducto: number;
    idLocal: number;
    valor: number;
    fecha: Date;
    variabilidad: number;
}

export class DataModificarPrecio{
    constructor(producto, idLocal, fecha){
        this.producto = producto;
        this.idLocal = idLocal;
        this.fecha= fecha;
    }

    producto: Producto;
    idLocal: number;
    fecha: Date;

}