import { MovimientoProducto } from './MovimientoProducto';
import { IMovimiento, TipoMovimiento } from './../interfaces/iMovimiento';
import { Local } from './Local';
import * as moment from 'moment';


export class Movimiento implements IMovimiento {

    constructor(data){
        this.id = data.id || 0;
        this.comentario = data.comentario || '';
        if(data.fecha){
            this.fecha = new Date(data.fecha);
        }else{
            this.fecha = new Date();
        }
        this.tipoMovimiento = data.tipoMovimiento || 0;
        this.valor = data.valor;
        if(data.tipoMovimiento){
            if(data.tipoMovimiento == 1){
                this.tipoMovimientoMapeado = "Ingreso";
            } else{
                this.tipoMovimientoMapeado = "Salida";
            }
        }

        this.movimientoProducto = [];
        if(data.movimientoProducto){
            data.movimientoProducto.forEach(producto => {
                this.movimientoProducto.push(new MovimientoProducto(producto));
            });
        }

        this.idLocal = data.idLocal || 0;
        if(data.local){
            this.local = new Local(data.local);
        }

        this.fechaString = moment(data.fecha).format('DD/MM/YYYY')

    }
    
    id: number;
    valor: number;
    comentario: string;
    tipoMovimiento: TipoMovimiento;
    tipoMovimientoMapeado: string;
    fecha: Date;
    movimientoProducto: MovimientoProducto[];
    idLocal: number;
    local: Local;
    fechaString: string;
}
