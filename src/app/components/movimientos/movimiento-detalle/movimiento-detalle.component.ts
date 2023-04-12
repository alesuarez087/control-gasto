import { LocalService } from './../../../services/local.service ';
import { ProductoService } from 'src/app/services/producto.service';
import { MovimientoDetalleProductoComponent } from './../movimiento-detalle-producto/movimiento-detalle-producto.component';
import { DataDialog, MovimientoProducto } from './../../../models/MovimientoProducto';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Movimiento } from 'src/app/models/Movimiento';
import { Local } from 'src/app/models/Local';
import { ActivatedRoute } from '@angular/router';
import { MovimientoService } from 'src/app/services/movimiento.service';
import * as moment from 'moment';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Respuesta } from 'src/app/models/Respuesta';

@Component({
  selector: 'app-movimiento-detalle',
  templateUrl: './movimiento-detalle.component.html',
  styleUrls: ['./movimiento-detalle.component.scss']
})
export class MovimientoDetalleComponent implements OnInit {

  @ViewChild(MatTable) table: MatTable<MovimientoProducto>;
  public register: FormGroup;
  public movimiento: Movimiento = new Movimiento({});
  public movimientoProductos: MovimientoProducto[] = [];
  public total: number = 0;
  public idLocalSelect: number = 0;
  public tipoMovimientoSelect: number = 0;
  dataSource: MatTableDataSource<MovimientoProducto>;
  displayedColumns = ['nombre', 'marca', 'tipoProducto', 'precio', 'buttons'];


  public locales: Local[] = [];

  constructor(  public dialog:MatDialog, 
                public service: ProductoService, 
                public localService: LocalService,
                public movimientoService: MovimientoService,
                private rutaActiva: ActivatedRoute) {
      var id: number = this.rutaActiva.snapshot.params.idMovimiento;

      this.createForm();

      if(id != undefined && id>0){
        this.movimientoService.getMovimiento(id).subscribe(x=>{
          this.movimiento = x;
          this.tipoMovimientoSelect = this.movimiento.tipoMovimiento;
          this.idLocalSelect = this.movimiento.idLocal;

          this.loadTable();
          
          this.movimiento.movimientoProducto.forEach(mp => {
            this.total += mp.producto.precio.valor * mp.unidad;
          });

          this.register.patchValue({
            fecha: moment(this.movimiento.fecha).format("YYYY-MM-DD"),
            tipoMovimiento: this.movimiento.tipoMovimiento
          })
        });
      }else{
        this.movimiento = new Movimiento({});
        console.log(this.movimiento);
        this.loadTable();
      }
      this.localService.getLocales().subscribe(rta => {
        this.locales = rta;
      });
     }
    
  ngOnInit() { }

  loadTable(){
    /*if (this.movimiento.movimientoProducto.length > 0) {
      this.dataSource = new MatTableDataSource(this.movimiento.movimientoProducto);
    }   */
    this.dataSource = new MatTableDataSource(this.movimiento.movimientoProducto);

  }

  createForm(){
  
    this.register = new FormGroup({
      id: new FormControl(),
      comentario: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      tipoMovimiento: new FormControl('', [Validators.required]),
      fecha: new FormControl('', [Validators.required]),
      idLocal: new FormControl('', [Validators.required])
    });

  }

  onNoClick(): void {
  }

  setValue() {
    this.movimientoProductos = this.movimiento.movimientoProducto;
    this.total = this.movimiento.valor;
    
    this.movimientoProductos.forEach(mp => {
      this.total += mp.valor;
    });
    
  }

  save() {
    
    this.mappingMovimiento(this.register.value)
    
    if(this.movimiento.id != undefined && this.movimiento.id != 0){
      this.movimientoService.edit(this.movimiento).subscribe(rta => {
        var respuesta = new Respuesta(rta);
  
        if(respuesta.success){
          alert(respuesta.success);
          location.href = '/movimientos'
        }
        else {
          alert(respuesta.error);
        }
      });
    }else{

    this.movimientoService.add(this.movimiento).subscribe(rta => {
      var respuesta = new Respuesta(rta);

      if(respuesta.success){
        alert(respuesta.success);
        location.href = '/movimientos'
      }
      else {
        alert(respuesta.error);
      }

    });
  }
  }

  addProducto(): void {
    this.mappingMovimiento(this.register);    
    if(this.register.value.fecha){
      var d = new DataDialog(this.movimiento, new MovimientoProducto({}), moment(this.movimiento.fecha).format("DD-MM-YYYY"));
      try{
        const dialogRef = this.dialog.open(MovimientoDetalleProductoComponent, {
          data: d
        });
    
        dialogRef.afterClosed().subscribe(result => {
          if (result != undefined){
                        
            this.dataSource.data.push(result);
            
            if(this.movimiento.movimientoProducto.length > 1) this.table.renderRows();
            
            this.total += result.valor; 
          }
        });
      
      }
      catch(err){
        console.log(err);
        alert(err.message);
      }
    }
    else{
      alert('Ingrese una fecha válida');
    }
  }

  editProducto(movProducto: MovimientoProducto): void {    
    try{

      const dialogRef = this.dialog.open(MovimientoDetalleProductoComponent, {
        data: movProducto
      });
    
      dialogRef.afterClosed().subscribe(result => {
        if (result != undefined){
          this.movimientoProductos = this.movimientoProductos.filter(function(mp) {
            return mp.idProducto !== movProducto.idProducto; 
          });
          this.total -= Math.round(movProducto.unidad * movProducto.producto.precio.valor);

          this.movimientoProductos.push(result)
          this.total += Math.round(result.peso * result.producto.precio.valor);
        }
      });
      
    }
    catch(err){
      console.log(err);
      alert(err.message);
    }
  }

  deleteProducto(item: MovimientoProducto) {    
    if (confirm("Do you want to delete '" + item.producto.nombre + "'?")) {
      this.movimientoProductos = this.movimientoProductos.filter(function(mp) {
        return mp.idProducto !== item.idProducto; 
      });
      this.total -= item.unidad * item.producto.precio.valor;
    }    
  }  

  public checkError = (controlName: string, errorName: string) => {
    return this.register.controls[controlName].hasError(errorName);
  }

  mappingMovimiento(register){   
    this.movimiento.tipoMovimiento = this.tipoMovimientoSelect;
    this.movimiento.idLocal = this.idLocalSelect; // register.idLocal;
    var f = "";
    if(register.value) f = register.value.fecha;
    if(register.fecha) f = register.fecha;
    var a = f.split("-");
    this.movimiento.fecha = new Date(Number(a[0]), Number(a[1])-1, Number(a[2]));
  } 
}
