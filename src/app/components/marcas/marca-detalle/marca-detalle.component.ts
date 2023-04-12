import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Marca } from 'src/app/models/Marca';

@Component({
  selector: 'app-marca-detalle',
  templateUrl: './marca-detalle.component.html',
  styleUrls: ['./marca-detalle.component.scss']
})
export class MarcaDetalleComponent implements OnInit {

  public register: FormGroup;

  constructor(public dialogRef: MatDialogRef<MarcaDetalleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Marca) {
      
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
