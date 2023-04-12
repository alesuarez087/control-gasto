import { AnalisisMovimientoComponent } from './components/analisis/analisis-movimiento/analisis-movimiento.component';
import { BaseComponentComponent } from './components/analisis/base-component/base-component.component';
import { UnidadComponent } from './components/unidad/unidad/unidad.component';
import { ProductoComponent } from './components/producto/producto/producto.component';
import { TiposProductosComponent } from './components/tipo-producto/tipos-productos/tipos-productos.component';
import { MarcasComponent } from './components/marcas/marcas/marcas.component';
import { MovimientosComponent } from './components/movimientos/movimientos/movimientos.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MovimientoDetalleComponent } from './components/movimientos/movimiento-detalle/movimiento-detalle.component';

const routes: Routes = [
    {path: 'movimientos', component: MovimientosComponent}
  , {path: 'movimientos/detalle/:idMovimiento', component: MovimientoDetalleComponent}
  , {path: 'marcas', component: MarcasComponent}
  , {path: 'tipos-producto', component: TiposProductosComponent}
  , {path: 'productos', component: ProductoComponent}
  , {path: 'unidades', component: UnidadComponent}
  , {path: 'analisis', component: BaseComponentComponent, children: [
    {path: 'movimientos', component: AnalisisMovimientoComponent}
  ]}
  , {path: '**', pathMatch: 'full', redirectTo: 'marcas'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
