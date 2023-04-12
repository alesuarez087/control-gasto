import { MovimientoProducto } from './../../../models/MovimientoProducto';
import { MovimientoDetalleComponent } from './../movimiento-detalle/movimiento-detalle.component';
import { Movimiento } from './../../../models/Movimiento';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MovimientoService } from 'src/app/services/movimiento.service';
import { Respuesta } from 'src/app/models/Respuesta';

@Component({
  selector: 'app-movimientos',
  templateUrl: './movimientos.component.html',
  styleUrls: ['./movimientos.component.css']
})
export class MovimientosComponent implements OnInit {

  public movimientos : Movimiento[];
  public movimientosCargados: boolean;
  public items: number;
  dataSource: MatTableDataSource<Movimiento>;
  displayedColumns = ['id', 'comentario', 'tipoMovimiento', 'fecha', 'valor', 'local', 'buttons'];
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private service: MovimientoService, public dialog:MatDialog) { 
    this.movimientosCargados = false;
    this.movimientos = [];    
    this.loadTable();    
    
  }

  ngOnInit(){
  }

  actualizar(){
    this.loadTable();
  }


  loadTable(){
    this.service.getMovimientos().subscribe(list => {
      if (list.length > 0) {
        this.dataSource = new MatTableDataSource(list);
        
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        this.dataSource.filterPredicate = (data: Movimiento, filter:string) => {
            return data.comentario.trim().toLowerCase().includes(filter);
        };

        this.movimientos = list;
      } else {
        this.movimientos = [];
      }
      this.movimientosCargados = true;
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
      const dialogRef = this.dialog.open(MovimientoDetalleComponent, {
        data: new Movimiento({})
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

  modifyDialog(item: MovimientoProducto): void{
    
    const dialogRef = this.dialog.open(MovimientoDetalleComponent, {
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

  modifyPriceDialog(item: MovimientoProducto): void{
    /*
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
    */
  }


  delete(item: MovimientoProducto) {
    /*
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
    */
  }  

}
