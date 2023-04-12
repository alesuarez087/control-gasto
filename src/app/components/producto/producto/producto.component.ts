import { ProductoHistorialPreciosComponent } from './../producto-historial-precios/producto-historial-precios.component';
import { ProductoPrecioComponent } from './../producto-precio/producto-precio.component';
import { TipoModificacion } from './../../../models/Producto';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { Precio } from './../../../models/Precio';
import { ProductoDetalleComponent } from './../producto-detalle/producto-detalle.component';
import { Producto } from 'src/app/models/Producto';
import { ProductoService } from 'src/app/services/producto.service';
import { Respuesta } from 'src/app/models/Respuesta';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss']
})
export class ProductoComponent implements OnInit {

  public productos : Producto[];
  public productosCargados: boolean;
  dataSource: MatTableDataSource<Producto>;
  displayedColumns = ['id', 'nombre', 'tipo', 'marca', 'precio', 'unidad', 'buttons'];
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private service: ProductoService, public dialog:MatDialog) { 
    this.productosCargados = false;
    this.productos = [];    
    this.loadTable();    
    
  }

  ngOnInit(){
  }

  loadTable(){
    this.service.getProductos().subscribe(list => {
      if (list.length > 0) {
        this.dataSource = new MatTableDataSource(list);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        this.dataSource.filterPredicate = (data: Producto, filter:string) => {
            return data.nombre.trim().toLowerCase().includes(filter)
                || data.tipoProducto.nombre.trim().toLowerCase().includes(filter)
                || data.marca.nombre.trim().toLowerCase().includes(filter)
  
        };

        this.productos = list;
      } else {
        this.productos = [];
      }
      this.productosCargados = true;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  
  }

  openDialog(): void {
    try{
      const dialogRef = this.dialog.open(ProductoDetalleComponent, {
        data: new Producto({})
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result != undefined){
          this.service.add(result).subscribe(rta => {
            var respuesta = new Respuesta(rta);

            if(respuesta.success){
              alert(respuesta.success);
            }
            else {
              alert(respuesta.error);
            }
            this.loadTable();
          })
        }
      });
    }
    catch(err){
      console.log(err);
      alert(err.message);
    }
    
  }

  modifyDialog(item: Producto): void{
    const dialogRef = this.dialog.open(ProductoDetalleComponent, {
      data : item
    });

    dialogRef.afterClosed().subscribe(result => {
      
      if (result != undefined){
        this.service.edit(result).subscribe(rta => {
          var respuesta = new Respuesta(rta);

          if(respuesta.success){
            alert(respuesta.success);
          }
          else {
            alert(respuesta.error);
          }
          this.loadTable();
        })
      }
      
    });
  }

  modifyPriceDialog(item: Producto): void{
    const dialogRef = this.dialog.open(ProductoPrecioComponent, {
      data : item
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined){
        this.service.editPrice(result).subscribe(rta => {
          var respuesta = new Respuesta(rta);

          if(respuesta.success){
            alert(respuesta.success);
          }
          else {
            alert(respuesta.error);
          }
          this.loadTable();
        })
      }      
    });
  }


  delete(item: Producto) {
    if (confirm("Do you want to delete '" + item.nombre + "'?")) {
      this.service.delete(item).subscribe(result => {
        if (result != undefined){
          this.service.delete(item).subscribe(rta => {
            var respuesta = new Respuesta(rta);

            if(respuesta.success){
              alert(respuesta.success);
            }
            else {
              alert(respuesta.error);
            }
            this.loadTable();
          })
        }
      });
    }
  }
  
  historialPrecios(item: Producto){
    const dialogRef = this.dialog.open(ProductoHistorialPreciosComponent, {
      data : item
    });    
  }
}
