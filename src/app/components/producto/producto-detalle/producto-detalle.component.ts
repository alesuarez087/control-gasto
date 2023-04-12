import { MarcasComponent } from './../../marcas/marcas/marcas.component';
import { Unidad } from './../../../models/Unidad';
import { UnidadService } from './../../../services/unidad.service';
import { TipoProductoService } from './../../../services/tipo-producto.service';
import { TipoProducto } from './../../../models/TipoProducto';
import { MarcaService } from './../../../services/marca.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Producto, TipoModificacion } from 'src/app/models/Producto';
import { Marca } from 'src/app/models/Marca';
import { Precio } from 'src/app/models/Precio';

@Component({
  selector: 'app-producto-detalle',
  templateUrl: './producto-detalle.component.html',
  styleUrls: ['./producto-detalle.component.scss']
})
export class ProductoDetalleComponent implements OnInit {

  public register: FormGroup;

  public marcas : Marca[];
  public idMarcaSelect : number;

  public tiposProducto: TipoProducto[];
  public idTipoProductoSelect: number;

  public unidades: Unidad[];
  public idUnidadSelect: number;

  constructor(public dialogRef: MatDialogRef<ProductoDetalleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Producto,  public mService : MarcaService, 
      public tpService: TipoProductoService, public uService: UnidadService) {
      this.mService.getMarcas().subscribe(rta => {
        this.marcas = rta;
      });

      this.tpService.getTiposProducto().subscribe(rta =>{
        this.tiposProducto = rta;
      });

      this.uService.getUnidades().subscribe(rta =>{
        this.unidades = rta;
      });

      if (this.data.idMarca){
        this.idMarcaSelect = this.data.idMarca;
      }else{
        this.idMarcaSelect = 0;
      }

      if (this.data.idTipoProducto){
        this.idTipoProductoSelect = this.data.idTipoProducto;
      } else {
        this.idTipoProductoSelect = 0;
      }

      if (this.data.idUnidad){
        this.idUnidadSelect = this.data.idUnidad;
      } else {
        this.idUnidadSelect = 0;
      }
     }
    
  ngOnInit() {
    
    this.register = new FormGroup({
      id: new FormControl(''),
      nombre: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      idMarca: new FormControl('', [Validators.required]),
      idTipoProducto: new FormControl('', [Validators.required]),
      idUnidad: new FormControl('', Validators.required),
      precio: new FormControl('', Validators.required)
    });
    
    if (this.data.id && this.data.id > 0){
      this.setValue()
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  setValue() {
    this.register.setValue({id: this.data.id, nombre: this.data.nombre, idMarca: this.data.marca,
                            idTipoProducto: this.data.tipoProducto, idUnidad: this.data.unidad, 
                            precio: this.data.precio.valor});
  }

  save() {
    this.dialogRef.close(this.mapping(this.register.value));
  }

  public checkError = (controlName: string, errorName: string) => {
    return this.register.controls[controlName].hasError(errorName);
  }

  mapping(result): Producto{  
    var producto : Producto = new Producto({});
    producto.precio = new Precio({});

    if(result.id != ''){
      producto.id = result.id;
      producto.precio.idProducto = result.id;
    }
    producto.nombre = result.nombre;
    producto.idMarca = result.idMarca;
    producto.idTipoProducto = result.idTipoProducto;
    producto.idUnidad = result.idUnidad;
    
    producto.precio.valor = result.precio;

    return producto;
  }

}
