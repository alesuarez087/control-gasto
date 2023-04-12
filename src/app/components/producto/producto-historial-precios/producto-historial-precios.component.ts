import { Precio } from 'src/app/models/Precio';
import { ProductoService } from 'src/app/services/producto.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Producto } from 'src/app/models/Producto';
import { ProductoDetalleComponent } from '../producto-detalle/producto-detalle.component';

@Component({
  selector: 'app-producto-historial-precios',
  templateUrl: './producto-historial-precios.component.html',
  styleUrls: ['./producto-historial-precios.component.scss']
})
export class ProductoHistorialPreciosComponent implements OnInit {

  public precios: Precio[];

  constructor(public dialogRef: MatDialogRef<ProductoDetalleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Producto,  public service: ProductoService) {

      this.service.getHistorialPrecios(data.id).subscribe(rta => {
        this.precios = rta;
        /*
        var i : number;
        for (i = 1; i < this.precios.length; i++){
          this.precios[i].variabilidad = (this.precios[i].valor - this.precios[i-1].valor) * 100 / this.precios[i-1].valor
        }
        */
      })
     }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
