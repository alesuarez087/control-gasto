import { IMovimientoProducto } from './../interfaces/iMovimientoProducto';
import { Movimiento } from './Movimiento';
import { Producto } from './Producto';

export class MovimientoProducto implements IMovimientoProducto{

    constructor(data){
        this.idMovimiento = data.idMovimiento;
        this.idProducto = data.idProducto;
        this.unidad = data.unidad;
        this.valor = data.valor || 0;    

        if(data.producto){
            this.producto = new Producto(data.producto);
        } else {
            this.producto = new Producto({});
        }
    }

    idMovimiento: number;
    idProducto: number;
    unidad: number;
    producto: Producto;
    valor:number;
}

export class DataDialog{
    constructor(movimiento, movimientoProducto, fecha){
        this.movimientoProducto = movimientoProducto;
        this.fecha = fecha;
        this.movimiento = movimiento;
    }

    movimiento: Movimiento;
    movimientoProducto: MovimientoProducto;
    fecha: Date;
}