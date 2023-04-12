import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Movimiento } from 'src/app/models/Movimiento';
import { DataModificarPrecio, Precio } from 'src/app/models/Precio';
import { Producto } from 'src/app/models/Producto';

@Component({
  selector: 'app-producto-precio',
  templateUrl: './producto-precio.component.html',
  styleUrls: ['./producto-precio.component.scss']
})
export class ProductoPrecioComponent implements OnInit {

  public register: FormGroup;

  constructor(public dialogRef: MatDialogRef<ProductoPrecioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DataModificarPrecio) {
      
     }
    
  ngOnInit() {
    
    this.register = new FormGroup({
      id: new FormControl(''),
      nombre: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      precio: new FormControl('', Validators.required)
    });
    
    if (this.data.producto.id > 0){
      this.setValue()
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  setValue() {
    this.register.setValue({id: this.data.producto.id, nombre: this.data.producto.nombre, 
                            precio: this.data.producto.precio.valor});
  }

  save() {
    this.dialogRef.close(this.mapping(this.register.value));
  }

  public checkError = (controlName: string, errorName: string) => {
    return this.register.controls[controlName].hasError(errorName);
  }

  mapping(result): Precio{  
    var precio = new Precio({});

    precio.idProducto = result.id;
    precio.valor = result.precio;
    precio.idLocal = this.data.idLocal;
    precio.fecha = this.data.fecha;

    return precio;
  }

}
