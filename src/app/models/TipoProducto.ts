import { ITipoProducto } from './../interfaces/iTipoProducto';
import * as _ from 'lodash';

export class TipoProducto implements ITipoProducto {
    constructor(data){   
        this.id = data.id;
        this.nombre = data.nombre;
    }  
    id?: number;
    nombre: string;
}
