import { IUnidad } from './../interfaces/iUnidad';
import * as _ from 'lodash';

export class Unidad implements IUnidad{
    constructor(data){   
        this.id = data.id;
        this.nombre = data.nombre;
        this.valor = data.valor;
    }  
    id?: number;
    nombre: string;
    valor: number;
}
