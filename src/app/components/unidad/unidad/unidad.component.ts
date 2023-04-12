import { UnidadService } from './../../../services/unidad.service';
import { UnidadDetalleComponent } from './../unidad-detalle/unidad-detalle.component';
import { Unidad } from './../../../models/Unidad';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { Respuesta } from 'src/app/models/Respuesta';

@Component({
  selector: 'app-unidad',
  templateUrl: './unidad.component.html',
  styleUrls: ['./unidad.component.scss']
})
export class UnidadComponent implements OnInit {

  public unidades :Unidad[];
  public unidadesCargadas: boolean;
  public items: number;
  dataSource: MatTableDataSource<Unidad>;
  displayedColumns = ['id', 'nombre', 'valor', 'buttons'];
  
  @ViewChild(MatPaginator) paginator: MatPaginator
  @ViewChild(MatSort) sort: MatSort;

  constructor(private service : UnidadService, public dialog: MatDialog) { 
    this.unidades = [];
    this.unidadesCargadas = false;
    this.loadTable();
    this.unidadesCargadas = true;    
  }

  ngOnInit() {
    
    //console.log(this.service.getMarcas())
    
  }

  loadTable(){
    this.service.getUnidades().subscribe(list => {
      if (list.length > 0) {
        this.dataSource = new MatTableDataSource(list);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        this.dataSource.filterPredicate = (data: Unidad, filter:string) => {
          return data.nombre.trim().toLowerCase().includes(filter);
        };

        this.unidades = list;
      } else {
        this.unidades = [];
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
      const dialogRef = this.dialog.open(UnidadDetalleComponent, {
        data: new Unidad({})
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result != undefined){
          this.service.add(result).subscribe(data => {
            var respuesta = new Respuesta(data);

            if(respuesta.success){
              alert(respuesta.success);
            }
            else {
              alert(respuesta.error);
            }
            this.loadTable();
          }, error =>{
            alert(error.message);
          });
        }
      });
    }
    catch(err){
      alert(err.message);
    }
    
  }

  modifyDialog(item: Unidad): void{
    const dialogRef = this.dialog.open(UnidadDetalleComponent, {
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

  delete(item: Unidad) {
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
