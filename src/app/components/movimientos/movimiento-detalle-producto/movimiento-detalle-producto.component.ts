import { MovimientoProducto, DataDialog } from './../../../models/MovimientoProducto';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductoService } from './../../../services/producto.service';
import { Component, Inject, OnInit } from '@angular/core';
import { ConsultaProductoFecha, Producto } from 'src/app/models/Producto';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { map, startWith } from 'rxjs/internal/operators';
import { Observable } from 'rxjs';
import { ProductoPrecioComponent } from '../../producto/producto-precio/producto-precio.component';
import { Respuesta } from 'src/app/models/Respuesta';
import { DataModificarPrecio } from 'src/app/models/Precio';

@Component({
  selector: 'app-movimiento-detalle-producto',
  templateUrl: './movimiento-detalle-producto.component.html',
  styleUrls: ['./movimiento-detalle-producto.component.scss']
})
export class MovimientoDetalleProductoComponent implements OnInit {

  public productosCargados: boolean = false;
  public filteredProductos: Observable<any[]>;
  public productos: Producto[];
  public productoSelect: Producto;
  public register: FormGroup

  constructor(@Inject(MAT_DIALOG_DATA) public data: DataDialog,
              public service: ProductoService,
              public dialogRef: MatDialogRef<MovimientoDetalleProductoComponent>, public dialog:MatDialog) { 

    this.createForm();
    this.service.getProductosFecha(new ConsultaProductoFecha(this.data.movimiento.fecha, this.data.movimiento.idLocal)).subscribe(rta => {
      if(rta.length) {
        this.productos = rta;
      } else {
        alert('No existen productos para la feecha ingresada. Cierre la ventana y modifíquela')
      };
      this.productosCargados = true;
    });    
  }


  createForm(){
  
    var producto = new FormControl('', [Validators.required]);

    this.register = new FormGroup({
      producto,
      peso: new FormControl('', [Validators.required])
    });

    this.filteredProductos = producto.valueChanges
      .pipe(
        startWith(''),
        map(nombre => nombre ? this.filterProductos(nombre) : this.productos.slice())
      );

      if(this.data.movimientoProducto.idProducto){
        this.setValue();
      }

  }

  ngOnInit() { }

  filterProductos(name: string) {
    return this.productos.filter(producto =>
      producto.nombre.toLowerCase().indexOf(name.toLowerCase()) === 0 ||
      producto.marca.nombre.toLocaleLowerCase().indexOf(name.toLowerCase()) === 0 ||
      producto.tipoProducto.nombre.toLocaleLowerCase().indexOf(name.toLowerCase()) === 0);
  }

  onEnter(evt: any){
    if (evt) {
      this.productoSelect = evt;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  setValue() {
    this.productoSelect = this.data.movimientoProducto.producto;
    this.register.setValue({
      peso: this.data.movimientoProducto.unidad, 
      producto: this.data.movimientoProducto.producto.nombre
    });
  }

  save() {
    this.dialogRef.close(this.mappingMovimientoProducto(this.register.value));
  }

  public checkError = (controlName: string, errorName: string) => {
    return this.register.controls[controlName].hasError(errorName);
  }

  modifyPriceDialog(item: Producto): void{
    var d = new DataModificarPrecio(item, this.data.movimiento.idLocal, this.data.fecha)
    const dialogRef = this.dialog.open(ProductoPrecioComponent, {
      data : d
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined){
        result.idLocal = this.data.movimiento.idLocal;
        result.fecha = this.data.movimiento.fecha;
        this.service.editPrice(result).subscribe(rta => {
          var respuesta = new Respuesta(rta);

          if(respuesta.success){
            alert(respuesta.success);
            this.productoSelect.precio.valor = result.valor;
          }
          else {
            alert(respuesta.error);
          }
        })
      }      
    });
  }
  

  mappingMovimientoProducto(register): MovimientoProducto{
    var mp = new MovimientoProducto({});
    mp.idProducto = this.productoSelect.id;
    mp.unidad = register.peso;
    mp.producto = this.productoSelect
    mp.valor = mp.unidad*this.productoSelect.precio.valor;

    return mp;
  }
}
