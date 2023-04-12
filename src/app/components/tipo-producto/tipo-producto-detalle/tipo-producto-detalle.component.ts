import { TipoProducto } from './../../../models/TipoProducto';
import { TiposProductosComponent } from './../tipos-productos/tipos-productos.component';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-tipo-producto-detalle',
  templateUrl: './tipo-producto-detalle.component.html',
  styleUrls: ['./tipo-producto-detalle.component.scss']
})
export class TipoProductoDetalleComponent implements OnInit {

  public register: FormGroup;

  constructor(public dialogRef: MatDialogRef<TipoProductoDetalleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TipoProducto) {
      
     }
    
  ngOnInit() {
    
    this.register = new FormGroup({
      id: new FormControl(''),
      nombre: new FormControl('', [Validators.required, Validators.maxLength(100)])
    });
    
    if (this.data.id > 0){
      this.setValue()
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  setValue() {
    this.register.setValue({id: this.data.id, nombre: this.data.nombre});
  }

  save() {
    this.dialogRef.close(this.register.value);
  }

  public checkError = (controlName: string, errorName: string) => {
    return this.register.controls[controlName].hasError(errorName);
  }

}
