import { IMarca } from 'src/app/interfaces/IMarca';
import * as _ from 'lodash';

export class Marca implements IMarca {
    
    constructor(data){
        this.id = data.id;
        this.nombre = data.nombre;
    }  
    id?: number;
    nombre: string;
}
