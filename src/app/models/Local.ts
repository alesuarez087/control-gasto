import { ILocal } from './../interfaces/iLocal';

export class Local implements ILocal {
    constructor(data){
        this.idLocal = data.idLocal;
        this.nombre = data.nombre;
    }  
    idLocal: number;
    nombre: string;
}
