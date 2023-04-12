import { AnalisisMovimientoComponent } from './components/analisis/analisis-movimiento/analisis-movimiento.component';
import { BaseComponentComponent } from './components/analisis/base-component/base-component.component';
import { ProductoHistorialPreciosComponent } from './components/producto/producto-historial-precios/producto-historial-precios.component';
import { MovimientoDetalleProductoComponent } from './components/movimientos/movimiento-detalle-producto/movimiento-detalle-producto.component';
import { MovimientoDetalleComponent } from './components/movimientos/movimiento-detalle/movimiento-detalle.component';
import { ProductoPrecioComponent } from './components/producto/producto-precio/producto-precio.component';
import { UnidadDetalleComponent } from './components/unidad/unidad-detalle/unidad-detalle.component';
import { UnidadComponent } from './components/unidad/unidad/unidad.component';
import { ProductoDetalleComponent } from './components/producto/producto-detalle/producto-detalle.component';
import { ProductoComponent } from './components/producto/producto/producto.component';
import { TiposProductosComponent } from './components/tipo-producto/tipos-productos/tipos-productos.component';
import { TipoProductoDetalleComponent } from './components/tipo-producto/tipo-producto-detalle/tipo-producto-detalle.component';
import { MarcaDetalleComponent } from './components/marcas/marca-detalle/marca-detalle.component';
import { MarcasComponent } from './components/marcas/marcas/marcas.component';
import { MovimientosComponent } from './components/movimientos/movimientos/movimientos.component';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
//import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    MovimientosComponent,
    MovimientoDetalleComponent,
    MovimientoDetalleProductoComponent,
    MarcasComponent,
    MarcaDetalleComponent,
    TiposProductosComponent,
    TipoProductoDetalleComponent,
    UnidadComponent,
    UnidadDetalleComponent,
    ProductoComponent,
    ProductoDetalleComponent,
    ProductoPrecioComponent,
    ProductoHistorialPreciosComponent,
    BaseComponentComponent,
    AnalisisMovimientoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatCheckboxModule,
    MatSelectModule,    
    MatSortModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    FormsModule,
    MatNativeDateModule
    //,ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
