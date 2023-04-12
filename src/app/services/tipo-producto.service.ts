import { TipoProducto } from './../models/TipoProducto';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators';
import { Respuesta } from '../models/Respuesta';

@Injectable({
  providedIn: 'root'
})
export class TipoProductoService {

  private url : string = '/api/tipoproducto/';
  private rta : Respuesta ;
  constructor(private http : HttpClient) { 

  }

  getRespuesta() : Observable<Respuesta>{
    return this.http.get<Respuesta>(this.url).pipe(map(d => new Respuesta(d)));
  }

  private tiposProducto$ = new Subject<TipoProducto[]>();

  public getTiposProducto() : Observable<TipoProducto[]> {
    var marcas : TipoProducto[] = [];
    this.http.get<Respuesta>(this.url).subscribe(data => {
      var i : number;
      for (i = 0; i < data.data.length; i++) {
        var j = JSON.parse(JSON.stringify(data.data[i]));
        var m : TipoProducto = new TipoProducto(j);
        marcas.push(m);
      }
      this.tiposProducto$.next(marcas);
    },
    err => {
      console.log(err);
    })
    
    return this.tiposProducto$.asObservable();    
  }
  
  add(tipo: TipoProducto){
    try{
      let headers = new HttpHeaders();
      headers = headers.set('Content-type', 'application/json');
      const body = JSON.stringify(tipo, this.replacer);
      return this.http.post(this.url, body, {headers: headers})
    }
    catch (err){
      throw err;
    }
  }

  edit(tipo: TipoProducto) {
    try{
      let headers = new HttpHeaders();
      headers = headers.set('Content-type', 'application/json');
      return this.http.put(this.url, tipo, {headers: headers});
    } 
    catch (err){
      throw err;
    }
  }

  delete(tipo : TipoProducto) {
    try{
      let headers = new HttpHeaders();  
      headers = headers.set('Content-type', 'application/json');
      return this.http.delete(this.url + tipo.id, {headers:headers});
    }
    catch (err){
      throw err;
    }
  }

  replacer(key, value) {
    // Filtrando propiedades 
    if (value === "") {
      return undefined;
    }
    return value;
  }


}
