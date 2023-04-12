import { MovimientoProducto } from './../models/MovimientoProducto';
import { Producto } from "../models/Producto";

export enum TipoMovimiento{ Ingreso=1, Salida=2}

export interface IMovimiento {
    id: number;
    comentario: string;
    tipoMovimiento: TipoMovimiento;
    fecha: Date;
    movimientoProducto: MovimientoProducto[];
}
