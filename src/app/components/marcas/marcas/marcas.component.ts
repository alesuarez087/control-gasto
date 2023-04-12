import { MarcaService } from './../../../services/marca.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Marca } from 'src/app/models/Marca';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MarcaDetalleComponent } from '../marca-detalle/marca-detalle.component';
import { Respuesta } from 'src/app/models/Respuesta';

@Component({
  selector: 'app-marcas',
  templateUrl: './marcas.component.html',
  styleUrls: ['./marcas.component.scss']
})
export class MarcasComponent implements OnInit {
  
  public marcas: Marca[];
  public marcasCargadas: boolean;
  public items: number;
  dataSource: MatTableDataSource<Marca>;
  displayedColumns = ['id', 'nombre', 'buttons'];
  
  @ViewChild(MatPaginator) paginator: MatPaginator
  @ViewChild(MatSort) sort: MatSort;

  constructor(private service : MarcaService, public dialog: MatDialog) { 
    this.marcas = [];
    this.marcasCargadas = false;
    this.loadTable();
    this.marcasCargadas = true;    
  }

  ngOnInit() {    
  }

  actualizar(){
    this.loadTable();
  }

  loadTable(){
    this.service.getMarcas().subscribe(list => {
      if (list.length > 0) {
        this.dataSource = new MatTableDataSource(list);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        this.dataSource.filterPredicate = (data: Marca, filter:string) => {
          return data.nombre.trim().toLowerCase().includes(filter);
        };

        this.marcas = list;
      } else {
        this.marcas = [];
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
      const dialogRef = this.dialog.open(MarcaDetalleComponent, {
        data: new Marca({})
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

  modifyDialog(item: Marca): void{
    const dialogRef = this.dialog.open(MarcaDetalleComponent, {
      data : item
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

  delete(item: Marca) {
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

}
