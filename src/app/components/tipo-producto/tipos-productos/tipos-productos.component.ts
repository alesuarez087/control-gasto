import { TipoProductoDetalleComponent } from './../tipo-producto-detalle/tipo-producto-detalle.component';
import { TipoProductoService } from './../../../services/tipo-producto.service';
import { TipoProducto } from './../../../models/TipoProducto';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { Respuesta } from 'src/app/models/Respuesta';

@Component({
  selector: 'app-tipos-productos',
  templateUrl: './tipos-productos.component.html',
  styleUrls: ['./tipos-productos.component.scss']
})
export class TiposProductosComponent implements OnInit {

  public tipos: TipoProducto[];
  public tiposCargados: boolean;
  public items: number;
  dataSource: MatTableDataSource<TipoProducto>;
  displayedColumns = ['id', 'nombre', 'buttons'];
  
  @ViewChild(MatPaginator) paginator: MatPaginator
  @ViewChild(MatSort) sort: MatSort;

  constructor(private service : TipoProductoService, public dialog: MatDialog) { 
    this.tipos = [];
    this.tiposCargados = false;
    this.loadTable();
    this.tiposCargados = true;    
  }

  ngOnInit() {
    
  }

  loadTable(){
    this.service.getTiposProducto().subscribe(list => {
      if (list.length > 0) {
        this.dataSource = new MatTableDataSource(list);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        this.dataSource.filterPredicate = (data: TipoProducto, filter:string) => {
          return data.nombre.trim().toLowerCase().includes(filter);
        };

        this.tipos = list;
      } else {
        this.tipos = [];
      }
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
      const dialogRef = this.dialog.open(TipoProductoDetalleComponent, {
        data: new TipoProducto({})
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
      alert(err.message);
    }
    
  }

  modifyDialog(item: TipoProducto): void{
    const dialogRef = this.dialog.open(TipoProductoDetalleComponent, {
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
        }, error => {
          alert(error.message);
        });
      }
    });
  }

  delete(item: TipoProducto) {
    if (confirm("Do you want to delete '" + item.nombre + "'?")) {
      this.service.delete(item).subscribe(data => {
        var respuesta = new Respuesta(data);
          if(respuesta.success){
            alert(respuesta.success);
          }
          else {
            alert(respuesta.error);
          }
          this.loadTable();
      }, error => {
        alert(error.message)
      });
    }
  }

}
