import * as _ from 'lodash';

export interface IRespuesta{
    data: string ;
    search : string;
    error : string;
    success : string ;
}

export class Respuesta implements IRespuesta {

    constructor(data){
        this.data = data.data || undefined;
        this.search = data.search || undefined;
        this.error = data.error || undefined;
        this.success = data.success ||undefined;
    }
    data: string;
    search: string;
    error: string;
    success: string;
}
