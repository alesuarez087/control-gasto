import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Unidad } from 'src/app/models/Unidad';

@Component({
  selector: 'app-unidad-detalle',
  templateUrl: './unidad-detalle.component.html',
  styleUrls: ['./unidad-detalle.component.scss']
})
export class UnidadDetalleComponent implements OnInit {

  public register: FormGroup;

  constructor(public dialogRef: MatDialogRef<UnidadDetalleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Unidad) {
      
     }
    
  ngOnInit() {
    
    this.register = new FormGroup({
      id: new FormControl(''),
      nombre: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      valor: new FormControl('', [Validators.required])
    });
    
    if (this.data.id > 0){
      this.setValue()
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  setValue() {
    this.register.setValue({id: this.data.id, nombre: this.data.nombre, valor: this.data.valor});
  }

  save() {
    this.dialogRef.close(this.register.value);
  }

  public checkError = (controlName: string, errorName: string) => {
    return this.register.controls[controlName].hasError(errorName);
  }
}
