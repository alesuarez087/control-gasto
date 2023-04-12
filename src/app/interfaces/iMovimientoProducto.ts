import { Producto } from "../models/Producto";

export interface IMovimientoProducto {
    
    idMovimiento: number;
    idProducto: number;
    unidad: number;
    producto: Producto;
    valor: number;

}
