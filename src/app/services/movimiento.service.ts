import { Movimiento } from 'src/app/models/Movimiento';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/internal/operators';
import { Respuesta } from '../models/Respuesta';

@Injectable({
  providedIn: 'root'
})
export class MovimientoService {

  private url : string = '/api/movimiento/';
  private urlPrecio : string = '/api/precio/';
  private rta : Respuesta ;
  private movimiento$ = new Subject<Movimiento[]>();
  private mov$ = new Subject<Movimiento>();

  constructor(private http : HttpClient){
    
  }

  getRespuesta() : Observable<Respuesta>{
    return this.http.get<Respuesta>(this.url).pipe(map(d => new Respuesta(d)));
  }

  public getMovimiento(id: number) : Observable<Movimiento> {
    //var movimientos : Movimiento[] = [];
    this.http.get<Respuesta>(this.url+"/"+id).subscribe(data => {      
      if(data.data)
      {
        var j = JSON.parse(JSON.stringify(data.data));
        var m : Movimiento = new Movimiento(j);
        
        this.mov$.next(m);
      }

      if(data.error){
        alert(data.error);
      }
      
    },
    err => {
      console.log(err);
    })
    
    return this.mov$.asObservable();    
  }

  public getMovimientos() : Observable<Movimiento[]> {
    var movimientos : Movimiento[] = [];
    this.http.get<Respuesta>(this.url).subscribe(data => {      
      if(data.data)
      {
        var i : number;
        for (i = 0; i < data.data.length; i++) {
          var j = JSON.parse(JSON.stringify(data.data[i]));
          var m : Movimiento = new Movimiento(j);
          movimientos.push(m);
        }
      
      this.movimiento$.next(movimientos);
      }

      if(data.error){
        alert(data.error);
      }
      
    },
    err => {
      console.log(err);
    })
    
    return this.movimiento$.asObservable();    
  }

  add(movimiento : Movimiento) {
    try{
      let headers = new HttpHeaders();
      headers = headers.set('Content-type', 'application/json');
      const body = JSON.stringify(movimiento, this.replacer);
      return this.http.post(this.url, body, {headers: headers})
          
    }
    catch (err){
      throw err;
    }
  }


  edit(movimiento: Movimiento) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-type', 'application/json');
    const body = JSON.stringify(movimiento);
    return this.http.put(this.url, body, {headers: headers});
  }
/*
  editPrice(precio : Precio) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-type', 'application/json');
    const body = JSON.stringify(precio);
    return this.http.post(this.urlPrecio, body, {headers: headers});
  }
  
  delete(tipo : Producto) {
    try{
      let headers = new HttpHeaders();  
      headers = headers.set('Content-type', 'application/json');
      return this.http.delete(this.url + tipo.id, {headers:headers});
    }
    catch (err){
      throw err;
    }
  }
*/
  replacer(key, value) {
    // Filtrando propiedades 
    if (value === "") {
      return undefined;
    }
    return value;
  }

}
